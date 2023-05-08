export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = 60 * MS_IN_SECOND;
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;

export const HOURS_IN_DAY = 24;

export const DAYS_IN_WEEK = 7;
export const BUSINESS_DAYS_IN_WEEK = DAYS_IN_WEEK - 2;
export const DAYS_IN_COMMON_YEAR = 365;
export const DAYS_IN_LEAP_YEAR = DAYS_IN_COMMON_YEAR + 1;

/** ISO weekday number (1-7) starting with Monday */
export enum WeekDay {
  MONDAY = 1,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

/** Month (1-12) */
export enum Month {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

/** Quarter of year (1-4) */
export enum Quarter {
  Q1 = 1,
  Q2,
  Q3,
  Q4,
}
