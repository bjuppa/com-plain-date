import { subtractTime } from "./subtractTime.ts";
import { assert, assertEquals } from "../testing/asserts.ts";

Deno.test("returns new Date with subtracted time parts", () => {
  const originalInstant = new Date(0);
  const newInstant = subtractTime({
    hour: 1,
    minute: 1,
    second: 1,
    millisecond: 1,
  })(
    originalInstant,
  );

  assert(originalInstant !== newInstant, "Objects are the same");
  assertEquals(newInstant.toISOString(), "1969-12-31T22:58:58.999Z");
});
