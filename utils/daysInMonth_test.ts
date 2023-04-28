import { daysInMonth } from "./daysInMonth.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("Jan has 31 days", () => {
  assertEquals(daysInMonth({ year: 2023, month: 1 }), 31);
});

Deno.test("Feb has 28 days in common year", () => {
  assertEquals(daysInMonth({ year: 2023, month: 2 }), 28);
});

Deno.test("Feb has 29 days in leap year", () => {
  assertEquals(daysInMonth({ year: 2004, month: 2 }), 29);
});

Deno.test("April has 30 days", () => {
  assertEquals(daysInMonth({ year: 2023, month: 4 }), 30);
});
