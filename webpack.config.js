const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // add your custom plugins here
  ],
  module: {
    // Add your Modules here
  },
};
