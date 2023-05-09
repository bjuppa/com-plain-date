import { assertExists } from "./dev_deps.ts";
import * as mod from "./mod.ts";

Deno.test("module exports PlainDate factory", () => {
  assertExists(mod.PlainDate);
});

Deno.test("module exports ExPlainDate factory", () => {
  assertExists(mod.ExPlainDate);
});
