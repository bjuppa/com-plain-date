import { weekDayNumber } from "./weekDayNumber.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";

// Unix epoch Jan 1 1970 is a Thursday

Deno.test("thursday is 4", () => {
  assertEquals(weekDayNumber(PlainDate({ year: 1970, day: 1 })), 4);
});

Deno.test("friday is 5", () => {
  assertEquals(weekDayNumber(PlainDate({ year: 1970, day: 2 })), 5);
});

Deno.test("saturday is 6", () => {
  assertEquals(weekDayNumber(PlainDate({ year: 1970, day: 3 })), 6);
});

Deno.test("sunday is 7", () => {
  assertEquals(weekDayNumber(PlainDate({ year: 1970, day: 4 })), 7);
});

Deno.test("monday is 1", () => {
  assertEquals(weekDayNumber(PlainDate({ year: 1970, day: 5 })), 1);
});

Deno.test("tuesday is 2", () => {
  assertEquals(weekDayNumber(PlainDate({ year: 1970, day: 6 })), 2);
});

Deno.test("wednesday is 3", () => {
  assertEquals(weekDayNumber(PlainDate({ year: 1970, day: 7 })), 3);
});
