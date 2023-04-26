import { assert, assertEquals, assertThrows } from "../testing/asserts.ts";
import { splitDateTime } from "./splitDateTime.ts";

Deno.test("splits instant to date and time in specific timezone", () => {
  const instant = new Date("2022-12-31T23:59Z");
  const [plainDate, plainTime] = splitDateTime("Asia/Tokyo")(instant);

  assertEquals(String(plainDate), "2023-01-01");
  // TODO: assert plainTime matches
});

Deno.test("splits now in specific timezone", () => {
  assert(splitDateTime("Europe/Stockholm")());
});

Deno.test("throws error when splitting using invalid specific timezone", () => {
  assertThrows(() => {
    splitDateTime("invalid/timezone")();
  });
});
