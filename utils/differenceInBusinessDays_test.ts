import { BUSINESS_DAYS_IN_WEEK } from "../constants.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertStrictEquals } from "../testing/asserts.ts";
import { differenceInBusinessDays } from "./differenceInBusinessDays.ts";

Deno.test("returns the number of crossings into non-weekend days between plain dates", () => {
  const lastMondayInDecember2022 = PlainDate({
    year: 2022,
    month: 12,
    day: 26,
  });
  const firstTuesdayInFebruary2023 = PlainDate({
    year: 2023,
    month: 2,
    day: 7,
  });
  const expectedBusinessDays = 6 * BUSINESS_DAYS_IN_WEEK + 1;

  assertStrictEquals(
    differenceInBusinessDays(
      lastMondayInDecember2022,
    )(
      firstTuesdayInFebruary2023,
    ),
    expectedBusinessDays,
  );
  assertStrictEquals(
    differenceInBusinessDays(
      firstTuesdayInFebruary2023,
    )(
      lastMondayInDecember2022,
    ),
    -expectedBusinessDays,
  );
});

Deno.test("returns 4 when comparing a Monday with the Friday in the same week", () => {
  const aMonday = PlainDate({ year: 2023, month: 3, day: 6 });
  const aFriday = PlainDate({ year: 2023, month: 3, day: 10 });

  assertStrictEquals(differenceInBusinessDays(aMonday)(aFriday), 4);
  assertStrictEquals(differenceInBusinessDays(aFriday)(aMonday), -4);
});

Deno.test("returns 5 when comparing a Sunday with the Saturday in the next week", () => {
  const aSunday = PlainDate({ year: 2023, month: 3, day: 5 });
  const aSaturday = PlainDate({ year: 2023, month: 3, day: 11 });

  assertStrictEquals(differenceInBusinessDays(aSunday)(aSaturday), 5);
  assertStrictEquals(differenceInBusinessDays(aSaturday)(aSunday), -5);
});

Deno.test("returns 1 when comparing a Thursday with the Friday in the same week", () => {
  const aThursday = PlainDate({ year: 2023, month: 3, day: 2 });
  const aFriday = PlainDate({ year: 2023, month: 3, day: 3 });

  assertStrictEquals(differenceInBusinessDays(aThursday)(aFriday), 1);
  assertStrictEquals(differenceInBusinessDays(aFriday)(aThursday), -1);
});

Deno.test("returns 1 when comparing a Thursday with the Saturday in the same week", () => {
  const aThursday = PlainDate({ year: 2023, month: 3, day: 2 });
  const aSaturday = PlainDate({ year: 2023, month: 3, day: 4 });

  assertStrictEquals(differenceInBusinessDays(aThursday)(aSaturday), 1);
  assertStrictEquals(differenceInBusinessDays(aSaturday)(aThursday), -1);
});

Deno.test("returns 0 when comparing a Friday with the Saturday in the same week", () => {
  const aFriday = PlainDate({ year: 2023, month: 3, day: 3 });
  const aSaturday = PlainDate({ year: 2023, month: 3, day: 4 });

  assertStrictEquals(differenceInBusinessDays(aFriday)(aSaturday), 0);
  assertStrictEquals(differenceInBusinessDays(aSaturday)(aFriday), -0);
});

Deno.test("returns 0 when comparing a Friday with the Sunday in the same week", () => {
  const aFriday = PlainDate({ year: 2023, month: 3, day: 3 });
  const aSunday = PlainDate({ year: 2023, month: 3, day: 5 });

  assertStrictEquals(differenceInBusinessDays(aFriday)(aSunday), 0);
  assertStrictEquals(differenceInBusinessDays(aSunday)(aFriday), -0);
});

Deno.test("returns 1 when comparing a Friday with the Monday in the next week", () => {
  const aFriday = PlainDate({ year: 2023, month: 3, day: 3 });
  const aMonday = PlainDate({ year: 2023, month: 3, day: 6 });

  assertStrictEquals(differenceInBusinessDays(aFriday)(aMonday), 1);
  assertStrictEquals(differenceInBusinessDays(aMonday)(aFriday), -1);
});

Deno.test("returns 0 when comparing a Saturday with the Sunday in the same week", () => {
  const aSaturday = PlainDate({ year: 2023, month: 3, day: 4 });
  const aSunday = PlainDate({ year: 2023, month: 3, day: 5 });

  assertStrictEquals(differenceInBusinessDays(aSaturday)(aSunday), 0);
  assertStrictEquals(differenceInBusinessDays(aSunday)(aSaturday), -0);
});

Deno.test("returns 1 when comparing a Saturday with the Monday in the next week", () => {
  const aSaturday = PlainDate({ year: 2023, month: 3, day: 4 });
  const aMonday = PlainDate({ year: 2023, month: 3, day: 6 });

  assertStrictEquals(differenceInBusinessDays(aSaturday)(aMonday), 1);
  assertStrictEquals(differenceInBusinessDays(aMonday)(aSaturday), -1);
});

Deno.test("returns 1 when comparing a Sunday with the Monday in the next week", () => {
  const aSunday = PlainDate({ year: 2023, month: 3, day: 5 });
  const aMonday = PlainDate({ year: 2023, month: 3, day: 6 });

  assertStrictEquals(differenceInBusinessDays(aSunday)(aMonday), 1);
  assertStrictEquals(differenceInBusinessDays(aMonday)(aSunday), -1);
});

Deno.test("returns 0 when comparing the same business day", () => {
  const aWednesday = PlainDate({ year: 2023, month: 3, day: 1 });

  assertStrictEquals(differenceInBusinessDays(aWednesday)(aWednesday), 0);
});

Deno.test("returns 0 when comparing the same non-business day", () => {
  const aSaturday = PlainDate({ year: 2023, month: 3, day: 4 });

  assertStrictEquals(differenceInBusinessDays(aSaturday)(aSaturday), 0);
});

Deno.test("returns the number of business days between plain dates that are really far apart", () => {
  const aThursday = PlainDate({ year: 1970 });
  const aSaturday = PlainDate({ year: 100000 }); // 35804722 days later
  const expectedBusinessDays =
    Math.trunc(35804722 / 7) * BUSINESS_DAYS_IN_WEEK + 1;

  assertStrictEquals(
    differenceInBusinessDays(aThursday)(aSaturday),
    expectedBusinessDays,
  );
});
