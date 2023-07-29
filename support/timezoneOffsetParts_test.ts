import { timezoneOffsetParts } from "./timezoneOffsetParts.ts";
import { assertObjectMatch } from "../dev_deps.ts";

Deno.test("time string", () => {
  assertObjectMatch({ ...timezoneOffsetParts("5:30") }, {
    hours: 5,
    minutes: 30,
  });
});

Deno.test("hour only", () => {
  assertObjectMatch({ ...timezoneOffsetParts("5") }, {
    hours: 5,
    minutes: 0,
  });
});

Deno.test("positive offset", () => {
  assertObjectMatch({ ...timezoneOffsetParts("+0530") }, {
    hours: 5,
    minutes: 30,
  });
});

Deno.test("negative offset", () => {
  assertObjectMatch({ ...timezoneOffsetParts("-0330") }, {
    hours: -3,
    minutes: -30,
  });
});

Deno.test("Intl longOffset", () => {
  assertObjectMatch({ ...timezoneOffsetParts("GMT+01:00") }, {
    hours: 1,
    minutes: 0,
  });
});

Deno.test("Intl shortOffset without minute", () => {
  assertObjectMatch({ ...timezoneOffsetParts("GMT+1") }, {
    hours: 1,
    minutes: 0,
  });
});

Deno.test("Intl shortOffset with minute", () => {
  assertObjectMatch({ ...timezoneOffsetParts("GMT+5:30") }, {
    hours: 5,
    minutes: 30,
  });
});

Deno.test("ISO 8601", () => {
  assertObjectMatch({ ...timezoneOffsetParts("2007-04-05T12:30-02:00") }, {
    hours: -2,
    minutes: 0,
  });
});

Deno.test("ISO 8601 Zulu", () => {
  assertObjectMatch({ ...timezoneOffsetParts("2007-04-05T12:30Z") }, {
    hours: 0,
    minutes: 0,
  });
});

Deno.test("GMT", () => {
  assertObjectMatch({ ...timezoneOffsetParts("GMT") }, {
    hours: 0,
    minutes: 0,
  });
});

Deno.test("UTC", () => {
  assertObjectMatch({ ...timezoneOffsetParts("UTC") }, {
    hours: 0,
    minutes: 0,
  });
});

Deno.test("full text string format", () => {
  assertObjectMatch({
    ...timezoneOffsetParts(
      "Tue Jan 03 -2023 12:01:20 GMT+0100 (Central European Standard Time)",
    ),
  }, {
    hours: 1,
    minutes: 0,
  });
});
