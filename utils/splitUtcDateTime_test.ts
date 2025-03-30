import { assert, assertEquals } from "../dev_deps.ts";
import { splitUtcDateTime } from "./splitUtcDateTime.ts";

Deno.test("splits instant to date and time in UTC", () => {
  const instant = new Date("2022-12-31T23:59:30.999Z");
  const [plainDate, plainTime] = splitUtcDateTime(instant);

  assertEquals(plainDate.year, 2022);
  assertEquals(plainDate.month, 12);
  assertEquals(plainDate.day, 31);
  assertEquals(plainTime.hour, 23);
  assertEquals(plainTime.minute, 59);
  assertEquals(plainTime.second, 30);
  assertEquals(plainTime.millisecond, 999);
});

Deno.test("splits now in UTC", () => {
  assert(splitUtcDateTime());
});
