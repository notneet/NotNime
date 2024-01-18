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
            primary: {
              DEFAULT: "#FF652F",
            },
            secondary: {
              DEFAULT: "#FFE400",
            },
            // content1: {
            //   DEFAULT: "#14A76C",
            // },
            background: "#272727",
            foreground: "#747474",
            focus: "#FF652F",
          },
        },
        light: {
          colors: {
            background: "#F5F5F5",
            foreground: "#333333",
          },
        },
      },
    }),
  ],
};
export default config;
