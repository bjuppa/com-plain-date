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

Deno.test("takes string parameters", () => {
  assertEquals(
    tallyMilliseconds("01", "01", "01", "01"),
    (60 * 60 + 60 + 1) * 1000 + 1,
  );
});

Deno.test("takes large parameters", () => {
  assertEquals(
    tallyMilliseconds(9999, 9999, 9999, 9999),
    (9999 * 60 * 60 + 9999 * 60 + 9999) * 1000 + 9999,
  );
});

Deno.test("takes undefined values", () => {
  assertEquals(tallyMilliseconds(), 0);
});
