import { vi, beforeEach, afterAll } from "vitest";
import { resolveSourceToId } from "../src/resolve-source-to-id";

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
