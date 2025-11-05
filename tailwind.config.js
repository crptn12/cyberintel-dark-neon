/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { 'ci-bg': '#020617','ci-panel': 'rgba(2,6,23,0.4)','ci-border': 'rgba(148,163,184,0.3)','ci-neon': '#22d3ee' }, boxShadow: { 'neon': '0 0 25px rgba(34,211,238,0.4)' } } },
  plugins: [],
};
