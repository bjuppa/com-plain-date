import { SloppyPlainDateTime } from "../support/sloppy-types.ts";
import { createUtcInstant } from "./createUtcInstant.ts";
import { addTime } from "./addTime.ts";
import { timezoneOffsetParts } from "./timezoneOffsetParts.ts";
import { intlParts } from "./intlParts.ts";

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
    const [, offset] of offsetCandidatesMap(timezone)(
      utcRepresentation,
    )
  ) {
    if (!offset) {
      continue;
    }
    const candidateInstant = addTime({
      hour: -offset.hour,
      minute: -offset.minute,
    })(utcRepresentation);
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

const offsetCandidatesMap = (timezone: string) => (instant: Date) => {
  const intlLongOffsetFormat = Intl.DateTimeFormat("en", {
    timeZone: timezone,
    timeZoneName: "longOffset",
  });
  return new Map(
    [
      addTime({ hour: 24 })(instant),
      addTime({ hour: -24 })(instant),
    ].map((instant) =>
      timezoneOffsetParts(
        intlParts(intlLongOffsetFormat)(instant).timeZoneName || "",
      )
    ).map((
      offset,
    ) => [JSON.stringify(offset), offset]),
  );
};
