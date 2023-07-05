import { formatDatetimeLocal } from "./formatDatetimeLocal.ts";
import { assertEquals, assertThrows } from "../dev_deps.ts";

Deno.test("formats string for HTML datetime-local input", () => {
  assertEquals(
    formatDatetimeLocal({
      year: 2022,
      month: 2,
      day: 3,
      hour: 4,
      minute: 5,
    }),
    "2022-02-03T04:05",
  );
});

Deno.test("cuts off second and millisecond", () => {
  assertEquals(
    formatDatetimeLocal({
      year: 2022,
      month: 2,
      day: 3,
      hour: 4,
      minute: 5,
      // @ts-ignore Override argument not allowed in type
      second: 6,
      // @ts-ignore Override argument not allowed in type
      millisecond: 7,
    }),
    "2022-02-03T04:05",
  );
});

Deno.test("takes 6-digit year", () => {
  assertEquals(
    formatDatetimeLocal({
      year: 100000,
    }),
    "100000-01-01T00:00",
  );
});

Deno.test("throws error if year is less than 1 and thus can't be handled by HTML datetime-local", () => {
  assertThrows(() => {
    formatDatetimeLocal({ year: 0 });
  });
});
