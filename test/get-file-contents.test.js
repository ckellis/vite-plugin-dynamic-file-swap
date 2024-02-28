import { vi, beforeEach, afterAll } from "vitest";
import { existsSync } from "fs";
import { parseFixtureData } from "./fixtures/parse-fixture-data";
import { getFileContents } from "../src/get-file-contents";

vi.mock("fs");

beforeEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("getFileContents", () => {
  it("returns main data and `isFallback: false` if file at `mainPath` exists", () => {
    existsSync.mockReturnValueOnce(true);

    const basePath = process.cwd();
    const mainPath = "main.json";
    const fallbackPath = "";
    const expectedData = parseFixtureData(mainPath);

    expect(getFileContents(basePath, mainPath, fallbackPath)).toEqual({
      data: expectedData,
      isFallback: false,
    });
  });

  it("returns fallback data and `isFallback: true` if file at `mainPath` does not exist", () => {
    existsSync.mockReturnValueOnce(false);

    const basePath = process.cwd();
    const mainPath = "";
    const fallbackPath = "fallback.json";
    const expectedData = parseFixtureData(fallbackPath);

    expect(getFileContents(basePath, mainPath, fallbackPath)).toEqual({
      data: expectedData,
      isFallback: true,
    });
  });
});
