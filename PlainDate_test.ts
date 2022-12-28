import { PlainDate, PlainDateContract } from "./PlainDate.ts";
import {
  assertObjectMatch,
  assertThrows,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";

Deno.test("factory accepts number date parts", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 2 });
  assertObjectMatch({ ...plainDate }, { year: 2022, month: 2, day: 2 });
});

Deno.test("factory accepts string date parts", () => {
  const plainDate = PlainDate({ year: "2022", month: "02", day: "02" });
  assertObjectMatch({ ...plainDate }, { year: 2022, month: 2, day: 2 });
});

Deno.test("factory throws when date is invalid", () => {
  assertThrows(() => {
    PlainDate({ year: NaN });
  });
});

Deno.test("enumerable properties can not be set", async (t) => {
  const plainDate = PlainDate({ year: "2022", month: "12", day: "22" });
  for (const property in plainDate) {
    await t.step(`property '${property}'`, () => {
      assertThrows(() => {
        // @ts-ignore: Bypass readonly
        plainDate[property] = 1;
      });
    });
  }
});

Deno.test("functor obeys identity law", () => {
  const plainDate = PlainDate({ year: "2022", month: "12", day: "22" });
  const identityFunction = <T>(x: T): T => x;

  assertObjectMatch({ ...plainDate }, { ...plainDate.map(identityFunction) });
});

Deno.test("functor obeys composition law", () => {
  const plainDate = PlainDate({ year: "2022", month: "12", day: "22" });
  const addOneYear = (plainDate: PlainDateContract) => ({
    ...plainDate,
    year: plainDate.year + 1,
  });
  const doubleYear = (plainDate: PlainDateContract) => ({
    ...plainDate,
    year: plainDate.year * 2,
  });

  assertObjectMatch({ ...plainDate.map(addOneYear).map(doubleYear) }, {
    ...plainDate.map((x) => doubleYear(addOneYear(x))),
  });
});
