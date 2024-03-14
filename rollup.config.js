import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const outputConfig = [
  {
    format: "esm",
    exports: "auto",
    file: "dist/index.mjs",
  },
  {
    format: "cjs",
    exports: "auto",
    file: "dist/index.cjs",
  },
];

const pluginsConfig = [
  resolve(),
  commonjs(),
  esbuild({
    include: /\.js$/,
    keepNames: true,
    minify: false,
    target: "esnext",
    sourceMap: true,
  }),
];

export default {
  input: "./src/index.js",
  output: outputConfig,
  plugins: pluginsConfig,
};
