/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'plant-green': '#2D5A27',
                'plant-light': '#4A7C44',
                'plant-accent': '#A3C585',
                'pot-gold': '#D4A017',
                'soil-dark': '#3E2723',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
