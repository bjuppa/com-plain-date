import { assertEquals } from "../dev_deps.ts";
import { tallyMilliseconds } from "./tallyMilliseconds.ts";

Deno.test("sums time parts into milliseconds", () => {
  assertEquals(
    tallyMilliseconds({ hour: 1, minute: 1, second: 1, millisecond: 1 }),
    (60 * 60 + 60 + 1) * 1000 + 1,
  );
});

Deno.test("takes negative parts", () => {
  assertEquals(
    tallyMilliseconds({ hour: -1, minute: -1, second: -1, millisecond: -1 }),
    (60 * 60 + 60 + 1) * -1000 - 1,
  );
});

Deno.test("takes undefined values", () => {
  assertEquals(tallyMilliseconds({}), 0);
});
