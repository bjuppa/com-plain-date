import { PlainDateContract } from "../PlainDate.ts";
import { addMonths } from "./addMonths.ts";

export const addQuarters: (
  quarters: number,
) => <T extends PlainDateContract>(plainDate: T) => T =
  (quarters = 0) => (plainDate) => addMonths(3 * quarters)(plainDate);
