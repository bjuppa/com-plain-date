import { PlainDateContract } from "../PlainDate.ts";

export const startOfYear: <T extends PlainDateContract>(plainDate: T) => T = (
  plainDate,
) =>
  plainDate.map((x) => ({
    year: x.year,
    month: 1,
    day: 1,
  }));
