import { createInstant } from "./createInstant.ts";
import { assert, assertEquals, assertInstanceOf } from "../testing/asserts.ts";

Deno.test("returned date object is valid", () => {
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

//TODO: test DST transitions
