/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-cyan': '#00f7ff',
                'brand-purple': '#bd0bff',
                'dark-bg': '#050505',
            },
        },
    },
    plugins: [],
}
