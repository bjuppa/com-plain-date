import { isWeekendDay } from "./isWeekendDay.ts";
import { PlainDate } from "../PlainDate.ts";
import { assert, assertFalse } from "../dev_deps.ts";

Deno.test("false for a Monday", () => {
  assertFalse(isWeekendDay(PlainDate({ year: 2023, month: 1, day: 16 })));
});

Deno.test("false for a Tuesday", () => {
  assertFalse(isWeekendDay(PlainDate({ year: 2023, month: 1, day: 17 })));
});

Deno.test("false for a Wednesday", () => {
  assertFalse(isWeekendDay(PlainDate({ year: 2023, month: 1, day: 18 })));
});

Deno.test("false for a Thursday", () => {
  assertFalse(isWeekendDay(PlainDate({ year: 2023, month: 1, day: 19 })));
});

Deno.test("false for a Friday", () => {
  assertFalse(isWeekendDay(PlainDate({ year: 2023, month: 1, day: 20 })));
});

Deno.test("true for a Saturday", () => {
  assert(isWeekendDay(PlainDate({ year: 2023, month: 1, day: 21 })));
});

Deno.test("true for a Sunday", () => {
  assert(isWeekendDay(PlainDate({ year: 2023, month: 1, day: 22 })));
});
