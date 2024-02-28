import { vi, beforeEach, afterAll } from "vitest";
import { dynamicFileSwapPlugin } from "../src/dynamic-file-swap-plugin";

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
