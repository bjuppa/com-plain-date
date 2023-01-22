import { PlainDateContract } from "../PlainDate.ts";
import { addMonths } from "./addMonths.ts";

export const addQuarters: (
  quarters: number,
) => (plainDate: PlainDateContract) => PlainDateContract =
  (quarters = 0) => (plainDate: PlainDateContract) =>
    addMonths(3 * quarters)(plainDate);
