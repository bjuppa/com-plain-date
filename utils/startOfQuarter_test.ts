import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";
import { startOfQuarter } from "./startOfQuarter.ts";

Deno.test("start of Q1 is January 1", () => {
  assertEquals(
    String(startOfQuarter(PlainDate({ year: 2023, month: 3, day: 31 }))),
    "2023-01-01",
  );
});

Deno.test("start of Q2 is April 1", () => {
  assertEquals(
    String(startOfQuarter(PlainDate({ year: 2023, month: 6, day: 30 }))),
    "2023-04-01",
  );
});

Deno.test("start of Q3 is July 1", () => {
  assertEquals(
    String(startOfQuarter(PlainDate({ year: 2023, month: 9, day: 30 }))),
    "2023-07-01",
  );
});

Deno.test("start of Q4 is October 1", () => {
  assertEquals(
    String(startOfQuarter(PlainDate({ year: 2023, month: 12, day: 31 }))),
    "2023-10-01",
  );
});
