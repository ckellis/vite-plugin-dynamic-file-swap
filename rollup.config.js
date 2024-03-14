import copy from "rollup-plugin-copy";
import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const outputConfig = [
  {
    exports: "named",
    dir: "dist/esm",
    format: "esm",
  },
  {
    exports: "named",
    dir: "dist/cjs",
    format: "cjs",
  },
];

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
  copy({
    targets: [
      { src: "package.esm.json", dest: "dist/esm", rename: "package.json" },
      { src: "package.cjs.json", dest: "dist/cjs", rename: "package.json" },
    ],
  }),
];

export default {
  input: "./src/index.js",
  output: outputConfig,
  plugins: pluginsConfig,
};
