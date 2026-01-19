/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Activates dark mode via the 'dark' class on HTML tag
  theme: {
    extend: {
      colors: {
        vs: {
          // Primary Brand Color (Safety Orange)
          orange: '#FF6A00',      // Main Alert/Brand color
          lightOrange: '#FF8A3A', // Hover states / Gradients

          // Light Mode Palette
          bg: '#F4F4F4',          // Main Background
          text: '#1E1E1E',        // Primary Text
          card: '#FFFFFF',        // Card Backgrounds
          gray: '#9CA3AF',        // Secondary Text/Borders

          // Dark Mode Palette (Industrial Tech Look)
          darkBg: '#0A0A0A',      // Deep Black Background
          darkCard: '#141414',    // Surface Color
          darkBorder: '#262626',  // Subtle Borders
          darkInput: '#1F1F1F'    // Form Inputs
        }
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',        // Clean light mode shadow
        'glow': '0 0 15px rgba(255, 106, 0, 0.3)',       // Neon glow for dark mode elements
        'orange-sm': '0 2px 8px rgba(255, 106, 0, 0.2)', // Subtle orange shadow
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}