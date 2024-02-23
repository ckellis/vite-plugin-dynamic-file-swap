import { vi, beforeEach, afterAll } from "vitest";
import { existsSync } from "fs";
import { getFixtureData } from "./get-fixture-data";
import {
  getFileContents,
  resolveSourceToId,
  loadPlugin,
  dynamicFileSwapPlugin,
} from "../src";

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

    const mainPath = "main.json";
    const fallbackPath = "";
    const expectedData = getFixtureData(mainPath);

    expect(getFileContents(mainPath, fallbackPath)).toEqual({
      data: expectedData,
      isFallback: false,
    });
  });

  it("returns fallback data and `isFallback: true` if file at `mainPath` does not exist", () => {
    existsSync.mockReturnValueOnce(false);

    const mainPath = "";
    const fallbackPath = "fallback.json";
    const expectedData = getFixtureData(fallbackPath);

    expect(getFileContents(mainPath, fallbackPath)).toEqual({
      data: expectedData,
      isFallback: true,
    });
  });
});

describe("resolveSourceToId", () => {
  it("returns the source if the source matches `importTag`", () => {
    const importTag = "test-tag";
    const source = "test-tag";

    const result = resolveSourceToId({ importTag })(source);

    expect(result).toEqual("test-tag");
  });

  it("returns `null` if the source does not match `importTag`", () => {
    const importTag = "test-tag";
    const source = "wrong-tag";

    const result = resolveSourceToId({ importTag })(source);

    expect(result).toEqual(null);
  });
});

describe("loadPlugin", () => {
  it("returns an export string with `data` and `isFallback` exports if the id matches `importTag`", () => {
    existsSync.mockReturnValueOnce(true);

    const id = "test-tag";
    const options = {
      mainPath: "main.json",
      fallbackPath: "",
      importTag: "test-tag",
    };
    const expectedData = getFixtureData(options.mainPath);

    const result = loadPlugin(options)(id);

    expect(result).toEqual(
      `export const data = ${expectedData}; export const isFallback = false;`
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
    const expectedData = getFixtureData(options.mainPath);

    const result = loadPlugin(options)(id);

    expect(result).toEqual(null);
  });
});

describe("dynamicFileSwapPlugin", () => {
  it("passes the `name` option through to the returned plugin hash", () => {
    const result = dynamicFileSwapPlugin({ name: "swap-plugin" });

    expect(result.name).toEqual("swap-plugin");
  });

  it("returns the correct resolver and loader callbacks", () => {
    const result = dynamicFileSwapPlugin({ name: "swap-plugin" });

    expect(result.resolveId).toBeInstanceOf(Function);
    expect(result.load).toBeInstanceOf(Function);
  });
});
