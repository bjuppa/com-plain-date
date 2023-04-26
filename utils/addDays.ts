import { PlainDateContract } from "../PlainDate.ts";

export const addDays: (
  days: number,
) => <T extends PlainDateContract>(plainDate: T) => T =
  (days = 0) => (plainDate) =>
    plainDate.map((x) => ({ ...x, day: x.day + days }));
