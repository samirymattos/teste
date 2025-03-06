import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D8D8D8",
        secundary: "#555C74",
        btnPrimary: "#2359B7",
        btnHoverPrimary: "#284a87",
        btnActivePrimary: "#25324b",
        sistemaTransparent: "transparent",
        sistemaRed: "#F44D4D",
        sistemaGreen: "#5FBB3E",
        sistemaYellow: "#ECAA1C",
        sistematBlue: "#2359B7",
        darkBg: "#1D1E26",
        darkModal: "#262932",
        darkTexto: "#D8D8D8",
        darkTextoOff: "#555C74",
        darkSelecao: "#141419",
        darkTextoDescricao: "#A0A0A0",
        darkTextoDescricaoOff: "#BBBBBB",
      },
      borderRadius: {
        xl: "1rem",
        "3xl": "25px",
        "3x2": "50px",
      },
      fontSize: {
        sm: "12px",
        ssm: "10px",
      },
    },
  },
  plugins: [],
} satisfies Config;
