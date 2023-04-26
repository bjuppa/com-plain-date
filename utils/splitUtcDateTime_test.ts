import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { assert } from "../testing/asserts.ts";
import { splitUtcDateTime } from "./splitUtcDateTime.ts";

Deno.test("splits instant to date and time in UTC", () => {
  const instant = new Date("2022-02-03T23:59Z");
  const [plainDate, plainTime] = splitUtcDateTime(instant);

  assertEquals(String(plainDate), "2022-02-03");
  // TODO: assert plainTime matches
});

Deno.test("splits now in UTC", () => {
  assert(splitUtcDateTime());
});
