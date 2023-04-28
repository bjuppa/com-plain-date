import { addTime } from "./addTime.ts";
import { assert, assertEquals } from "../dev_deps.ts";

Deno.test("returns new Date with added time parts", () => {
  const originalInstant = new Date(0);
  const newInstant = addTime({ hour: 1, minute: 1, second: 1, millisecond: 1 })(
    originalInstant,
  );

  assert(originalInstant !== newInstant, "Objects are the same");
  assertEquals(newInstant.toISOString(), "1970-01-01T01:01:01.001Z");
});
