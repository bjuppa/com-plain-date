import { ExPlainDate, ExtendedPlainDateContract } from "./ExPlainDate.ts";
import {
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from "./testing/asserts.ts";

Deno.test("factory accepts number date parts", () => {
  const plainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });

  assertEquals(String(plainDate), "2022-02-02");
});

Deno.test("factory accepts string date parts", () => {
  const plainDate = ExPlainDate({ year: "2022", month: "02", day: "02" });

  assertEquals(String(plainDate), "2022-02-02");
});

Deno.test("factory throws error when date is invalid", () => {
  assertThrows(() => {
    ExPlainDate({ year: NaN });
  });
});

Deno.test("enumerable properties can not be set", async (t) => {
  const plainDate = ExPlainDate({ year: "2022", month: "12", day: "22" });

  for (const property in plainDate) {
    await t.step(`property '${property}'`, () => {
      assertThrows(() => {
        // @ts-ignore: Bypass readonly
        plainDate[property] = 1;
      });
    });
  }
});

Deno.test("main string representations are the same ISO standard string", () => {
  const plainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });
  const iso = "2022-02-02";

  assertEquals(plainDate.iso, iso);
  assertEquals(plainDate.valueOf(), iso);
  assertEquals(plainDate.toString(), iso);
  assertEquals(plainDate.toJSON(), iso);
  assertEquals(String(plainDate), iso);
});

Deno.test("up to 6-digit years can be represented in ISO string", () => {
  const plainDate = ExPlainDate({ year: 100000, month: 1, day: 1 });

  assertEquals(plainDate.iso, "+100000-01-01");
});

Deno.test("negative years can be represented in ISO string", () => {
  const plainDate = ExPlainDate({ year: -1, month: 1, day: 1 });

  assertEquals(plainDate.iso, "-000001-01-01");
});

Deno.test("can be localized", () => {
  const plainDate = ExPlainDate({ year: 2020, month: 6, day: 13 });

  assertEquals(
    plainDate.toLocaleString("sv", { dateStyle: "full" }),
    "lördag 13 juni 2020",
  );
});

Deno.test("day name can be localized", () => {
  const plainDate = ExPlainDate({ year: 2020, month: 6, day: 13 });

  assertEquals(plainDate.dayName("sv"), "lördag");
});

Deno.test("short day name can be localized", () => {
  const plainDate = ExPlainDate({ year: 2020, month: 6, day: 13 });

  assertEquals(plainDate.dayNameShort("sv"), "lör");
});

Deno.test("narrow day name can be localized", () => {
  const plainDate = ExPlainDate({ year: 2020, month: 6, day: 13 });

  assertEquals(plainDate.dayNameNarrow("sv"), "L");
});

Deno.test("month name can be localized", () => {
  const plainDate = ExPlainDate({ year: 2020, month: 2, day: 13 });

  assertEquals(plainDate.monthName("sv"), "februari");
});

Deno.test("short month name can be localized", () => {
  const plainDate = ExPlainDate({ year: 2020, month: 2, day: 13 });

  assertEquals(plainDate.monthNameShort("sv"), "feb.");
});

Deno.test("narrow month name can be localized", () => {
  const plainDate = ExPlainDate({ year: 2020, month: 2, day: 13 });

  assertEquals(plainDate.monthNameNarrow("sv"), "F");
});

Deno.test("can be created from ISO string", () => {
  assertEquals(String(ExPlainDate.fromString("2022-02-02")), "2022-02-02");
});

Deno.test("throws error when string only contains year part", () => {
  assertThrows(() => ExPlainDate.fromString("2022"));
});

Deno.test("can be converted to instant in UTC", () => {
  const plainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  assertEquals(
    plainDate.toUtcInstant(time).toISOString(),
    "2022-02-02T23:59:59.999Z",
  );
});

Deno.test("can be converted to instant in local timezone", () => {
  const plainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  assertStringIncludes(
    plainDate.toLocalInstant(time).toString(),
    "Feb 02 2022 23:59:59",
  );
});

Deno.test("can be converted to instant in given timezone", () => {
  const plainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  // India Standard Time is UTC+5:30
  assertStringIncludes(
    plainDate.toInstant("IST", time).toISOString(),
    "2022-02-02T18:29:59.999Z",
  );
});

Deno.test("Months and days can be added in any order with same result", () => {
  // The next month only has 28 days
  const plainDate = ExPlainDate({ year: 2022, month: 1, day: 31 });

  assertEquals(
    String(plainDate.addDays(1).addMonths(1)),
    String(plainDate.addMonths(1).addDays(1)),
  );
});

Deno.test("functor obeys identity law", () => {
  const plainDate = ExPlainDate({ year: "2022", month: "12", day: "22" });
  const identityFunction = <T>(x: T): T => x;

  assertEquals(
    String(plainDate),
    String(plainDate.map(identityFunction)),
  );
});

Deno.test("functor obeys composition law", () => {
  const plainDate = ExPlainDate({ year: "2022", month: "12", day: "22" });
  const addOneYear = (plainDate: ExtendedPlainDateContract) => ({
    ...plainDate,
    year: plainDate.year + 1,
  });
  const doubleYear = (plainDate: ExtendedPlainDateContract) => ({
    ...plainDate,
    year: plainDate.year * 2,
  });

  assertEquals(
    String(plainDate.map(addOneYear).map(doubleYear)),
    String(plainDate.map((x) => doubleYear(addOneYear(x)))),
  );
});
