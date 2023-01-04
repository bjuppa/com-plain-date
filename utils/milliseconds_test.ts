import { assertEquals } from "../testing/asserts.ts";
import { milliseconds } from "./milliseconds.ts";

Deno.test("sums time parts into milliseconds", () => {
  assertEquals(
    milliseconds({ hour: 1, minute: 1, second: 1, millisecond: 1 }),
    (60 * 60 + 60 + 1) * 1000 + 1,
  );
});

Deno.test("takes negative parts", () => {
  assertEquals(
    milliseconds({ hour: -1, minute: -1, second: -1, millisecond: -1 }),
    (60 * 60 + 60 + 1) * -1000 - 1,
  );
});
