import { isBusinessDay } from "./isBusinessDay.ts";
import { PlainDate } from "../PlainDate.ts";
import { assert, assertFalse } from "../dev_deps.ts";

Deno.test("true for a Monday", () => {
  assert(isBusinessDay(PlainDate({ year: 2023, month: 1, day: 16 })));
});

Deno.test("true for a Tuesday", () => {
  assert(isBusinessDay(PlainDate({ year: 2023, month: 1, day: 17 })));
});

Deno.test("true for a Wednesday", () => {
  assert(isBusinessDay(PlainDate({ year: 2023, month: 1, day: 18 })));
});

Deno.test("true for a Thursday", () => {
  assert(isBusinessDay(PlainDate({ year: 2023, month: 1, day: 19 })));
});

Deno.test("true for a Friday", () => {
  assert(isBusinessDay(PlainDate({ year: 2023, month: 1, day: 20 })));
});

Deno.test("false for a Saturday", () => {
  assertFalse(isBusinessDay(PlainDate({ year: 2023, month: 1, day: 21 })));
});

Deno.test("false for a Sunday", () => {
  assertFalse(isBusinessDay(PlainDate({ year: 2023, month: 1, day: 22 })));
});
