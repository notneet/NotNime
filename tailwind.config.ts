import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#272727",
            foreground: "#747474",
            focus: "#FF652F",
            primary: {
              DEFAULT: "#FF652F",
            },
            secondary: {
              DEFAULT: "#FFE400",
            },
          },
        },
        light: {
          colors: {
            background: "#F5F5F5",
            foreground: "#333333",
            focus: "#FF652F",
            primary: {
              DEFAULT: "#14A76C",
            },
            secondary: {
              DEFAULT: "#6C5014",
            },
          },
        },
      },
    }),
  ],
};
export default config;
