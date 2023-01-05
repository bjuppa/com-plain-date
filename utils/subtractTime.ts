import { SloppyPlainTime } from "../support/sloppy-types.ts";
import { milliseconds } from "./milliseconds.ts";

export const subtractTime = ({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: SloppyPlainTime) =>
(instant: Date) => {
  return new Date(
    instant.valueOf() -
      milliseconds({ hour, minute, second, millisecond }),
  );
};
