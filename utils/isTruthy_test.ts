import { isTruthy } from "./isTruthy.ts";
import { assert, assertFalse } from "../testing/asserts.ts";

Deno.test("returns true for a non-zero number", () => {
  assert(isTruthy(-1));
});

Deno.test("returns false for zero", () => {
  assertFalse(isTruthy(0));
});

Deno.test("returns true for a string with 1 character", () => {
  assert(isTruthy("a"));
});

Deno.test("returns false for empty string", () => {
  assertFalse(isTruthy(""));
});

Deno.test("returns true for an empty object", () => {
  assert(isTruthy({}));
});

Deno.test("returns false for null", () => {
  assertFalse(isTruthy(null));
});

Deno.test("returns false for undefined", () => {
  assertFalse(isTruthy(null));
});
