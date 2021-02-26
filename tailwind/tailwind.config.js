module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        btnFocus: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "25%, 75%": {
            transform: "scale(1.25)",
          },
          "50%": {
            transform: "scale(1.5)",
          },
        },
      },
      animation: {
        btn: "btnFocus .7s linear",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      animation: ["hover", "focus", "active"],
    },
  },
  plugins: [],
};
