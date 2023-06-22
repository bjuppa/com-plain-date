import { parseTimezone } from "./parseTimezone.ts";
import { assertEquals, assertThrows } from "../dev_deps.ts";
import { supportedCanonicalTimezones } from "./supportedCanonicalTimezones.ts";

Deno.test("a valid timezone passes unaltered", () => {
  assertEquals(parseTimezone("Europe/Stockholm"), "Europe/Stockholm");
});

Deno.test("timezone with compound location are extracted", () => {
  // See https://en.wikipedia.org/wiki/Tz_database#Location
  assertEquals(
    parseTimezone("America/Argentina/La_Rioja"),
    "America/Argentina/La_Rioja",
  );
});

Deno.test("an invalid timezone throws error", () => {
  assertThrows(() => parseTimezone("XYZ/ABC"));
});

Deno.test("input is sanitized", () => {
  assertEquals(parseTimezone("  America  /  New  York  "), "America/New_York");
});

Deno.test("timezone name is extracted from a Temporal Time Zone Extension string", () => {
  // Example from https://tc39.es/proposal-temporal/
  assertEquals(
    parseTimezone("2020-08-05T20:06:13+09:00[Asia/Tokyo][u-ca=japanese]"),
    "Asia/Tokyo",
  );
});

Deno.test("timezone containing spaces is extracted among other words", () => {
  assertEquals(
    parseTimezone("America America / New York New York"),
    "America/New_York",
  );
});

Deno.test("UTC is extracted", () => {
  assertEquals(
    parseTimezone("The meeting is at 2020-08-05T20:06:13 UTC, be there!"),
    "UTC",
  );
});

Deno.test("UTC is extracted when before a local time", () => {
  assertEquals(parseTimezone("UTC 20:06:13"), "UTC");
});

Deno.test("UTC with 0 offset is extracted", () => {
  assertEquals(
    parseTimezone("The meeting is at 2020-08-05T20:06:13 UTC+0, be there!"),
    "UTC",
  );
  assertEquals(
    parseTimezone("The meeting is at 2020-08-05T20:06:13 UTC+00:00, be there!"),
    "UTC",
  );
});

Deno.test("UTC with positive offset is not extracted", () => {
  assertThrows(() =>
    parseTimezone("The meeting is at 2020-08-05T20:06:13 UTC+01, be there!")
  );
  assertThrows(() =>
    parseTimezone("The meeting is at 2020-08-05T20:06:13 UTC+00:30, be there!")
  );
  assertThrows(() =>
    parseTimezone("The meeting is at 2020-08-05T20:06:13 UTC +1, be there!")
  );
});

Deno.test("UTC with negative offset is not extracted", () => {
  assertThrows(() =>
    parseTimezone("The meeting is at 2020-08-05T20:06:13 UTC-01, be there!")
  );
  assertThrows(() =>
    parseTimezone("The meeting is at 2020-08-05T20:06:13 UTC-00:30, be there!")
  );
  assertThrows(() =>
    parseTimezone("The meeting is at 2020-08-05T20:06:13 UTC -1, be there!")
  );
});

Deno.test("Z is extracted as UTC from ISO string", () => {
  assertEquals(parseTimezone("2020-08-05T20:06:13Z"), "UTC");
});

Deno.test("the first of two named timezone takes precedence", () => {
  assertEquals(
    parseTimezone("America/New York Europe/Stockholm"),
    "America/New_York",
  );
});

Deno.test("a named timezone takes precedence over UTC", () => {
  assertEquals(
    parseTimezone("2020-08-05 UTC 20:06:13 Europe/Stockholm"),
    "Europe/Stockholm",
  );
});

Deno.test("all timezones known by the system passes unaltered", async (t) => {
  for (const tz of supportedCanonicalTimezones()) {
    await t.step(tz, () => {
      assertEquals(parseTimezone(tz), tz);
    });
  }
});
