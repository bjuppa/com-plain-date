import { firstWeekDay } from "./firstWeekDay.ts";
import { assertEquals } from "../testing/asserts.ts";
import { PlainDate } from "../PlainDate.ts";
import { WeekDay, WeekDayNumber } from "../constants.ts";

Deno.test("returns same day from a monday", () => {
  assertEquals(
    String(
      firstWeekDay(WeekDay.MONDAY)(PlainDate(
        // a monday
        { year: 2023, month: 1, day: 9 },
      )),
    ),
    "2023-01-09",
  );
});

Deno.test("returns next monday from a tuesday", () => {
  assertEquals(
    String(
      firstWeekDay(WeekDay.MONDAY)(
        PlainDate(
          // a tuesday
          { year: 2023, month: 1, day: 10 },
        ),
      ),
    ),
    "2023-01-16",
  );
});

Deno.test("returns same day from a sunday", () => {
  assertEquals(
    String(
      firstWeekDay(WeekDay.SUNDAY)(
        PlainDate(
          // a sunday
          { year: 2023, month: 1, day: 15 },
        ),
      ),
    ),
    "2023-01-15",
  );
});

Deno.test("returns next sunday from a monday", () => {
  assertEquals(
    String(
      firstWeekDay(WeekDay.SUNDAY)(
        PlainDate(
          // a monday
          { year: 2023, month: 1, day: 16 },
        ),
      ),
    ),
    "2023-01-22",
  );
});

Deno.test("returns sunday when given 0, even if outside range 1-7", () => {
  assertEquals(
    String(
      firstWeekDay(0 as WeekDayNumber)(
        PlainDate(
          // a monday
          { year: 2023, month: 1, day: 16 },
        ),
      ),
    ),
    "2023-01-22",
  );
});

Deno.test("returns monday when given 8, even if outside range 1-7", () => {
  assertEquals(
    String(
      firstWeekDay(8 as WeekDayNumber)(
        PlainDate(
          // a tuesday
          { year: 2023, month: 1, day: 10 },
        ),
      ),
    ),
    "2023-01-16",
  );
});

Deno.test("returns saturday when given -1, even if outside range 1-7", () => {
  assertEquals(
    String(
      firstWeekDay(-1 as WeekDayNumber)(
        PlainDate(
          // a sunday
          { year: 2023, month: 1, day: 8 },
        ),
      ),
    ),
    "2023-01-14",
  );
});
