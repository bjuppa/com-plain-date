/** Milliseconds in a second */
export const MS_IN_SECOND = 1000;
/** Milliseconds in a minute */
export const MS_IN_MINUTE = 60 * MS_IN_SECOND;
/** Milliseconds in an hour */
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;

/** 24 */
export const HOURS_IN_DAY = 24;

/** 7 */
export const DAYS_IN_WEEK = 7;
/** 5 */
export const BUSINESS_DAYS_IN_WEEK = DAYS_IN_WEEK - 2;
/** 365 */
export const DAYS_IN_COMMON_YEAR = 365;
/** 366 */
export const DAYS_IN_LEAP_YEAR = DAYS_IN_COMMON_YEAR + 1;

/** ISO weekday number (1-7) starting with Monday */
export const WeekDay = {
  MONDAY: 1 as const,
  TUESDAY: 2 as const,
  WEDNESDAY: 3 as const,
  THURSDAY: 4 as const,
  FRIDAY: 5 as const,
  SATURDAY: 6 as const,
  SUNDAY: 7 as const,
} as const;

/** ISO weekday number (1-7) starting with Monday */
export type WeekDayNumber = typeof WeekDay[keyof typeof WeekDay];

/** Month (1-12) */
export const Month = {
  JANUARY: 1 as const,
  FEBRUARY: 2 as const,
  MARCH: 3 as const,
  APRIL: 4 as const,
  MAY: 5 as const,
  JUNE: 6 as const,
  JULY: 7 as const,
  AUGUST: 8 as const,
  SEPTEMBER: 9 as const,
  OCTOBER: 10 as const,
  NOVEMBER: 11 as const,
  DECEMBER: 12 as const,
} as const;

/** Month (1-12) */
export type MonthNumber = typeof Month[keyof typeof Month];

/** Quarter of year (1-4) */
export const Quarter = {
  Q1: 1 as const,
  Q2: 2 as const,
  Q3: 3 as const,
  Q4: 4 as const,
} as const;

/** Quarter of year (1-4) */
export type QuarterNumber = typeof Quarter[keyof typeof Quarter];
