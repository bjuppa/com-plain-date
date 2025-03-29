import { pipePlainDate } from "./pipePlainDate.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../dev_deps.ts";
import type { PlainDateMapFn } from "../support/function-signatures.ts";

Deno.test("given pipeline of operations is applied to the plain-date", () => {
  const plainDate = PlainDate({ year: "2022", month: "12", day: "22" });
  const addOneYear: PlainDateMapFn = (plainDate) =>
    plainDate.constructor({
      ...plainDate,
      year: plainDate.year + 1,
    });
  const doubleYear: PlainDateMapFn = (plainDate) =>
    plainDate.constructor({
      ...plainDate,
      year: plainDate.year * 2,
    });

  assertEquals(
    String(pipePlainDate(addOneYear, doubleYear)(plainDate)),
    "4046-12-22",
  );
});
