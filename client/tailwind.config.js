import {nextui} from '@nextui-org/theme';

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
          "all": "#161823",
          "main": "#11131d",
          "default": "#1a1d28",
        },
        light: {
          "all": "#f3f4f6",
          "main": "#e5e7eb",
          "default": "#d1d5db",
        },
      },
      textColor: {
        dark: {
          "default": "#81869b",
          "main": "#ffffff",
        },
        light: {
          "default": "#4b5563",
          "main": "#111827",
        },
      },
      colors: {
        "primary": "#615dfa",
        "secondary": "#22d1e2",
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

