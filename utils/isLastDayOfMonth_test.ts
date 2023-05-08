import { isLastDayOfMonth } from "./isLastDayOfMonth.ts";
import { assert, assertFalse } from "../dev_deps.ts";

Deno.test("true for last day of month", () => {
  assert(isLastDayOfMonth({ year: "2023", month: "02", day: "28" }));
});

Deno.test("false for first day of month", () => {
  assertFalse(isLastDayOfMonth({ year: 2023, month: 2, day: 1 }));
});
