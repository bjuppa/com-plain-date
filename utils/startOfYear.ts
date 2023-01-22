import { PlainDateContract } from "../PlainDate.ts";

export const startOfYear: (plainDate: PlainDateContract) => PlainDateContract =
  (plainDate: PlainDateContract) =>
    plainDate.map((x) => ({
      year: x.year,
      month: 1,
      day: 1,
    }));
