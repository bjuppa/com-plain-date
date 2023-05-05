/** Describes a date where parts can be numbers or strings. */
export type SloppyDate = {
  year: number | string;
  month?: number | string;
  day?: number | string;
};

/** Describes a time where parts can be numbers or strings. */
export type SloppyTime = {
  hour?: number | string;
  minute?: number | string;
  second?: number | string;
  millisecond?: number | string;
};

/** Describes a date-time where parts can be numbers or strings. */
export type SloppyDateTime = SloppyDate & SloppyTime;
