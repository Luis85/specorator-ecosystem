import { describe, expect, it, vi, afterEach } from "vitest";

// We need to control import.meta.env.BASE_URL across tests.
// Vitest doesn't support dynamic env mocking directly, so we mock the module.
vi.mock("../utils/url", async () => {
  const actual =
    await vi.importActual<typeof import("../utils/url")>("../utils/url");
  return actual;
});

describe("buildUrl", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("joins base (no trailing slash) and path without double slash", async () => {
    vi.stubEnv("BASE_URL", "/specorator-ecosystem");
    const { buildUrl } = await import("../utils/url");
    expect(buildUrl("integrations/specorator")).toBe(
      "/specorator-ecosystem/integrations/specorator",
    );
  });

  it("joins base (trailing slash) and path without double slash", async () => {
    vi.stubEnv("BASE_URL", "/specorator-ecosystem/");
    const { buildUrl } = await import("../utils/url");
    expect(buildUrl("integrations/specorator")).toBe(
      "/specorator-ecosystem/integrations/specorator",
    );
  });

  it("handles path with leading slash", async () => {
    vi.stubEnv("BASE_URL", "/specorator-ecosystem");
    const { buildUrl } = await import("../utils/url");
    expect(buildUrl("/integrations/specorator")).toBe(
      "/specorator-ecosystem/integrations/specorator",
    );
  });

  it("works with root base (/)", async () => {
    vi.stubEnv("BASE_URL", "/");
    const { buildUrl } = await import("../utils/url");
    expect(buildUrl("integrations/specorator")).toBe(
      "/integrations/specorator",
    );
  });

  it("works with empty base", async () => {
    vi.stubEnv("BASE_URL", "");
    const { buildUrl } = await import("../utils/url");
    expect(buildUrl("integrations/specorator")).toBe(
      "/integrations/specorator",
    );
  });
});
