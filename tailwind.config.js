import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px,-50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px,20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px,0px) scale(1)",
          },
        },
        enter: {
          "0%": { transform: "scale(200px)" },
          "100%": { transform: "scale(200px)" },
        },
        leave: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-240px)" },
        },
      },
      animation: {
        blob: "blob 10s infinite",
        enter: "enter 1s ease",
        leave: "leave 1s ease",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
