import { assert, assertObjectMatch } from "../testing/asserts.ts";
import { splitDateTimeInUtc } from "./splitDateTimeInUtc.ts";

Deno.test("splits instant to date and time in UTC", () => {
  const instant = new Date("2022-02-03T23:59Z");
  const [plainDate, plainTime] = splitDateTimeInUtc(instant);

  assertObjectMatch({ ...plainDate }, {
    year: 2022,
    month: 2,
    day: 3,
  });
  // TODO: assert plainTime matches
});

Deno.test("splits now in UTC", () => {
  assert(splitDateTimeInUtc());
});
