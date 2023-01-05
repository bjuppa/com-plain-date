import { PlainDateContract } from "../PlainDate.ts";

export const addDays: (
  days: number,
) => (plainDate: PlainDateContract) => PlainDateContract =
  (days = 0) => (plainDate: PlainDateContract) =>
    plainDate.map((x) => ({ ...x, day: x.day + days }));
