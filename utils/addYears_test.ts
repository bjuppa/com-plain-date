import { addYears } from "./addYears.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";

Deno.test("years can be added with positive argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 1, day: 31 });

  assertEquals(String(addYears(2)(plainDate)), "2024-01-31");
});

Deno.test("years can be subtracted with negative argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 1, day: 31 });

  assertEquals(String(addYears(-2)(plainDate)), "2020-01-31");
});
