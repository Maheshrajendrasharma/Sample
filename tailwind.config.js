module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      animation: {
        glow: "glow 1.5s ease-in-out infinite alternate",
        scroll: "scroll 20s linear infinite",  // speed adjusted
      },

      keyframes: {
        glow: {
          "0%": { opacity: "0.6", transform: "scale(1)" },
          "100%": { opacity: "1", transform: "scale(1.05)" },
        },

        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },  // ✅ IMPORTANT FIX
        },
      },

    },
  },
  plugins: [],
}