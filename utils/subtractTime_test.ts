import { subtractTime } from "./subtractTime.ts";
import { assert, assertEquals } from "../dev_deps.ts";

Deno.test("returns new Date with subtracted time parts", () => {
  const originalInstant = new Date(0);
  const newInstant = subtractTime({
    hours: 1,
    minutes: 1,
    seconds: 1,
    milliseconds: 1,
  })(
    originalInstant,
  );

  assert(originalInstant !== newInstant, "Objects are the same");
  assertEquals(newInstant.toISOString(), "1969-12-31T22:58:58.999Z");
});
