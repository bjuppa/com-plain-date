import { PlainDate } from "./PlainDate.ts";
import {
  assertObjectMatch,
  assertThrows,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";

Deno.test("constructor accepts number date parts", () => {
  const plainDate = new PlainDate({ year: 2022, month: 12, day: 22 });
  assertObjectMatch(plainDate, { year: 2022, month: 12, day: 22 });
});

Deno.test("constructor accepts string date parts", () => {
  const plainDate = new PlainDate({ year: "2022", month: "12", day: "22" });
  assertObjectMatch(plainDate, { year: 2022, month: 12, day: 22 });
});

Deno.test("enumerable properties can not be set", async (t) => {
  const plainDate = new PlainDate({ year: "2022", month: "12", day: "22" });
  for (const property in plainDate) {
    await t.step(`property '${property}'`, () => {
      assertThrows(() => {
        // @ts-ignore: Bypass readonly
        plainDate[property] = 1;
      });
    });
  }
});
