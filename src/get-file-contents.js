import { resolve } from "path";
import { existsSync, readFileSync } from "fs";

export const getFileContents = (base, main, fallback) => {
  const mainPath = resolve(base, main);
  const fallbackPath = resolve(base, fallback);

  if (existsSync(mainPath)) {
    return { data: readFileSync(mainPath, "utf-8"), isFallback: false };
  }

  return { data: readFileSync(fallbackPath, "utf-8"), isFallback: true };
};
