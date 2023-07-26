/* eslint-disable no-undef,@typescript-eslint/no-var-requires */

// const { theme: defaultTheme } = require("tailwindcss/defaultConfig");
const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        mobile: "400px",
        // => @media (min-width: 400px) { ... }

        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px"
        // => @media (min-width: 1280px) { ... }
      },

      zIndex: {
        background: 0,
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        canvasSideBar: 30,
        canvasTopBar: 40,
        spinner: 30,
        topBar: 50,
        dropDown: 95,
        modal: 100,
        popover: 150
      },

      colors: {
        //BASICS
        transparent: "transparent",
        currentColor: "currentColor",
        primary: {
          50: "#b5c5d3",
          300: "#00c0ff",
          500: "#006fe0",
          800: "#41566e"
        },
        success: {
          300: "#90b66a",
          600: "#27ae60"
        },
        danger: {
          300: "#BB3300"
        },
        gray: {
          0: "#fff",
          50: "#c6c6c6",
          100: "#bebebe",
          200: "#a5a5a5",
          300: "#373737",
          400: "#2B2B2B",
          500: "#262626",
          600: "#1c1c1c",
          700: "#0e0e0e",
          800: "#11120F"
        }
      },
      minWidth: {
        32: "5rem",
        64: "12rem"
      },
      maxWidth: {
        xxs: "12rem"
      },
      height: {
        "5vh": "5vh",
        "3vh": "3vh",
        "92vh": "92vh",
        "40vh": "40vh",
        "60vh": "60vh",
        "80vh": "80vh"
      },
      minHeight: {
        32: "8rem"
      },
      maxHeight: {
        "30vh": "30vh",
        "60vh": "60vh"
      },
      padding: {
        sectionContainer: "1.5rem",
        logoHeader: "3rem",
        viewHeader: "4rem",
        viewBody: "3rem"
      },
      boxShadow: {
        cardHeader: "0px 2px 1px 1px #111111",
        card: "3px 3px 15px -1px #000000",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        slideCheckbox: "inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2)",
        none: "none"
      },
      fontSize: {
        footer: ["1.25rem", { lineHeight: "1.75rem" }],
        xxs: ["0.6rem", { lineHeight: "0.75rem" }]
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      strokeWidth: {
        4: "3px"
      },
      scale: {
        115: "1.15",
        130: "1.30",
        140: "1.40"
      }
    },
    variants: {
      extend: {}
    }
  },
  plugins: []
};
