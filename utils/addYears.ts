import { PlainDateContract } from "../PlainDate.ts";

export const addYears: (
  years: number,
) => (plainDate: PlainDateContract) => PlainDateContract =
  (years = 0) => (plainDate: PlainDateContract) =>
    plainDate.map((x) => ({ ...x, year: x.year + years }));
