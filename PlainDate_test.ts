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

Deno.test("year property can't be set", () => {
  const plainDate = new PlainDate({ year: "2022", month: "12", day: "22" });
  assertThrows(() => {
    // @ts-ignore: Bypass readonly
    plainDate.year = 2023;
  });
});
