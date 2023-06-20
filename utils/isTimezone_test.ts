import { isTimezone } from "./isTimezone.ts";
import { assert, assertFalse } from "../dev_deps.ts";

Deno.test("returns true for a valid timezone", () => {
  assert(isTimezone("America/New_York"));
});

Deno.test("returns false for an invalid timezone", () => {
  assertFalse(isTimezone("America/New York"));
});

Deno.test("returns true for UTC", () => {
  assert(isTimezone("UTC"));
});
