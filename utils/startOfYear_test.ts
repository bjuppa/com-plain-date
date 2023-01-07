import { startOfYear } from "./startOfYear.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";

Deno.test("returns first day of the year", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 15 });

  assertEquals(String(startOfYear(plainDate)), "2022-01-01");
});
