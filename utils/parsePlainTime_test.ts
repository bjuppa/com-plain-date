import { parsePlainTime } from "./parsePlainTime.ts";
import { assertEquals, assertThrows } from "../dev_deps.ts";

Deno.test("can create plain-time from colon-separated ISO string", () => {
  assertEquals(String(parsePlainTime("01:02:03.123")), "01:02:03.123");
});

Deno.test("can create plain-time from prefixed ISO string", () => {
  assertEquals(String(parsePlainTime("T010203.123")), "01:02:03.123");
});

Deno.test("throws error when string only contains hour part", () => {
  assertThrows(() => parsePlainTime("01"));
});
