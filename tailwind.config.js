/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F8FAFC",
        secondary: "#F1F5F9",
        card: "#FFFFFF",
        accent: "#2563EB",
        neon: "#06B6D4",
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
        purple: "#7C3AED",
        textMain: "#0F172A",
        textMuted: "#64748B",
        borderDark: "rgba(0,0,0,0.06)",
        borderLight: "rgba(0,0,0,0.04)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
}
