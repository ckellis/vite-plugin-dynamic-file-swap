import { join, resolve } from "path";
import { existsSync, readFileSync } from "fs";

export const getFileContents = (main, fallback) => {
  const mainPath = resolve(__dirname, main);
  const fallbackPath = resolve(__dirname, fallback);

  if (existsSync(mainPath)) {
    return { data: readFileSync(mainPath, "utf-8"), isFallback: false };
  }

  return { data: readFileSync(fallbackPath, "utf-8"), isFallback: true };
};

export const resolveSourceToId =
  ({ importTag }) =>
  (source) => {
    if (source !== importTag) return null;
    // If source is tagged, return it so the import plugin can run against it
    return source;
  };

export const loadPlugin =
  ({ mainPath, fallbackPath, importTag }) =>
  (id) => {
    if (id !== importTag) return null;

    const { data, isFallback } = getFileContents(mainPath, fallbackPath);
    const exportString = `export const data = ${data}; export const isFallback = ${isFallback};`;

    return exportString;
  };

const defaultOptions = {
  name: "dynamic-file-swap",
  importTag: "dynamic-file-import",
  mainPath: "",
  fallbackPath: "",
};

export const dynamicFileSwapPlugin = (options = defaultOptions) => {
  const { name, ...opts } = options;

  return {
    name,
    resolveId: resolveSourceToId(opts),
    load: loadPlugin(opts),
  };
};
