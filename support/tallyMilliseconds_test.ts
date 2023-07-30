import { assertEquals } from "../dev_deps.ts";
import { tallyMilliseconds } from "./tallyMilliseconds.ts";

Deno.test("sums time parts into milliseconds", () => {
  assertEquals(
    tallyMilliseconds({ hours: 1, minutes: 1, seconds: 1, milliseconds: 1 }),
    (60 * 60 + 60 + 1) * 1000 + 1,
  );
});

Deno.test("takes negative parts", () => {
  assertEquals(
    tallyMilliseconds({
      hours: -1,
      minutes: -1,
      seconds: -1,
      milliseconds: -1,
    }),
    (60 * 60 + 60 + 1) * -1000 - 1,
  );
});

Deno.test("takes undefined values", () => {
  assertEquals(tallyMilliseconds({}), 0);
});
