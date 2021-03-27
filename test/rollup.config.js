const checksum = require("../lib/index").default;
const path = require("path");

export default {
  input: path.resolve(__dirname, "src/index.js"),
  output: [
    {
      file: path.resolve(__dirname, "dist/index.cjs.js"),
      format: "cjs",
      exports: "named",
    },
    {
      file: path.resolve(__dirname, "dist/index.es.js"),
      format: "es",
    },
  ],
  plugins: [checksum()],
};
