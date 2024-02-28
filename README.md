# Vite Plugin Dynamic File Swap

This Vite plugin allows you to dynamically swap files on import at build time using import tags. It's useful for scenarios where your build system depends on the output of another tool for its built JavaScript, but you want to have fixture data as a fallback.

## Installation

```bash
npm install vite-plugin-dynamic-file-swap --save-dev
```

## Options

The plugin accepts the following options with their default values:

```javascript
{
  name: "dynamic-file-swap",
  importTag: "dynamic-file-import",
  basePath: process.cwd(),
  mainPath: "",
  fallbackPath: ""
}
```

- `name`: The name of the plugin instance.
- `importTag`: The tag used to identify imports that should be dynamically swapped.
- `basePath`: The base path for resolving `mainPath` and `fallbackPath`. Defaults to the current working directory.
- `mainPath`: The primary file with initial contents.
- `fallbackPath`: The file to dynamically swap into the import if the file at `mainPath` does not exist.

## Usage

In your Vite configuration, use the plugin as follows:

```javascript
import { defineConfig } from "vite";
import dynamicFileSwapPlugin from "vite-plugin-dynamic-file-swap";

const options = {
  // Default option overrides
};

export default defineConfig({
  plugins: [dynamicFileSwapPlugin(options), ...],
  ...
});
```

In your code, you can import data using the `importTag` specified in the plugin options:

```javascript
import { data, isFallback } from "dynamic-file-import";

// `data` is the parsed file contents - main or backup.
// `isFallback` is a boolean denoting if the data source is the backup file or not.
```

## License

[MIT](LICENSE)
