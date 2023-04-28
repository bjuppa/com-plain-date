import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../dev_deps.ts";
import { differenceInYears } from "./differenceInYears.ts";

Deno.test("returns number of calendar years between plain dates", () => {
  const a = PlainDate({ year: 2022, month: 12, day: 31 });
  const b = PlainDate({ year: 2023, month: 1, day: 1 });
  assertEquals(differenceInYears(a)(b), 1);
});

Deno.test("returns 0 for dates in same year", () => {
  const a = PlainDate({ year: 2022, month: 1, day: 1 });
  const b = PlainDate({ year: 2022, month: 12, day: 31 });
  assertEquals(differenceInYears(a)(b), 0);
});

Deno.test("returns negative difference when 1st year is after 2nd year", () => {
  const a = PlainDate({ year: 2022, month: 1, day: 1 });
  const b = PlainDate({ year: 2021, month: 12, day: 31 });
  assertEquals(differenceInYears(a)(b), -1);
});
