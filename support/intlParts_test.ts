import { assertObjectMatch } from "../dev_deps.ts";
import { createUtcInstant } from "../utils/createUtcInstant.ts";
import { intlParts } from "./intlParts.ts";

Deno.test("returns all Intl date-time format parts", () => {
  const parts = intlParts(
    Intl.DateTimeFormat("en", {
      hourCycle: "h23",
      weekday: "short",
      era: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      fractionalSecondDigits: 3,
      timeZoneName: "longOffset",
      timeZone: "GMT",
    }),
  )(
    createUtcInstant({ year: 2022 }),
  );

  assertObjectMatch(parts, {
    day: "1",
    era: "AD",
    hour: "00",
    minute: "00",
    month: "1",
    second: "00",
    fractionalSecond: "000",
    timeZoneName: "GMT",
    weekday: "Sat",
    year: "2022",
  });
});
