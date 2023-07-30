import { assertEquals } from "../dev_deps.ts";
import { tallyMilliseconds } from "./tallyMilliseconds.ts";

Deno.test("sums time into milliseconds", () => {
  assertEquals(
    tallyMilliseconds(1, 1, 1, 1),
    (60 * 60 + 60 + 1) * 1000 + 1,
  );
});

Deno.test("takes negative parameters", () => {
  assertEquals(
    tallyMilliseconds(-1, -1, -1, -1),
    (60 * 60 + 60 + 1) * -1000 - 1,
  );
});

Deno.test("takes undefined values", () => {
  assertEquals(tallyMilliseconds(), 0);
});
