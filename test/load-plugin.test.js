import { vi, beforeEach, afterAll } from "vitest";
import { existsSync } from "fs";
import { parseFixtureData } from "./fixtures/parse-fixture-data.js";
import { loadPlugin } from "../src/load-plugin";

vi.mock("fs");

beforeEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("loadPlugin", () => {
  it("returns an export string with `data` and `isFallback` exports if the id matches `importTag`", () => {
    existsSync.mockReturnValueOnce(true);

    const id = "test-tag";
    const options = {
      basePath: process.cwd(),
      mainPath: "main.json",
      fallbackPath: "",
      importTag: "test-tag",
    };
    const expectedData = parseFixtureData(options.mainPath);

    const result = loadPlugin(options)(id);

    expect(result).toEqual(
      `export const data = ${expectedData}; export const isFallback = false;`,
    );
  });

  it("returns `null` if the id does not match `importTag`", () => {
    existsSync.mockReturnValueOnce(true);

    const id = "wrong-tag";
    const options = {
      mainPath: "main.json",
      fallbackPath: "",
      importTag: "test-tag",
    };
    const expectedData = parseFixtureData(options.mainPath);

    const result = loadPlugin(options)(id);

    expect(result).toEqual(null);
  });
});
