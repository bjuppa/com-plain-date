import { safeTimezone } from "./safeTimezone.ts";
import { assert, assertEquals, assertNotEquals } from "../dev_deps.ts";

Deno.test("a valid timezone passes unaltered", () => {
  assertEquals(safeTimezone("Europe/Stockholm"), "Europe/Stockholm");
});

Deno.test("returns either a named timezone or UTC for an invalid timezone", () => {
  const tz = safeTimezone("XYZ/ABC");
  assertNotEquals(tz, "XYZ/ABC");
  assert(tz.match(/\w+\/\w+/) || tz === "UTC");
});
