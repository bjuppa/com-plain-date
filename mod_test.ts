import { assertExists } from "./dev_deps.ts";
import * as module from "./mod.ts";

Deno.test("module exports PlainDate factory", () => {
  assertExists(module.PlainDate);
});

Deno.test("module exports ExPlainDate factory", () => {
  assertExists(module.ExPlainDate);
});
