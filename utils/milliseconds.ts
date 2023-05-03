import { MS_IN_HOUR, MS_IN_MINUTE, MS_IN_SECOND } from "../constants.ts";
import { SloppyPlainTimeNumberFn } from "../support/function-signatures.ts";

export const milliseconds: SloppyPlainTimeNumberFn = ({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}) =>
  Number(hour) * MS_IN_HOUR + Number(minute) * MS_IN_MINUTE +
  Number(second) * MS_IN_SECOND + Number(millisecond);
