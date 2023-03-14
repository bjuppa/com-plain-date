export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = 60 * MS_IN_SECOND;
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;

export const HOURS_IN_DAY = 24;

export const DAYS_IN_WEEK = 7;
export const DAYS_IN_COMMON_YEAR = 365;
export const DAYS_IN_LEAP_YEAR = DAYS_IN_COMMON_YEAR + 1;

export const WeekDay = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
} as const;

/**
 * ISO weekday number (1-7) starting with Monday
 */
export type WeekDayNumber = typeof WeekDay[
  keyof typeof WeekDay
];
