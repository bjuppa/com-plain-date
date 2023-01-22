import { PlainDateContract } from "../PlainDate.ts";

export const startOfMonth: (plainDate: PlainDateContract) => PlainDateContract =
  (plainDate: PlainDateContract) =>
    plainDate.map((x) => ({
      ...x,
      day: 1,
    }));
