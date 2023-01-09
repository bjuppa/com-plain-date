import { differenceInMilliseconds } from "./differenceInMilliseconds.ts";
import { assertEquals } from "../testing/asserts.ts";

Deno.test("returns number of milliseconds between Date objects", () => {
  const a = new Date(0);
  const b = new Date(666);
  assertEquals(differenceInMilliseconds(a)(b), 666);
});

Deno.test("returns 0 when comparing the same instant", () => {
  const a = new Date(666);
  const b = new Date(666);
  assertEquals(differenceInMilliseconds(a)(b), 0);
});

Deno.test("returns negative difference when 1st Date is after 2nd Date", () => {
  const a = new Date(666);
  const b = new Date(0);
  assertEquals(differenceInMilliseconds(a)(b), -666);
});
