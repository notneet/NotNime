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
    extend: {
      colors: {
        "dark-main": "#272727",
        "dark-foreground-main": "#747474",
        "dark-primary": "#FF652F",
        "dark-secondary": "#FFE400",
        "light-main": "#F5F5F5",
        "light-foreground-main": "#333333",
        "light-primary": "#14A76C",
        "light-secondary": "#6C5014",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "3.125rem",
        xl: "3.125rem",
        "2xl": "3.125rem",
      },
    },
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
