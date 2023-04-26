import { ExPlainDate, ExtendedPlainDateContract } from "./ExPlainDate.ts";
import { PlainDate } from "./PlainDate.ts";
import {
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from "./testing/asserts.ts";

Deno.test("factory accepts PlainDate", () => {
  const exPlainDate = ExPlainDate(PlainDate({ year: 2022, month: 2, day: 2 }));

  assertEquals(String(exPlainDate), "2022-02-02");
});

Deno.test("factory accepts number date parts", () => {
  const exPlainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });

  assertEquals(String(exPlainDate), "2022-02-02");
});

Deno.test("factory accepts string date parts", () => {
  const exPlainDate = ExPlainDate({ year: "2022", month: "02", day: "02" });

  assertEquals(String(exPlainDate), "2022-02-02");
});

Deno.test("factory throws error when date is invalid", () => {
  assertThrows(() => {
    ExPlainDate({ year: NaN });
  });
});

Deno.test("enumerable properties can not be set", async (t) => {
  const exPlainDate = ExPlainDate({ year: "2022", month: "12", day: "22" });

  for (const property in exPlainDate) {
    await t.step(`property '${property}'`, () => {
      assertThrows(() => {
        // @ts-ignore: Bypass readonly
        exPlainDate[property] = 1;
      });
    });
  }
});

Deno.test("main string representations are the same ISO standard string", () => {
  const exPlainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });
  const iso = "2022-02-02";

  assertEquals(exPlainDate.iso, iso);
  assertEquals(exPlainDate.valueOf(), iso);
  assertEquals(exPlainDate.toString(), iso);
  assertEquals(exPlainDate.toJSON(), iso);
  assertEquals(String(exPlainDate), iso);
});

Deno.test("up to 6-digit years can be represented in ISO string", () => {
  const exPlainDate = ExPlainDate({ year: 100000, month: 1, day: 1 });

  assertEquals(exPlainDate.iso, "+100000-01-01");
});

Deno.test("negative years can be represented in ISO string", () => {
  const exPlainDate = ExPlainDate({ year: -1, month: 1, day: 1 });

  assertEquals(exPlainDate.iso, "-000001-01-01");
});

Deno.test("can be localized", () => {
  const exPlainDate = ExPlainDate({ year: 2020, month: 6, day: 13 });

  assertEquals(
    exPlainDate.toLocaleString("sv", { dateStyle: "full" }),
    "lördag 13 juni 2020",
  );
});

Deno.test("day name can be localized", () => {
  const exPlainDate = ExPlainDate({ year: 2020, month: 6, day: 13 });

  assertEquals(exPlainDate.dayName("sv"), "lördag");
});

Deno.test("short day name can be localized", () => {
  const exPlainDate = ExPlainDate({ year: 2020, month: 6, day: 13 });

  assertEquals(exPlainDate.dayNameShort("sv"), "lör");
});

Deno.test("narrow day name can be localized", () => {
  const exPlainDate = ExPlainDate({ year: 2020, month: 6, day: 13 });

  assertEquals(exPlainDate.dayNameNarrow("sv"), "L");
});

Deno.test("month name can be localized", () => {
  const exPlainDate = ExPlainDate({ year: 2020, month: 2, day: 13 });

  assertEquals(exPlainDate.monthName("sv"), "februari");
});

Deno.test("short month name can be localized", () => {
  const exPlainDate = ExPlainDate({ year: 2020, month: 2, day: 13 });

  assertEquals(exPlainDate.monthNameShort("sv"), "feb.");
});

Deno.test("narrow month name can be localized", () => {
  const exPlainDate = ExPlainDate({ year: 2020, month: 2, day: 13 });

  assertEquals(exPlainDate.monthNameNarrow("sv"), "F");
});

Deno.test("can be created from ISO string", () => {
  assertEquals(String(ExPlainDate.fromString("2022-02-02")), "2022-02-02");
});

Deno.test("throws error when string only contains year part", () => {
  assertThrows(() => ExPlainDate.fromString("2022"));
});

Deno.test("can be converted to instant in UTC", () => {
  const exPlainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  assertEquals(
    exPlainDate.toUtcInstant(time).toISOString(),
    "2022-02-02T23:59:59.999Z",
  );
});

Deno.test("can be converted to instant in local timezone", () => {
  const exPlainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  assertStringIncludes(
    exPlainDate.toLocalInstant(time).toString(),
    "Feb 02 2022 23:59:59",
  );
});

Deno.test("can be converted to instant in given timezone", () => {
  const exPlainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  // India Standard Time is UTC+5:30
  assertStringIncludes(
    exPlainDate.toInstant("IST", time).toISOString(),
    "2022-02-02T18:29:59.999Z",
  );
});

Deno.test("Months and days can be added in any order with same result", () => {
  // The next month only has 28 days
  const exPlainDate = ExPlainDate({ year: 2022, month: 1, day: 31 });

  assertEquals(
    String(exPlainDate.addDays(1).addMonths(1)),
    String(exPlainDate.addMonths(1).addDays(1)),
  );
});

Deno.test("functor obeys identity law", () => {
  const exPlainDate = ExPlainDate({ year: "2022", month: "12", day: "22" });
  const identityFunction = <T>(x: T): T => x;

  assertEquals(
    String(exPlainDate),
    String(exPlainDate.map(identityFunction)),
  );
});

Deno.test("functor obeys composition law", () => {
  const exPlainDate = ExPlainDate({ year: "2022", month: "12", day: "22" });
  const addOneYear = (exPlainDate: ExtendedPlainDateContract) => ({
    ...exPlainDate,
    year: exPlainDate.year + 1,
  });
  const doubleYear = (exPlainDate: ExtendedPlainDateContract) => ({
    ...exPlainDate,
    year: exPlainDate.year * 2,
  });

  assertEquals(
    String(exPlainDate.map(addOneYear).map(doubleYear)),
    String(exPlainDate.map((x) => doubleYear(addOneYear(x)))),
  );
});
