import { NativeDateMapFn } from "../support/function-signatures.ts";
import { SloppyPlainTime } from "../support/sloppy-types.ts";
import { milliseconds } from "./milliseconds.ts";

export const addTime = ({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: SloppyPlainTime): NativeDateMapFn =>
(instant) =>
  new Date(
    instant.valueOf() + milliseconds({ hour, minute, second, millisecond }),
  );
