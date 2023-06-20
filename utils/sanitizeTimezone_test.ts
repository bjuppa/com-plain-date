import { sanitizeTimezone } from "./sanitizeTimezone.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("an invalid timezone passes unaltered", () => {
  assertEquals(sanitizeTimezone("XYZ/ABC"), "XYZ/ABC");
});

Deno.test("UTC passes unaltered", () => {
  assertEquals(sanitizeTimezone("UTC"), "UTC");
});

Deno.test("spaces are trimmed from ends", () => {
  assertEquals(sanitizeTimezone("  Europe/Stockholm  "), "Europe/Stockholm");
});

Deno.test("spaces are removed around slash", () => {
  assertEquals(sanitizeTimezone("Europe  /  Stockholm"), "Europe/Stockholm");
});

Deno.test("multiple slashes are condensed to a single slash", () => {
  assertEquals(sanitizeTimezone("Europe//Stockholm"), "Europe/Stockholm");
});

Deno.test("spaces between words are replaced with underscore", () => {
  assertEquals(sanitizeTimezone("America/New  York"), "America/New_York");
});

Deno.test("backslash is replaced with forward slash", () => {
  assertEquals(sanitizeTimezone("Europe\\Stockholm"), "Europe/Stockholm");
});

Deno.test("dash is not replaced", () => {
  assertEquals(sanitizeTimezone("Africa/Porto-Novo"), "Africa/Porto-Novo");
});

Deno.test("lowercase string is title-cased, but not short words within a valid name", () => {
  assertEquals(
    sanitizeTimezone("africa/el_aaiun"),
    "Africa/El_Aaiun",
  );
  assertEquals(
    sanitizeTimezone("africa/dar_es_salaam"),
    "Africa/Dar_es_Salaam",
  );
});

Deno.test("uppercase string is title-cased, but not short words within a valid name", () => {
  assertEquals(
    sanitizeTimezone("AFRICA/DAR_ES_SALAAM"),
    "Africa/Dar_es_Salaam",
  );
});

Deno.test("timezone with unique compound location passes unaltered", () => {
  // See https://en.wikipedia.org/wiki/Tz_database#Location
  assertEquals(
    sanitizeTimezone("America/Argentina/La_Rioja"),
    "America/Argentina/La_Rioja",
  );
});

Deno.test("timezone with compound location returns general timezone when available", () => {
  // See https://en.wikipedia.org/wiki/Tz_database#Location
  assertEquals(
    sanitizeTimezone("America/Indiana/Indianapolis"),
    "America/Indianapolis",
  );
});
