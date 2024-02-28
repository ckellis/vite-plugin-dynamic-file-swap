import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const outputConfig = {
  exports: "named",
  dir: "dist",
  format: "esm",
};

const pluginsConfig = [
  resolve(),
  commonjs(),
  esbuild({
    include: /\.js$/,
    keepNames: true,
    minify: true,
    target: "esnext",
    sourceMap: true,
  }),
];

export default {
  input: "./src/index.js",
  output: outputConfig,
  plugins: pluginsConfig,
};
