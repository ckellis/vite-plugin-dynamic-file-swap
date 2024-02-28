import { getFileContents } from "./get-file-contents";

export const loadPlugin =
  ({ basePath, mainPath, fallbackPath, importTag }) =>
  (id) => {
    if (id !== importTag) return null;

    const { data, isFallback } = getFileContents(
      basePath,
      mainPath,
      fallbackPath,
    );
    const exportString = `export const data = ${data}; export const isFallback = ${isFallback};`;

    return exportString;
  };
