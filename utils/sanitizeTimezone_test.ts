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
