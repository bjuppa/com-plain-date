import { dateParts } from "./dateParts.ts";
import { assert, assertObjectMatch } from "../testing/asserts.ts";

Deno.test("year, month, and day parts are extracted from string", () => {
  const parts = dateParts("2022-02-03");
  assert(parts);
  assertObjectMatch(parts, { year: 2022, month: 2, day: 3 });
});

Deno.test("day part is undefined when only year and month are given", () => {
  const parts = dateParts("2022-02");
  assert(parts);
  assertObjectMatch(parts, { year: 2022, month: 2, day: undefined });
});

Deno.test("returns null when only year is given", () => {
  const parts = dateParts("2022");
  assert(parts === null);
});

Deno.test("extracts date surrounded by alphabetical characters", () => {
  const parts = dateParts("T2022-02-03T");
  assert(parts);
  assertObjectMatch(parts, { year: 2022, month: 2, day: 3 });
});

Deno.test("extracts date from string with other numbers", () => {
  const parts = dateParts("666:2022-02-03 11:11:11");
  assert(parts);
  assertObjectMatch(parts, { year: 2022, month: 2, day: 3 });
});

Deno.test("extracts date from full ISO datetime", () => {
  const parts = dateParts("2022-12-29T14:20:32.600Z");
  assert(parts);
  assertObjectMatch(parts, { year: 2022, month: 12, day: 29 });
});

Deno.test("given year can have negative sign", () => {
  const parts = dateParts("-2022-02-03");
  assert(parts);
  assertObjectMatch(parts, { year: -2022, month: 2, day: 3 });
});

Deno.test("given year can have positive sign", () => {
  const parts = dateParts("+2022-02-03");
  assert(parts);
  assertObjectMatch(parts, { year: 2022, month: 2, day: 3 });
});
