import { PlainDateContract } from "../PlainDate.ts";

export const weekDay = (plainDate: PlainDateContract) =>
  (plainDate.toUtcInstant().getUTCDay() + 6) % 7 + 1;
