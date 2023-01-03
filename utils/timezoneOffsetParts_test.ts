import { timezoneOffsetParts } from "./timezoneOffsetParts.ts";
import { assertObjectMatch } from "../testing/asserts.ts";

Deno.test("time string", () => {
  assertObjectMatch({ ...timezoneOffsetParts("5:30") }, {
    hour: 5,
    minute: 30,
  });
});

Deno.test("hour only", () => {
  assertObjectMatch({ ...timezoneOffsetParts("5") }, {
    hour: 5,
    minute: 0,
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

Deno.test("Intl longOffset", () => {
  assertObjectMatch({ ...timezoneOffsetParts("GMT+01:00") }, {
    hour: 1,
    minute: 0,
  });
});

Deno.test("Intl shortOffset without minute", () => {
  assertObjectMatch({ ...timezoneOffsetParts("GMT+1") }, {
    hour: 1,
    minute: 0,
  });
});

Deno.test("Intl shortOffset with minute", () => {
  assertObjectMatch({ ...timezoneOffsetParts("GMT+5:30") }, {
    hour: 5,
    minute: 30,
  });
});

Deno.test("ISO 8601", () => {
  assertObjectMatch({ ...timezoneOffsetParts("2007-04-05T12:30-02:00") }, {
    hour: -2,
    minute: 0,
  });
});

Deno.test("ISO 8601 Zulu", () => {
  assertObjectMatch({ ...timezoneOffsetParts("2007-04-05T12:30Z") }, {
    hour: 0,
    minute: 0,
  });
});

Deno.test("GMT", () => {
  assertObjectMatch({ ...timezoneOffsetParts("GMT") }, {
    hour: 0,
    minute: 0,
  });
});

Deno.test("UTC", () => {
  assertObjectMatch({ ...timezoneOffsetParts("UTC") }, {
    hour: 0,
    minute: 0,
  });
});

Deno.test("full text string format", () => {
  assertObjectMatch({
    ...timezoneOffsetParts(
      "Tue Jan 03 -2023 12:01:20 GMT+0100 (Central European Standard Time)",
    ),
  }, {
    hour: 1,
    minute: 0,
  });
});
