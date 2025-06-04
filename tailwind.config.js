/* eslint-disable no-undef */
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontSize: {
            sm: "0.8rem",
            base: "1rem",
            xl: "1.25rem",
            "2xl": "1.563rem",
            "3xl": "1.953rem",
            "4xl": "2.441rem",
            "5xl": "3.052rem",
        },
        screens: {
            sm: "640px",
            ms: "641px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1441px",
            // => @media (min-width: 1280px) { ... }
        },
        container: {
            center: true,
            padding: {
                // md: "2rem !important",
                // lg: "3rem !important",
            },
            screens: {
                sm: "640px",
                // => @media (min-width: 640px) { ... }

                md: "768px",
                // => @media (min-width: 768px) { ... }

                lg: "1024px",
                // => @media (min-width: 1024px) { ... }

                xl: "1280px",
                // => @media (min-width: 1280px) { ... }
            },
        },
        extend: {
            colors: {
                "cus-primary": {
                    // "extra-light": "#E3F5FF",
                    // light: "#94D8FF",
                    DEFAULT: "#0865A7",
                    // medium: "#3a5c99",
                    // bold: "#004972",
                },
                "cus-secondary": {
                    DEFAULT: "#dd2f33",
                },
                "cus-transparent": "rgba(128, 128, 128, 0.535)",
                "cus-dragbox": "#F8FCFF",
            },
            backgroundImage: {
                "hero-pattern": "url('@/assets/img/test/1.jpg')",
            },
        },
        fontFamily: {
            default: ["Work Sans", "sans-serif"],
            hero: ["Work Sans", "sans-serif"],
            "cus-body": ["Jost", "sans-serif"],
            subTitle: ["Playfair Display", "serif"],
            nunito: ["Nunito", "sans-serif"],
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};

// font-family: 'Roboto Condensed', sans-serif;
