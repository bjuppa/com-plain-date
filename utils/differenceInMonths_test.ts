import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";
import { differenceInMonths } from "./differenceInMonths.ts";

Deno.test("returns number of months between plain dates", () => {
  const a = PlainDate({ year: 2022, month: 12, day: 31 });
  const b = PlainDate({ year: 2024, month: 1, day: 1 });
  assertEquals(differenceInMonths(a)(b), 13);
});

Deno.test("returns 0 for dates in same month", () => {
  const a = PlainDate({ year: 2022, month: 1, day: 1 });
  const b = PlainDate({ year: 2022, month: 1, day: 31 });
  assertEquals(differenceInMonths(a)(b), 0);
});

Deno.test("returns negative difference when 1st month is after 2nd month", () => {
  const a = PlainDate({ year: 2024, month: 1, day: 1 });
  const b = PlainDate({ year: 2022, month: 12, day: 31 });
  assertEquals(differenceInMonths(a)(b), -13);
});
