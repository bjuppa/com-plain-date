import { isFirstDayOfMonth } from "./isFirstDayOfMonth.ts";
import { assert, assertFalse } from "../dev_deps.ts";

Deno.test("true for first day of month", () => {
  assert(isFirstDayOfMonth({
    // @ts-ignore Override argument not allowed in type
    year: 2023,
    month: 2,
    day: 1,
  }));
});

Deno.test("false for last day of month", () => {
  assertFalse(isFirstDayOfMonth({
    // @ts-ignore Override argument not allowed in type
    year: 2023,
    month: 2,
    day: 28,
  }));
});
