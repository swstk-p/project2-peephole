/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./public/scripts/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        ext: "700px",
      },
      width: {
        ext: "500px",
      },
    },
  },
  plugins: [],
};
