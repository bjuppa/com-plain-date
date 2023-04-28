import { createLocalInstant } from "./createLocalInstant.ts";
import {
  assert,
  assertEquals,
  assertInstanceOf,
  assertStringIncludes,
} from "../dev_deps.ts";

Deno.test("returned date object is valid", () => {
  const localDate = createLocalInstant({
    year: 2022,
    month: 1,
    day: 1,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  });

  assertInstanceOf(localDate, Date);
  assert(!isNaN(localDate.valueOf()));
  assertStringIncludes(localDate.toDateString(), "Jan 01 2022");
  assertStringIncludes(localDate.toTimeString(), "23:59:59");
  assertEquals(localDate.getMilliseconds(), 999);
});

Deno.test("omitted month and day defaults to 1 and time parts to 0", () => {
  const localDate = createLocalInstant({ year: "2022" });

  assertStringIncludes(localDate.toDateString(), "Jan 01 2022");
  assertStringIncludes(localDate.toTimeString(), "00:00:00");
  assertEquals(localDate.getMilliseconds(), 0);
});

Deno.test("parts can be strings", () => {
  const localDate = createLocalInstant({
    year: "1900",
    month: "02",
    day: "02",
    hour: "01",
    minute: "09",
    second: "05",
    millisecond: "001",
  });

  assertStringIncludes(localDate.toDateString(), "Feb 02 1900");
  assertStringIncludes(localDate.toTimeString(), "01:09:05");
  assertEquals(localDate.getMilliseconds(), 1);
});

Deno.test("month >12 and day >31 overflows into next year and month", () => {
  const localDate = createLocalInstant({
    year: 2022,
    month: 13,
    day: 32,
  });

  assertStringIncludes(localDate.toDateString(), "Feb 01 2023");
});

Deno.test("month 0 overflows into december of previous year", () => {
  const localDate = createLocalInstant({
    year: 2022,
    month: 0,
    day: 1,
  });

  assertStringIncludes(localDate.toDateString(), "Dec 01 2021");
});

Deno.test("day 0 overflows into last day of previous month", () => {
  const localDate = createLocalInstant({
    year: 2022,
    month: 1,
    day: 0,
  });

  assertStringIncludes(localDate.toDateString(), "Dec 31 2021");
});

Deno.test("hour >23 overflows into next day", () => {
  const localDate = createLocalInstant({ year: 2022, hour: 24 });

  assertStringIncludes(localDate.toDateString(), "Jan 02 2022");
  assertStringIncludes(localDate.toTimeString(), "00:00:00");
});

Deno.test("negative hour overflows into previous day", () => {
  const localDate = createLocalInstant({ year: 2022, hour: -24 });

  assertStringIncludes(localDate.toDateString(), "Dec 31 2021");
  assertStringIncludes(localDate.toTimeString(), "00:00:00");
});

Deno.test("minute >59 overflows into next hour", () => {
  const localDate = createLocalInstant({ year: 2022, minute: 60 });

  assertStringIncludes(localDate.toDateString(), "Jan 01 2022");
  assertStringIncludes(localDate.toTimeString(), "01:00:00");
});

Deno.test("negative minute overflows into previous hour", () => {
  const localDate = createLocalInstant({ year: 2022, minute: -60 });

  assertStringIncludes(localDate.toDateString(), "Dec 31 2021");
  assertStringIncludes(localDate.toTimeString(), "23:00:00");
});

Deno.test("second >59 overflows into next minute", () => {
  const localDate = createLocalInstant({ year: 2022, second: 60 });

  assertStringIncludes(localDate.toDateString(), "Jan 01 2022");
  assertStringIncludes(localDate.toTimeString(), "00:01:00");
});

Deno.test("negative second overflows into previous minute", () => {
  const localDate = createLocalInstant({ year: 2022, second: -60 });

  assertStringIncludes(localDate.toDateString(), "Dec 31 2021");
  assertStringIncludes(localDate.toTimeString(), "23:59:00");
});

Deno.test("millisecond >999 overflows into next second", () => {
  const localDate = createLocalInstant({
    year: 2022,
    millisecond: 1000,
  });

  assertStringIncludes(localDate.toDateString(), "Jan 01 2022");
  assertStringIncludes(localDate.toTimeString(), "00:00:01");
});

Deno.test("negative millisecond overflows into previous second", () => {
  const localDate = createLocalInstant({
    year: 2022,
    millisecond: -1000,
  });

  assertStringIncludes(localDate.toDateString(), "Dec 31 2021");
  assertStringIncludes(localDate.toTimeString(), "23:59:59");
});

Deno.test("year can be negative", () => {
  const localDate = createLocalInstant({ year: -1, month: 1, day: 1 });

  assertStringIncludes(localDate.toDateString(), "Jan 01 -0001");
  assertStringIncludes(localDate.toTimeString(), "00:00:00");
});

Deno.test("year can be 0", () => {
  const localDate = createLocalInstant({ year: 0, month: 1, day: 1 });

  assertStringIncludes(localDate.toDateString(), "Jan 01 0");
  assertStringIncludes(localDate.toTimeString(), "00:00:00");
});

Deno.test("year can be 6-digits", () => {
  const localDate = createLocalInstant({ year: 100000 });

  assertStringIncludes(localDate.toDateString(), "Jan 01 100000");
  assertStringIncludes(localDate.toTimeString(), "00:00:00");
});

Deno.test("7-digit year produces invalid date object", () => {
  const localDate = createLocalInstant({ year: 1000000 });

  assert(isNaN(localDate.valueOf()));
});

Deno.test("invalid year produces invalid date object", () => {
  const localDate = createLocalInstant({ year: NaN });

  assert(isNaN(localDate.valueOf()));
});

Deno.test("invalid month produces invalid date object", () => {
  const localDate = createLocalInstant({ year: 2022, month: NaN });

  assert(isNaN(localDate.valueOf()));
});

Deno.test("invalid day produces invalid date object", () => {
  const localDate = createLocalInstant({ year: 2022, day: NaN });

  assert(isNaN(localDate.valueOf()));
});

Deno.test("invalid hour produces invalid date object", () => {
  const localDate = createLocalInstant({ year: 2022, hour: NaN });

  assert(isNaN(localDate.valueOf()));
});

Deno.test("invalid minute produces invalid date object", () => {
  const localDate = createLocalInstant({ year: 2022, minute: NaN });

  assert(isNaN(localDate.valueOf()));
});

Deno.test("invalid second produces invalid date object", () => {
  const localDate = createLocalInstant({ year: 2022, second: NaN });

  assert(isNaN(localDate.valueOf()));
});

Deno.test("invalid millisecond produces invalid date object", () => {
  const localDate = createLocalInstant({
    year: 2022,
    millisecond: NaN,
  });

  assert(isNaN(localDate.valueOf()));
});
