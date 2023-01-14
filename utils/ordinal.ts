import { PlainDateContract } from "../PlainDate.ts";
import { differenceInDays } from "./differenceInDays.ts";
import { startOfYear } from "./startOfYear.ts";

export const ordinal = (plainDate: PlainDateContract) =>
  1 + differenceInDays(startOfYear(plainDate))(plainDate);
