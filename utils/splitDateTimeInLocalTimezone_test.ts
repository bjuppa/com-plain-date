import { assert, assertObjectMatch } from "../testing/asserts.ts";
import { splitDateTimeInLocalTimezone } from "./splitDateTimeInLocalTimezone.ts";

Deno.test("splits instant to date and time in local timezone", () => {
  const instant = new Date("2022-02-03");
  const [plainDate, plainTime] = splitDateTimeInLocalTimezone(instant);

  assertObjectMatch({ ...plainDate }, {
    year: instant.getFullYear(),
    month: instant.getMonth() + 1,
    day: instant.getDate(),
  });
  // TODO: assert plainTime matches
});

Deno.test("splits now in local timezone", () => {
  assert(splitDateTimeInLocalTimezone());
});
