import { differenceInQuarters } from "./differenceInQuarters.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";

Deno.test("returns number of quarters between plain dates", () => {
  const a = PlainDate({ year: 2022, month: 12, day: 31 });
  const b = PlainDate({ year: 2024, month: 1, day: 1 });
  assertEquals(differenceInQuarters(a)(b), 5);
});

Deno.test("returns 0 for dates in same quarter", () => {
  const a = PlainDate({ year: 2022, month: 1, day: 1 });
  const b = PlainDate({ year: 2022, month: 3, day: 31 });
  assertEquals(differenceInQuarters(a)(b), 0);
});

Deno.test("returns negative difference when 1st quarter is after 2nd quarter", () => {
  const a = PlainDate({ year: 2024, month: 1, day: 1 });
  const b = PlainDate({ year: 2022, month: 12, day: 31 });
  assertEquals(differenceInQuarters(a)(b), -5);
});
