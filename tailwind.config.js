module.exports = {
    mode: "jit",
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            animation: {
                "spin-slow": "spin 3s linear infinite",
                "fade-in": "fadeIn 1s ease-out",
                "fade-out": "fadeOut 1s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                fadeOut: {
                    "0%": { opacity: 1 },
                    "100%": { opacity: 0 },
                },
            },
            colors: {
                darkChatBox: "#333333",
                bodyDark: "#242424",
            },
        },
    },
    variants: {},
    plugins: [],
};
