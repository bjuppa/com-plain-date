import { addMonths } from "./addMonths.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";

Deno.test("months can be added with positive argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 1, day: 1 });

  assertEquals(String(addMonths(2)(plainDate)), "2022-03-01");
});

Deno.test("months can be subtracted with negative argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 1, day: 1 });

  assertEquals(String(addMonths(-2)(plainDate)), "2021-11-01");
});

Deno.test("adding months to last day of month overflows into next month if shorter", () => {
  const plainDate = PlainDate({ year: 2022, month: 1, day: 31 });

  assertEquals(String(addMonths(1)(plainDate)), "2022-03-03");
});
