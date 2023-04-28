import { addQuarters } from "./addQuarters.ts";
import { differenceInQuarters } from "./differenceInQuarters.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("quarters can be added with positive argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 10 });

  assertEquals(String(addQuarters(2)(plainDate)), "2022-08-10");
});

Deno.test("quarters can be subtracted with negative argument", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 10 });

  assertEquals(String(addQuarters(-2)(plainDate)), "2021-08-10");
});

Deno.test("has parity with difference-in-quarters", () => {
  const plainDate = PlainDate({ year: 2022, month: 3, day: 31 });

  assertEquals(differenceInQuarters(plainDate)(addQuarters(1)(plainDate)), 1);
  assertEquals(differenceInQuarters(plainDate)(addQuarters(-2)(plainDate)), -2);
});
