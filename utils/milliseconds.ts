import { SloppyPlainTime } from "../support/sloppy-types.ts";

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;

export const milliseconds = ({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: SloppyPlainTime) =>
  Number(hour) * MS_IN_HOUR + Number(minute) * MS_IN_MINUTE +
  Number(second) * MS_IN_SECOND + Number(millisecond);
