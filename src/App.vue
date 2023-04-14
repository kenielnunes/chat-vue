<script lang="ts">
import DarkModeIcon from "./components/Icons/DarkMode.vue";

import { defineComponent, onMounted, ref } from "vue";

interface Message {
    sender: string;
    content: string;
}

export default defineComponent({
    name: "App",
    setup() {
        const clientMessage = ref("");
        const atendenteMessage = ref("");
        const messages = ref<Message[]>([]);
        const isDarkMode = ref(false);

        const toggleDarkMode = () => {
            isDarkMode.value = !isDarkMode.value;
            localStorage.setItem("isDarkMode", isDarkMode.value.toString());
            document.documentElement.classList.toggle("dark", isDarkMode.value);
        };

        onMounted(() => {
            const storedValue = localStorage.getItem("isDarkMode");
            if (storedValue) {
                isDarkMode.value = storedValue === "true";
                document.documentElement.classList.toggle(
                    "dark",
                    isDarkMode.value
                );
            }
        });

        function sendMessage(sender: string) {
            if (sender === "Cliente" && clientMessage.value.trim()) {
                messages.value.push({
                    sender,
                    content: clientMessage.value,
                });
                clientMessage.value = "";
            } else if (
                sender === "Atendente" &&
                atendenteMessage.value.trim()
            ) {
                messages.value.push({
                    sender,
                    content: atendenteMessage.value,
                });
                atendenteMessage.value = "";
            }
        }

        function limparConversa() {
            messages.value = [];
        }

        return {
            clientMessage,
            atendenteMessage,
            messages,
            isDarkMode,
            sendMessage,
            toggleDarkMode,
            limparConversa,
        };
    },
});
</script>

<template>
    <div class="h-[80vh] max-w-4xl flex flex-col">
        <div>
            <button class="text-gray-300" @click="toggleDarkMode()">
                {{ isDarkMode ? "Light Mode" : "Dark mode" }}
            </button>
            <DarkModeIcon />
        </div>
        <div class="font-bold my-2 text-3xl">Vue Chat App</div>
        <div
            class="dark:bg-darkChatBox bg-gray-300 rounded flex-grow border dark:border-[#333333] p-4 overflow-y-auto"
        >
            <div
                v-for="(message, index) in messages"
                :key="index"
                class="w-full"
                :class="
                    message.sender === 'Cliente' ? 'text-right' : 'text-left'
                "
            >
                <div class="font-bold">{{ message.sender }} diz:</div>
                <div
                    class="inline-block p-2 rounded-lg bg-blue-500 max-w-[45%] break-all text-white my-1 animate-fade-in"
                    :class="{
                        'ml-auto': message.sender === 'Cliente',
                        'mr-auto': message.sender === 'Atendente',
                    }"
                >
                    {{ message.content }}
                </div>
            </div>
        </div>
        <div class="flex w-full gap-4">
            <form class="w-1/2" @submit.prevent="sendMessage('Atendente')">
                <div class="py-4 flex w-full">
                    <input
                        type="text"
                        v-model="atendenteMessage"
                        class="flex-grow border-gray-400 dark:bg-darkChatBox border w-full rounded-md mr-2 p-2"
                        placeholder="Digite sua mensagem..."
                    />
                    <button
                        type="submit"
                        class="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
                    >
                        Enviar
                    </button>
                </div>
            </form>

            <form class="w-1/2" @submit.prevent="sendMessage('Cliente')">
                <div class="py-4 flex w-full">
                    <input
                        type="text"
                        v-model="clientMessage"
                        class="flex-grow border-gray-400 border dark:bg-darkChatBox w-full rounded-md mr-2 p-2"
                        placeholder="Digite sua mensagem..."
                    />
                    <button
                        type="submit"
                        class="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
        <div class="w-full">
            <button
                class="bg-blue-500 w-full text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
                @click="limparConversa()"
            >
                Limpar conversa
            </button>
        </div>
    </div>
</template>
