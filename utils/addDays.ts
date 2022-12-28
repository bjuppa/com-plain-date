import { PlainDateContract } from "../PlainDate.ts";

export const addDays = (days: number) => (plainDate: PlainDateContract) =>
  plainDate.map((x) => ({ ...x, day: x.day + days }));
