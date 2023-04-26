import { PlainDateContract } from "../PlainDate.ts";

export const addYears: (
  years: number,
) => <T extends PlainDateContract>(plainDate: T) => T =
  (years = 0) => (plainDate) =>
    plainDate.map((x) => ({ ...x, year: x.year + years }));
