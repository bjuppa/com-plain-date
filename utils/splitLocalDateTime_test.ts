import { assert, assertEquals } from "../testing/asserts.ts";
import { splitLocalDateTime } from "./splitLocalDateTime.ts";

Deno.test("splits instant to date and time in local timezone", () => {
  const instant = new Date("2022-02-03");
  const [plainDate, plainTime] = splitLocalDateTime(instant);

  assertEquals(plainDate.year, instant.getFullYear());
  assertEquals(plainDate.month, instant.getMonth() + 1);
  assertEquals(plainDate.day, instant.getDate());
  // TODO: assert plainTime matches
});

Deno.test("splits now in local timezone", () => {
  assert(splitLocalDateTime());
});
