import { createUtcDate } from "./createUtcDate.ts";
import { assert, assertEquals, assertInstanceOf } from "../testing/asserts.ts";

Deno.test("returned date object is valid", () => {
  const utcDate = createUtcDate({ year: 2022, month: 1, day: 1 });

  assertInstanceOf(utcDate, Date);
  assert(!isNaN(utcDate.valueOf()));
  assertEquals(utcDate.toISOString(), "2022-01-01T00:00:00.000Z");
});

Deno.test("omitted month and day defaults to 1", () => {
  const utcDate = createUtcDate({ year: "2022" });

  assertEquals(utcDate.toISOString(), "2022-01-01T00:00:00.000Z");
});

Deno.test("parts can be strings", () => {
  const utcDate = createUtcDate({ year: "1900", month: "02", day: "02" });

  assertEquals(utcDate.toISOString(), "1900-02-02T00:00:00.000Z");
});

Deno.test("month >12 and day >31 overflows into next year and month", () => {
  const utcDate = createUtcDate({ year: 2022, month: 13, day: 32 });

  assertEquals(utcDate.toISOString(), "2023-02-01T00:00:00.000Z");
});

Deno.test("month 0 overflows into december of previous year", () => {
  const utcDate = createUtcDate({ year: 2022, month: 0, day: 1 });

  assertEquals(utcDate.toISOString(), "2021-12-01T00:00:00.000Z");
});

Deno.test("day 0 overflows into last day of previous month", () => {
  const utcDate = createUtcDate({ year: 2022, month: 1, day: 0 });

  assertEquals(utcDate.toISOString(), "2021-12-31T00:00:00.000Z");
});

Deno.test("year can be negative", () => {
  const utcDate = createUtcDate({ year: -1, month: 1, day: 1 });

  assertEquals(utcDate.toISOString(), "-000001-01-01T00:00:00.000Z");
});

Deno.test("year can be 0", () => {
  const utcDate = createUtcDate({ year: 0, month: 1, day: 1 });

  assertEquals(utcDate.toISOString(), "0000-01-01T00:00:00.000Z");
});

Deno.test("year can be 6-digits", () => {
  const utcDate = createUtcDate({ year: 100000 });

  assertEquals(utcDate.toISOString(), "+100000-01-01T00:00:00.000Z");
});

Deno.test("7-digit year produces invalid date object", () => {
  const utcDate = createUtcDate({ year: 1000000 });

  assert(isNaN(utcDate.valueOf()));
});

Deno.test("invalid year produces invalid date object", () => {
  const utcDate = createUtcDate({ year: NaN });

  assert(isNaN(utcDate.valueOf()));
});
