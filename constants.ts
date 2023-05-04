export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = 60 * MS_IN_SECOND;
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;

export const HOURS_IN_DAY = 24;

export const DAYS_IN_WEEK = 7;
export const BUSINESS_DAYS_IN_WEEK = DAYS_IN_WEEK - 2;
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

/** ISO weekday number (1-7) starting with Monday */
export type WeekDayNumber = typeof WeekDay[keyof typeof WeekDay];

export const Month = {
  JANUARY: 1,
  FEBRUARY: 2,
  MARCH: 3,
  APRIL: 4,
  MAY: 5,
  JUNE: 6,
  JULY: 7,
  AUGUST: 8,
  SEPTEMBER: 9,
  OCTOBER: 10,
  NOVEMBER: 11,
  DECEMBER: 12,
} as const;

/** Month (1-12) */
export type MonthNumber = typeof Month[keyof typeof Month];

export const Quarter = {
  Q1: 1,
  Q2: 2,
  Q3: 3,
  Q4: 4,
} as const;

/** Quarter of year (1-4) */
export type QuarterNumber = typeof Quarter[keyof typeof Quarter];
