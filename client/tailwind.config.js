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
          "default": "#3f3f46",
          "main": "#09090b",
        },
        light: {
          "default": "#F8F8FF",
          "main": "#F5F5F5",
        },
      },
      textColor: {
        dark: {
          "default": "#F8F8FF",
          "main": "#F5F5F5",
        },
        light: {
          "default": "#3f3f46",
          "main": "#09090b",
        },
      },
      colors: {
        "primary": "#35d2ad",
        "secondary": "#950df6",
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

