export const resolveSourceToId =
  ({ importTag }) =>
  (source) => {
    if (source !== importTag) return null;
    // If source is tagged, return it so the import plugin can run against it
    return source;
  };
