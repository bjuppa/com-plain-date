import { daysInYear } from "./daysInYear.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("1900 was a common year", () => {
  assertEquals(daysInYear({ year: 1900 }), 365);
});

Deno.test("2000 was a leap year", () => {
  assertEquals(daysInYear({ year: 2000 }), 366);
});

Deno.test("2001 was a common year", () => {
  assertEquals(daysInYear({ year: 2001 }), 365);
});

Deno.test("2004 was a leap year", () => {
  assertEquals(daysInYear({ year: 2004 }), 366);
});
