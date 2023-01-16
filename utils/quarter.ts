import { PlainDateContract } from "../PlainDate.ts";

export const quarter = (plainDate: PlainDateContract) =>
  Math.ceil(plainDate.month / 3);
