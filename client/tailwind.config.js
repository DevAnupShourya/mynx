import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: {
          // "all": "#171717",
          "all": "#050505",
          "main": "#040707",
          // "main": "#110011",
          "default": "#120321",
          // "default": "#050505",
        },
        light: {
          "all": "#F8F8FF",
          "main": "#F5F5F5",
          "default": "#FFFFFF",
        },
      },
      textColor: {
        dark: {
          "default": "#F8F8FF",
          "main": "#F5F5F5",
        },
        light: {
          "default": "#010B13",
          "main": "#100C08",
        },
      },
      colors: {
        "primary": "#64CFF6",
        "secondary": "#6359E9",
      },
    },
    variants: {
      extend: {
        backgroundColor: ['dark', 'light'],
        textColor: ['dark', 'light'],
        colors: ['primary', 'secondary'],
      },
    },
  },

  darkMode: "class",
  plugins: [nextui()],
}

