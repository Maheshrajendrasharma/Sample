module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

animation: {
  glow: "glow 1.5s ease-in-out infinite alternate",
},
keyframes: {
  glow: {
    "0%": { opacity: "0.6", transform: "scale(1)" },
    "100%": { opacity: "1", transform: "scale(1.05)" },
  },
},

    },
  },
  plugins: [],
}

