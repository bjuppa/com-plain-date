import { PlainDateContract } from "../PlainDate.ts";

export const startOfMonth: <T extends PlainDateContract>(plainDate: T) => T = (
  plainDate,
) =>
  plainDate.map((x) => ({
    ...x,
    day: 1,
  }));
