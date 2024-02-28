import { resolveSourceToId } from "./resolve-source-to-id";
import { loadPlugin } from "./load-plugin";

const defaultOptions = {
  name: "dynamic-file-swap",
  importTag: "dynamic-file-import",
  basePath: process.cwd(),
  mainPath: "",
  fallbackPath: "",
};

export const dynamicFileSwapPlugin = (options) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const { name, ...opts } = mergedOptions;

  return {
    name,
    resolveId: resolveSourceToId(opts),
    load: loadPlugin(opts),
  };
};
