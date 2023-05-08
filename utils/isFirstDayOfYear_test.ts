import { isFirstDayOfYear } from "./isFirstDayOfYear.ts";
import { assert, assertFalse } from "../dev_deps.ts";

Deno.test("true for Jan 1", () => {
  assert(isFirstDayOfYear({ month: "01", day: "01" }));
});

Deno.test("false for Feb 1", () => {
  assertFalse(isFirstDayOfYear({ month: 2, day: 1 }));
});
