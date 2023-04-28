import { createInstant } from "./createInstant.ts";
import { assert, assertEquals, assertInstanceOf } from "../dev_deps.ts";

Deno.test("returned date object is valid", () => {
  // Stockholm is 1 hour ahead of UTC when not in DST
  const instant = createInstant("Europe/Stockholm")({
    year: 2022,
    month: 1,
    day: 1,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  });

  assertInstanceOf(instant, Date);
  assert(!isNaN(instant.valueOf()));
  assertEquals(instant.toISOString(), "2022-01-01T22:59:59.999Z");
});

Deno.test("during DST", () => {
  // Stockholm is 2 hours ahead of UTC during DST
  const instant = createInstant("Europe/Stockholm")({
    year: 2022,
    month: 6,
    day: 1,
    hour: 12,
  });

  assertEquals(instant.toISOString(), "2022-06-01T10:00:00.000Z");
});

Deno.test("just before going into DST", () => {
  // Stockholm went into DST 2022-03-27 02:00 becoming UTC+2
  const instant = createInstant("Europe/Stockholm")({
    year: 2022,
    month: 3,
    day: 27,
    hour: 1,
    minute: 59,
    second: 59,
    millisecond: 999,
  });

  assertEquals(instant.toISOString(), "2022-03-27T00:59:59.999Z");
});

Deno.test("just after going into DST", () => {
  // Stockholm went into DST 2022-03-27 02:00, skipping to 03:00 and becoming UTC+2
  const instant = createInstant("Europe/Stockholm")({
    year: 2022,
    month: 3,
    day: 27,
    hour: 3,
  });

  assertEquals(instant.toISOString(), "2022-03-27T01:00:00.000Z");
});

Deno.test("moves ahead to after transition during during transition to DST", () => {
  // Stockholm went into DST 2022-03-27 02:00, skipping to 03:00 and becoming UTC+2
  // 2:30 doesn't exist during transition, so should skip forward to 3:30 in UTC+2
  const instant = createInstant("Europe/Stockholm")({
    year: 2022,
    month: 3,
    day: 27,
    hour: 2,
    minute: 30,
  });

  assertEquals(instant.toISOString(), "2022-03-27T01:30:00.000Z");
});

Deno.test("just before going out of DST", () => {
  // Stockholm went out of DST 2022-10-30 03:00 repeating 02:00 and going back to UTC+1
  const instant = createInstant("Europe/Stockholm")({
    year: 2022,
    month: 10,
    day: 30,
    hour: 1,
    minute: 59,
    second: 59,
    millisecond: 999,
  });

  assertEquals(instant.toISOString(), "2022-10-29T23:59:59.999Z");
});

Deno.test("just after going out of DST", () => {
  // Stockholm went out of DST 2022-10-30 03:00 repeating 02:00 and going back to UTC+1
  const instant = createInstant("Europe/Stockholm")({
    year: 2022,
    month: 10,
    day: 30,
    hour: 3,
    millisecond: 1,
  });

  assertEquals(instant.toISOString(), "2022-10-30T02:00:00.001Z");
});

Deno.test("during transition out of DST, it uses the last repeated time", () => {
  // Stockholm went out of DST 2022-10-30 03:00 repeating 02:00 and going back to UTC+1
  // Times between 2:00 and 3:00 exists twice during transition
  const instant = createInstant("Europe/Stockholm")({
    year: 2022,
    month: 10,
    day: 30,
    hour: 2,
    minute: 59,
    second: 59,
    millisecond: 999,
  });

  assertEquals(instant.toISOString(), "2022-10-30T01:59:59.999Z");
});

Deno.test("during transition out of DST when hours overflow into the next day, it uses the first repeated time", () => {
  // Stockholm went out of DST 2022-10-30 03:00 repeating 02:00 and going back to UTC+1
  // Times between 2:00 and 3:00 exists twice during transition
  const instant = createInstant("Europe/Stockholm")({
    year: 2022,
    month: 10,
    day: 29,
    hour: 26,
    minute: 59,
    second: 59,
    millisecond: 999,
  });

  assertEquals(instant.toISOString(), "2022-10-30T00:59:59.999Z");
});
