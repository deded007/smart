module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#283f55",
        l1: "#FDC000",
        l2: "#F1581A",
        l3: "#91C111",
        l4: "#42B9C9",
      },
      minWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
    },
  },
  plugins: [],
};
