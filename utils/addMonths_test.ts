import { addMonths } from "./addMonths.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";

Deno.test("months can be added with positive argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 1, day: 10 });

  assertEquals(String(addMonths(2)(plainDate)), "2022-03-10");
});

Deno.test("months can be subtracted with negative argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 1, day: 10 });

  assertEquals(String(addMonths(-2)(plainDate)), "2021-11-10");
});

Deno.test("returns the same day of the month when destination month has more days", () => {
  // 2024 is a leap year so February has 29 days
  const plainDate = PlainDate({ year: 2022, month: 4, day: 30 });

  assertEquals(String(addMonths(1)(plainDate)), "2022-05-30");
});

Deno.test("returns last day of month when destination month has the same number of days", () => {
  // 2024 is a leap year so February has 29 days
  const plainDate = PlainDate({ year: 2022, month: 1, day: 31 });

  assertEquals(String(addMonths(-1)(plainDate)), "2021-12-31");
});

Deno.test("returns last day of month when destination month has fewer days", () => {
  // 2024 is a leap year so February has 29 days
  const plainDate = PlainDate({ year: 2024, month: 3, day: 31 });

  assertEquals(String(addMonths(1)(plainDate)), "2024-04-30");
  assertEquals(String(addMonths(-1)(plainDate)), "2024-02-29");
});

Deno.test("has parity with difference-in-months", () => {
  // Months before and after March have fewer than 31 days
  const plainDate = PlainDate({ year: 2022, month: 3, day: 31 });

  assertEquals(plainDate.differenceInMonths(addMonths(13)(plainDate)), 13);
  assertEquals(plainDate.differenceInMonths(addMonths(-13)(plainDate)), -13);
});
