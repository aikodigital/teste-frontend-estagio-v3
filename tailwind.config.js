module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    theme: {
      extend: {
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],
        },  
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };