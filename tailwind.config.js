/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',    // Contoh kode warna biru gelap
        text : '#E1E1E1',
        secondary: '#F33F3F',  // Contoh kode warna biru lebih terang
        accent: '#F97316',     // Contoh kode warna oranye
        customGray: '#F5F5F5', // Contoh kode warna abu-abu kustom
        bgSidebar : '#1F1F1F',
        bgMain : '#FFFFFF',
      },
      fontFamily : {
        archivo : ['Archivo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
