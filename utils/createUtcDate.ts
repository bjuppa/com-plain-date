export type SloppyPlainDate = {
  year: number | string;
  month?: number | string;
  day?: number | string;
};

export const createUtcDate = (
  { year = NaN, month = 1, day = 1 }: SloppyPlainDate,
): Date => {
  const utcDate = new Date(0);
  utcDate.setUTCFullYear(Number(year), Number(month) - 1, Number(day));

  Object.freeze(utcDate);
  return utcDate;
};
