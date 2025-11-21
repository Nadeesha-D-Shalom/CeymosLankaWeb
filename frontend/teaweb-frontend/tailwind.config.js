/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      keyframes: {
        fadeUpSoft: {
          "0%": { opacity: 0, transform: "translateY(35px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },

        zoomFade: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },

        /* NEW ANIMATIONS */
        fadeLeft: {
          "0%": { opacity: 0, transform: "translateX(-40px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },

        fadeRight: {
          "0%": { opacity: 0, transform: "translateX(40px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },

      animation: {
        fadeUpSoft: "fadeUpSoft 1s ease-out forwards",
        zoomFade: "zoomFade 1s ease-out forwards",

        /* NEW ANIMATION NAMES */
        fadeLeft: "fadeLeft 1.2s ease-out forwards",
        fadeRight: "fadeRight 1.2s ease-out forwards",
      },
    },
  },

  plugins: [],
};
