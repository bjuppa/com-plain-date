import { createUtcInstant } from "./createUtcInstant.ts";
import { assert, assertEquals, assertInstanceOf } from "../dev_deps.ts";

Deno.test("returned Date object is valid", () => {
  const utcDate = createUtcInstant({
    year: 2022,
    month: 1,
    day: 1,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  });

  assertInstanceOf(utcDate, Date);
  assert(!isNaN(utcDate.valueOf()));
  assertEquals(utcDate.toISOString(), "2022-01-01T23:59:59.999Z");
});

Deno.test("omitted month and day defaults to 1 and time parts to 0", () => {
  const utcDate = createUtcInstant({ year: "2022" });

  assertEquals(utcDate.toISOString(), "2022-01-01T00:00:00.000Z");
});

Deno.test("parts can be strings", () => {
  const utcDate = createUtcInstant({
    year: "1900",
    month: "02",
    day: "02",
    hour: "01",
    minute: "09",
    second: "05",
    millisecond: "001",
  });

  assertEquals(utcDate.toISOString(), "1900-02-02T01:09:05.001Z");
});

Deno.test("month >12 and day >31 overflows into next year and month", () => {
  const utcDate = createUtcInstant({ year: 2022, month: 13, day: 32 });

  assertEquals(utcDate.toISOString(), "2023-02-01T00:00:00.000Z");
});

Deno.test("month 0 overflows into december of previous year", () => {
  const utcDate = createUtcInstant({ year: 2022, month: 0, day: 1 });

  assertEquals(utcDate.toISOString(), "2021-12-01T00:00:00.000Z");
});

Deno.test("day 0 overflows into last day of previous month", () => {
  const utcDate = createUtcInstant({ year: 2022, month: 1, day: 0 });

  assertEquals(utcDate.toISOString(), "2021-12-31T00:00:00.000Z");
});

Deno.test("hour >23 overflows into next day", () => {
  const utcDate = createUtcInstant({ year: 2022, hour: 24 });

  assertEquals(utcDate.toISOString(), "2022-01-02T00:00:00.000Z");
});

Deno.test("negative hour overflows into previous day", () => {
  const utcDate = createUtcInstant({ year: 2022, hour: -24 });

  assertEquals(utcDate.toISOString(), "2021-12-31T00:00:00.000Z");
});

Deno.test("minute >59 overflows into next hour", () => {
  const utcDate = createUtcInstant({ year: 2022, minute: 60 });

  assertEquals(utcDate.toISOString(), "2022-01-01T01:00:00.000Z");
});

Deno.test("negative minute overflows into previous hour", () => {
  const utcDate = createUtcInstant({ year: 2022, minute: -60 });

  assertEquals(utcDate.toISOString(), "2021-12-31T23:00:00.000Z");
});

Deno.test("second >59 overflows into next minute", () => {
  const utcDate = createUtcInstant({ year: 2022, second: 60 });

  assertEquals(utcDate.toISOString(), "2022-01-01T00:01:00.000Z");
});

Deno.test("negative second overflows into previous minute", () => {
  const utcDate = createUtcInstant({ year: 2022, second: -60 });

  assertEquals(utcDate.toISOString(), "2021-12-31T23:59:00.000Z");
});

Deno.test("millisecond >999 overflows into next second", () => {
  const utcDate = createUtcInstant({ year: 2022, millisecond: 1000 });

  assertEquals(utcDate.toISOString(), "2022-01-01T00:00:01.000Z");
});

Deno.test("negative millisecond overflows into previous second", () => {
  const utcDate = createUtcInstant({ year: 2022, millisecond: -1000 });

  assertEquals(utcDate.toISOString(), "2021-12-31T23:59:59.000Z");
});

Deno.test("year can be negative", () => {
  const utcDate = createUtcInstant({ year: -1, month: 1, day: 1 });

  assertEquals(utcDate.toISOString(), "-000001-01-01T00:00:00.000Z");
});

Deno.test("year can be 0", () => {
  const utcDate = createUtcInstant({ year: 0, month: 1, day: 1 });

  assertEquals(utcDate.toISOString(), "0000-01-01T00:00:00.000Z");
});

Deno.test("year can be 6-digits", () => {
  const utcDate = createUtcInstant({ year: 100000 });

  assertEquals(utcDate.toISOString(), "+100000-01-01T00:00:00.000Z");
});

Deno.test("7-digit year produces invalid Date object", () => {
  const utcDate = createUtcInstant({ year: 1000000 });

  assert(isNaN(utcDate.valueOf()));
});

Deno.test("invalid year produces invalid Date object", () => {
  const utcDate = createUtcInstant({ year: NaN });

  assert(isNaN(utcDate.valueOf()));
});

Deno.test("invalid month produces invalid Date object", () => {
  const utcDate = createUtcInstant({ year: 2022, month: NaN });

  assert(isNaN(utcDate.valueOf()));
});

Deno.test("invalid day produces invalid Date object", () => {
  const utcDate = createUtcInstant({ year: 2022, day: NaN });

  assert(isNaN(utcDate.valueOf()));
});

Deno.test("invalid hour produces invalid Date object", () => {
  const utcDate = createUtcInstant({ year: 2022, hour: NaN });

  assert(isNaN(utcDate.valueOf()));
});

Deno.test("invalid minute produces invalid Date object", () => {
  const utcDate = createUtcInstant({ year: 2022, minute: NaN });

  assert(isNaN(utcDate.valueOf()));
});

Deno.test("invalid second produces invalid Date object", () => {
  const utcDate = createUtcInstant({ year: 2022, second: NaN });

  assert(isNaN(utcDate.valueOf()));
});

Deno.test("invalid millisecond produces invalid Date object", () => {
  const utcDate = createUtcInstant({ year: 2022, millisecond: NaN });

  assert(isNaN(utcDate.valueOf()));
});
