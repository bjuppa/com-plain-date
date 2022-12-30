export type SloppyPlainDate = {
  year: number | string;
  month?: number | string;
  day?: number | string;
};

export type SloppyPlainTime = {
  hour?: number | string;
  minute?: number | string;
  second?: number | string;
  millisecond?: number | string;
};

export type SloppyDateTime = SloppyPlainDate & SloppyPlainTime;
