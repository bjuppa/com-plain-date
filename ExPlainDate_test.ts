import { ExPlainDate, type ExtendedPlainDate } from "./ExPlainDate.ts";
import { PlainDate } from "./PlainDate.ts";
import {
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from "./dev_deps.ts";
import type { PlainDateMapFn } from "./support/function-signatures.ts";

Deno.test("factory accepts PlainDate", () => {
  const exPlainDate = ExPlainDate(PlainDate({ year: 2022, month: 2, day: 2 }));

  assertEquals(String(exPlainDate), "2022-02-02");
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

Deno.test("can be converted to instant in UTC", () => {
  const exPlainDate = ExPlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  assertEquals(
    exPlainDate.toUtcInstant(time).toISOString(),
    "2022-02-02T23:59:59.999Z",
  );
});

Deno.test("can be created from ISO string", () => {
  assertEquals(String(ExPlainDate.fromString("2022-02-02")), "2022-02-02");
});

Deno.test("throws error when string only contains year part", () => {
  assertThrows(() => ExPlainDate.fromString("2022"));
});

Deno.test("can be created from instant in UTC", () => {
  assertEquals(
    String(ExPlainDate.fromUtcInstant(new Date("2022-02-02T00:00:00Z"))),
    "2022-02-02",
  );
});

Deno.test("can be created from current wall-time in UTC", () => {
  assertEquals(
    String(ExPlainDate.fromUtcInstant(new Date())),
    new Date().toLocaleDateString("sv", { timeZone: "UTC" }),
  );
});

Deno.test("can be created from instant in system's local timezone", () => {
  assertEquals(
    String(ExPlainDate.fromLocalInstant(new Date("2022-02-02T00:00:00"))),
    "2022-02-02",
  );
});

Deno.test("can be created from current wall-time in system's local timezone", () => {
  assertEquals(
    String(ExPlainDate.fromLocalInstant()),
    new Date().toLocaleDateString("sv"),
  );
});

Deno.test("can be created from instant in a specific timezone", () => {
  assertEquals(
    String(
      ExPlainDate.fromInstant("Asia/Tokyo", new Date("2022-02-02T00:00+0900")),
    ),
    "2022-02-02",
  );
});

Deno.test("can be created from current wall-time in a specific timezone", () => {
  const tz = "Asia/Tokyo";
  assertEquals(
    String(ExPlainDate.fromInstant(tz, new Date())),
    new Date().toLocaleDateString("sv", { timeZone: tz }),
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
  const addOneYear = (exPlainDate: ExtendedPlainDate) => ({
    ...exPlainDate,
    year: exPlainDate.year + 1,
  });
  const doubleYear = (exPlainDate: ExtendedPlainDate) => ({
    ...exPlainDate,
    year: exPlainDate.year * 2,
  });

  assertEquals(
    String(exPlainDate.map(addOneYear).map(doubleYear)),
    String(exPlainDate.map((x) => doubleYear(addOneYear(x)))),
  );
});

Deno.test("can be passed through pipeline of functions", () => {
  const exPlainDate = ExPlainDate({ year: "2022", month: "12", day: "22" });
  const addOneYear: PlainDateMapFn = (plainDate) =>
    plainDate.constructor({
      ...plainDate,
      year: plainDate.year + 1,
    });
  const doubleYear: PlainDateMapFn = (plainDate) =>
    plainDate.constructor({
      ...plainDate,
      year: plainDate.year * 2,
    });

  assertEquals(String(exPlainDate.pipe(addOneYear, doubleYear)), "4046-12-22");
});
