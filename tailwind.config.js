/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Inter", "sans-serif"],
      },
      colors: {
        myprimary: "#0A66C2",
        mysecondary: "#FDFAF5",
        mydarkyellow: "#E7A33E",
        mylightyellow: "#FCE2BA",
        mylightgreen: "#D7EBCE",
        mygreen: "#83941F",
        myskyblue: "#DCE6F1",
        mybrown: "#915907",
        myred: "#B24020",
        mydarkblue: "#004182",
      },
      fontSize: {
        h1: "64px",
        h2: "48px",
        h3: "32px",
        b1: "24px",
        b2: "16px",
        b3: "14px",
      },
    },
  },
  plugins: [
    // flowbite.plugin(),
  ],
};
