import { assert, assertEquals } from "../testing/asserts.ts";
import { splitLocalDateTime } from "./splitLocalDateTime.ts";

Deno.test("splits instant to date and time in local timezone", () => {
  const instant = new Date("2022-12-31T23:59:30.999Z");
  const [plainDate, plainTime] = splitLocalDateTime(instant);

  assertEquals(plainDate.year, instant.getFullYear());
  assertEquals(plainDate.month, instant.getMonth() + 1);
  assertEquals(plainDate.day, instant.getDate());
  assertEquals(plainTime.hour, instant.getHours());
  assertEquals(plainTime.minute, instant.getMinutes());
  assertEquals(plainTime.second, instant.getSeconds());
  assertEquals(plainTime.millisecond, instant.getMilliseconds());
});

Deno.test("splits now in local timezone", () => {
  assert(splitLocalDateTime());
});
