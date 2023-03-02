import { addDays } from "./addDays.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";
import { differenceInDays } from "./differenceInDays.ts";

Deno.test("days can be added with positive argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 1, day: 31 });

  assertEquals(String(addDays(2)(plainDate)), "2022-02-02");
});

Deno.test("days can be subtracted with negative argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 1, day: 1 });

  assertEquals(String(addDays(-2)(plainDate)), "2021-12-30");
});

Deno.test("has parity with difference-in-days", () => {
  const plainDate = PlainDate({ year: 2022, month: 3, day: 31 });

  assertEquals(differenceInDays(plainDate)(addDays(100)(plainDate)), 100);
  assertEquals(differenceInDays(plainDate)(addDays(-100)(plainDate)), -100);
});
