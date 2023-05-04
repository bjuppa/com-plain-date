export type SloppyDate = {
  year: number | string;
  month?: number | string;
  day?: number | string;
};

export type SloppyTime = {
  hour?: number | string;
  minute?: number | string;
  second?: number | string;
  millisecond?: number | string;
};

export type SloppyDateTime = SloppyDate & SloppyTime;
