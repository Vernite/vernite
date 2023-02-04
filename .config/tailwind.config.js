module.exports = {
  corePlugins: {
    fontSize: false
  },
  content: [
    './src/**/*.{html,ts,mdx}',
  ],
  theme: {
    extend: {
      width: {
        128: "32rem",
        256: "64rem",
      }
    },
  },
  important: true,
  plugins: [],
}
