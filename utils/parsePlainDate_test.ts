import { parsePlainDate } from "./parsePlainDate.ts";
import { assertEquals, assertThrows } from "../dev_deps.ts";

Deno.test("can create plain-date from ISO string", () => {
  assertEquals(String(parsePlainDate("2022-02-02")), "2022-02-02");
});

Deno.test("throws error when string only contains year part", () => {
  assertThrows(() => parsePlainDate("2022"));
});
