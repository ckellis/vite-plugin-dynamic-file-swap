import { readFileSync } from "fs";
import { resolve } from "path";

export const parseFixtureData = (filename) =>
  readFileSync(resolve(process.cwd(), "test/fixtures", filename), "utf8");
