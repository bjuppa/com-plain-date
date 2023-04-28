import { assert, assertEquals, assertThrows } from "../dev_deps.ts";
import { splitDateTime } from "./splitDateTime.ts";

Deno.test("splits instant to date and time in specific timezone", () => {
  const instant = new Date("2022-12-31T23:59:30.999Z");
  const [plainDate, plainTime] = splitDateTime("Asia/Tokyo")(instant); // Tokyo is 9 hours ahead of UTC

  assertEquals(plainDate.year, 2023);
  assertEquals(plainDate.month, 1);
  assertEquals(plainDate.day, 1);
  assertEquals(plainTime.hour, 8);
  assertEquals(plainTime.minute, 59);
  assertEquals(plainTime.second, 30);
  assertEquals(plainTime.millisecond, 999);
});

Deno.test("splits now in specific timezone", () => {
  assert(splitDateTime("Europe/Stockholm")());
});

Deno.test("throws error when splitting using invalid specific timezone", () => {
  assertThrows(() => {
    splitDateTime("invalid/timezone")();
  });
});
