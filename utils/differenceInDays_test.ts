import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../dev_deps.ts";
import { differenceInDays } from "./differenceInDays.ts";

Deno.test("returns number of calendar days between plain dates", () => {
  const a = PlainDate({ year: 2022, month: 12, day: 31 });
  const b = PlainDate({ year: 2023, month: 1, day: 20 });
  assertEquals(differenceInDays(a)(b), 20);
});

Deno.test("returns 0 when comparing the same day", () => {
  const a = PlainDate({ year: 2022, month: 1, day: 1 });
  const b = PlainDate({ year: 2022, month: 1, day: 1 });
  assertEquals(differenceInDays(a)(b), 0);
});

Deno.test("returns negative difference when 1st day is after 2nd day", () => {
  const a = PlainDate({ year: 2022, month: 1, day: 20 });
  const b = PlainDate({ year: 2021, month: 12, day: 31 });
  assertEquals(differenceInDays(a)(b), -20);
});

Deno.test("returns number of calendar days between plain dates that are really far apart", () => {
  const a = PlainDate({ year: 1970 });
  const b = PlainDate({ year: 100000 });
  assertEquals(differenceInDays(a)(b), 35804722);
});
