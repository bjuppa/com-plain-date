import { PlainDateContract } from "../PlainDate.ts";

export const addYears = (years: number) => (plainDate: PlainDateContract) =>
  plainDate.map((x) => ({ ...x, year: x.year + years }));
