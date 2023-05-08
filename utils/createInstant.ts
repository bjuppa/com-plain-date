import { createUtcInstant } from "./createUtcInstant.ts";
import { addTime } from "./addTime.ts";
import { subtractTime } from "./subtractTime.ts";
import { intlParts } from "../support/intlParts.ts";
import { timezoneOffsetParts } from "../support/timezoneOffsetParts.ts";
import { HOURS_IN_DAY } from "../constants.ts";
import { isTruthy } from "../support/isTruthy.ts";
import { SloppyDateTime } from "../support/sloppy-types.ts";

const intlOptions: Intl.DateTimeFormatOptions = {
  hourCycle: "h23",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

/**
 * Get a function curried with a timezone, to create native JS Date objects
 * from date-time objects interpreted in the timezone.
 */
export function createInstant(timezone: string) {
  return (
    {
      year = NaN,
      month = 1,
      day = 1,
      hour = 0,
      minute = 0,
      second = 0,
      millisecond = 0,
    }: SloppyDateTime,
  ): Date => {
    const intlUtcFormat = Intl.DateTimeFormat("en", {
      ...intlOptions,
      timeZone: "UTC",
    });
    const intlTimezoneFormat = Intl.DateTimeFormat("en", {
      ...intlOptions,
      timeZone: timezone,
    });

    const utcRepresentation = createUtcInstant({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond,
    });
    const targetParts = intlParts(intlUtcFormat)(utcRepresentation);

    for (
      const [, offset] of offsetCandidatesMap(timezone)({
        prioritizeLaterCandidate: Number(hour) < HOURS_IN_DAY,
      })(utcRepresentation)
    ) {
      const candidateInstant = subtractTime(offset)(utcRepresentation);
      const candidateParts = intlParts(intlTimezoneFormat)(candidateInstant);
      if (
        candidateParts.minute === targetParts.minute &&
        candidateParts.hour === targetParts.hour &&
        candidateParts.day === targetParts.day &&
        candidateParts.month === targetParts.month &&
        candidateParts.year === targetParts.year
      ) {
        Object.freeze(candidateInstant);
        return candidateInstant;
      }
    }

    return createInstant(timezone)({
      year,
      month,
      day,
      hour: Number(hour) + 1,
      minute,
      millisecond,
    });
  };
}

const offsetCandidatesMap =
  (timezone: string) =>
  ({ prioritizeLaterCandidate = true }) =>
  (instant: Date) => {
    const intlLongOffsetFormat = Intl.DateTimeFormat("en", {
      timeZone: timezone,
      timeZoneName: "longOffset",
    });
    const future = addTime({ hour: HOURS_IN_DAY })(instant);
    const past = addTime({ hour: -HOURS_IN_DAY })(instant);
    return new Map(
      (prioritizeLaterCandidate ? [future, past] : [past, future])
        .map((instant) =>
          timezoneOffsetParts(
            intlParts(intlLongOffsetFormat)(instant).timeZoneName || "",
          )
        ).filter(isTruthy).map((
          offset,
        ) => [JSON.stringify(offset), offset]),
    );
  };
