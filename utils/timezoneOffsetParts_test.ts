import { timezoneOffsetParts } from "./timezoneOffsetParts.ts";
import { assertObjectMatch } from "../testing/asserts.ts";

Deno.test("no given offset", () => {
  assertObjectMatch({ ...timezoneOffsetParts("0530") }, {
    hour: 5,
    minute: 30,
  });
});

Deno.test("positive offset", () => {
  assertObjectMatch({ ...timezoneOffsetParts("+0530") }, {
    hour: 5,
    minute: 30,
  });
});

Deno.test("negative offset", () => {
  assertObjectMatch({ ...timezoneOffsetParts("-0330") }, {
    hour: -3,
    minute: 30,
  });
});

// TODO: test Intl longOffset GMT-0800
// TODO: test Intl shortOffset GMT-8
// TODO: test whole Date.toString()
