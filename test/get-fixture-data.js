import { readFileSync } from "fs";
import { resolve } from "path";

export const getFixtureData = (filename) => readFileSync(
  resolve(process.cwd(), "test/fixtures", filename),
  "utf8",
);
