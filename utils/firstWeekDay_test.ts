import { firstWeekDay } from "./firstWeekDay.ts";
import { assertEquals, assertThrows } from "../testing/asserts.ts";
import { PlainDate } from "../PlainDate.ts";

Deno.test("returns same day from a monday", () => {
  assertEquals(
    String(firstWeekDay(1)(PlainDate({ year: 2023, month: 1, day: 9 }))),
    "2023-01-09",
  );
});

Deno.test("returns next monday from a tuesday", () => {
  assertEquals(
    String(firstWeekDay(1)(PlainDate({ year: 2023, month: 1, day: 10 }))),
    "2023-01-16",
  );
});

Deno.test("returns same day from a sunday", () => {
  assertEquals(
    String(firstWeekDay(7)(PlainDate({ year: 2023, month: 1, day: 15 }))),
    "2023-01-15",
  );
});

Deno.test("returns next sunday from a monday", () => {
  assertEquals(
    String(firstWeekDay(7)(PlainDate({ year: 2023, month: 1, day: 16 }))),
    "2023-01-22",
  );
});

Deno.test("throws when parameter is not between 1 and 7", () => {
  assertThrows(() => {
    firstWeekDay(0)(PlainDate({ year: 2023, month: 1, day: 1 }));
  });
  assertThrows(() => {
    firstWeekDay(8)(PlainDate({ year: 2023, month: 1, day: 1 }));
  });
});
