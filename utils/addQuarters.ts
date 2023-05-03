import { HOTimeUnitPlainDateMapFn } from "../support/function-signatures.ts";
import { addMonths } from "./addMonths.ts";

export const addQuarters: HOTimeUnitPlainDateMapFn =
  (quarters = 0) => (plainDate) => addMonths(3 * quarters)(plainDate);
