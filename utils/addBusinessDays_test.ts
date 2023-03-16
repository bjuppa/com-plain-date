import { addBusinessDays } from "./addBusinessDays.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";
import { differenceInBusinessDays } from "./differenceInBusinessDays.ts";

Deno.test("business days can be added with positive argument", () => {
  const aFriday = PlainDate({ year: 2023, month: 3, day: 3 });

  assertEquals(String(addBusinessDays(6)(aFriday)), "2023-03-13");
});

Deno.test("business days can be subtracted with negative argument", () => {
  const aMonday = PlainDate({ year: 2023, month: 3, day: 13 });

  assertEquals(String(addBusinessDays(-6)(aMonday)), "2023-03-03");
});

Deno.test("goes to Monday when adding 1 business day to a Friday", () => {
  const aFriday = PlainDate({ year: 2023, month: 3, day: 10 });

  assertEquals(String(addBusinessDays(1)(aFriday)), "2023-03-13");
});

Deno.test("goes to Monday when adding 1 business day to a Saturday", () => {
  const aSaturday = PlainDate({ year: 2023, month: 3, day: 11 });

  assertEquals(String(addBusinessDays(1)(aSaturday)), "2023-03-13");
});

Deno.test("goes to Monday when adding 1 business day to a Sunday", () => {
  const aSunday = PlainDate({ year: 2023, month: 3, day: 12 });

  assertEquals(String(addBusinessDays(1)(aSunday)), "2023-03-13");
});

Deno.test("goes to Friday when subtracting 1 business day from a Saturday", () => {
  const aSaturday = PlainDate({ year: 2023, month: 3, day: 11 });

  assertEquals(String(addBusinessDays(-1)(aSaturday)), "2023-03-10");
});

Deno.test("goes to Friday when subtracting 1 business day from a Sunday", () => {
  const aSunday = PlainDate({ year: 2023, month: 3, day: 12 });

  assertEquals(String(addBusinessDays(-1)(aSunday)), "2023-03-10");
});

Deno.test("goes to Friday when subtracting 1 business day from a Monday", () => {
  const aMonday = PlainDate({ year: 2023, month: 3, day: 13 });

  assertEquals(String(addBusinessDays(-1)(aMonday)), "2023-03-10");
});

Deno.test("has parity with difference-in-business-days", () => {
  const plainDate = PlainDate({ year: 2022, month: 3, day: 31 });

  assertEquals(
    differenceInBusinessDays(plainDate)(addBusinessDays(104)(plainDate)),
    104,
  );
  assertEquals(
    differenceInBusinessDays(plainDate)(addBusinessDays(-104)(plainDate)),
    -104,
  );
});
