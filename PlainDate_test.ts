import { PlainDate, PlainDateContract } from "./PlainDate.ts";
import {
  assertEquals,
  assertObjectMatch,
  assertThrows,
} from "./testing/asserts.ts";

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

Deno.test("all string representations are the same ISO standard string", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 2 });
  const iso = "2022-02-02";

  assertEquals(plainDate.iso, iso);
  assertEquals(plainDate.valueOf(), iso);
  assertEquals(plainDate.toString(), iso);
  assertEquals(plainDate.toJSON(), iso);
  assertEquals(String(plainDate), iso);
});

Deno.test("up to 6-digit years can be represented in ISO string", () => {
  const plainDate = PlainDate({ year: 100000, month: 1, day: 1 });

  assertEquals(plainDate.iso, "+100000-01-01");
});

Deno.test("negative years can be represented in ISO string", () => {
  const plainDate = PlainDate({ year: -1, month: 1, day: 1 });

  assertEquals(plainDate.iso, "-000001-01-01");
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
