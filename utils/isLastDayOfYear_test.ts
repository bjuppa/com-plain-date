import { isLastDayOfYear } from "./isLastDayOfYear.ts";
import { assert, assertFalse } from "../dev_deps.ts";

Deno.test("true for Dec 31", () => {
  assert(isLastDayOfYear({ month: "12", day: "31" }));
});

Deno.test("false for Jan 31", () => {
  assertFalse(isLastDayOfYear({ month: 1, day: 31 }));
});
