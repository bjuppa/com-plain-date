import { SloppyPlainDateTime } from "../support/sloppy-types.ts";
import { createUtcInstant } from "./createUtcInstant.ts";
import { addTime } from "./addTime.ts";
import { subtractTime } from "./subtractTime.ts";
import { intlParts } from "./intlParts.ts";
import { timezoneOffsetParts } from "./timezoneOffsetParts.ts";

const intlOptions: Intl.DateTimeFormatOptions = {
  hourCycle: "h23",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export const createInstant = (timezone: string) =>
(
  {
    year = NaN,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  }: SloppyPlainDateTime,
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
      prioritizeLaterCandidate: Number(hour) < 24,
    })(utcRepresentation)
  ) {
    if (!offset) {
      continue;
    }
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

const offsetCandidatesMap =
  (timezone: string) =>
  ({ prioritizeLaterCandidate = true }) =>
  (instant: Date) => {
    const intlLongOffsetFormat = Intl.DateTimeFormat("en", {
      timeZone: timezone,
      timeZoneName: "longOffset",
    });
    const future = addTime({ hour: 24 })(instant);
    const past = addTime({ hour: -24 })(instant);
    return new Map(
      (prioritizeLaterCandidate ? [future, past] : [past, future])
        .map((instant) =>
          timezoneOffsetParts(
            intlParts(intlLongOffsetFormat)(instant).timeZoneName || "",
          )
        ).map((
          offset,
        ) => [JSON.stringify(offset), offset]),
    );
  };
