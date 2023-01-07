import { PlainDateContract } from "../PlainDate.ts";

export const differenceInYears =
  (from: PlainDateContract) => (to: PlainDateContract) => {
    return to.year - from.year;
  };
