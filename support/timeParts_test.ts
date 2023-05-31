import { timeParts } from "./timeParts.ts";
import { assert, assertObjectMatch } from "../dev_deps.ts";

Deno.test("hour, minute, second & millisecond parts are extracted from string", () => {
  const colonParts = timeParts("01:02:03.004");
  const prefixParts = timeParts("T010203.004");

  const expected = { hour: 1, minute: 2, second: 3, millisecond: 4 };

  assert(colonParts);
  assertObjectMatch(colonParts, expected);
  assert(prefixParts);
  assertObjectMatch(prefixParts, expected);
});

Deno.test("second & millisecond parts are undefined when only hour and minute are given", () => {
  const colonParts = timeParts("01:02");
  const prefixParts = timeParts("T0102");

  const expected = {
    hour: 1,
    minute: 2,
    second: undefined,
    millisecond: undefined,
  };

  assert(colonParts);
  assertObjectMatch(colonParts, expected);
  assert(prefixParts);
  assertObjectMatch(prefixParts, expected);
});

Deno.test("millisecond part is undefined when not given", () => {
  const colonParts = timeParts("01:02:03");
  const prefixParts = timeParts("T010203");

  const expected = {
    hour: 1,
    minute: 2,
    second: 3,
    millisecond: undefined,
  };

  assert(colonParts);
  assertObjectMatch(colonParts, expected);
  assert(prefixParts);
  assertObjectMatch(prefixParts, expected);
});

Deno.test("extracts hour when prefixed single number is given", () => {
  const parts = timeParts("T09");
  assert(parts);
  assertObjectMatch(parts, { hour: 9, minute: 0 });
});

Deno.test("returns null when unprefixed single number is given", () => {
  const parts = timeParts("09");
  assert(parts === null);
});

Deno.test("extracts time surrounded by alphabetical characters", () => {
  const colonParts = timeParts("T01:02:03T");
  const prefixParts = timeParts("TT010203T");

  const expected = {
    hour: 1,
    minute: 2,
    second: 3,
    millisecond: undefined,
  };

  assert(colonParts);
  assertObjectMatch(colonParts, expected);
  assert(prefixParts);
  assertObjectMatch(prefixParts, expected);
});

Deno.test("extracts time from string with other surrounding data", () => {
  const colonParts = timeParts("2022-02-03 01:02:03.00456");
  const prefixParts = timeParts("99T010203.00456");

  const expected = {
    hour: 1,
    minute: 2,
    second: 3,
    millisecond: 4,
  };

  assert(colonParts);
  assertObjectMatch(colonParts, expected);
  assert(prefixParts);
  assertObjectMatch(prefixParts, expected);
});

Deno.test("extracts time from full ISO timetime", () => {
  const parts = timeParts("2022-12-29T14:20:32.600Z");
  assert(parts);
  assertObjectMatch(parts, {
    hour: 14,
    minute: 20,
    second: 32,
    millisecond: 600,
  });
});

Deno.test("extracts more than 2-digits per part from colon-separated string", () => {
  const parts = timeParts("999:888:777.6666");
  assert(parts);
  assertObjectMatch(parts, {
    hour: 999,
    minute: 888,
    second: 777,
    millisecond: 666,
  });
});
