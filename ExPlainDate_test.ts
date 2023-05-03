import { ExPlainDate, ExtendedPlainDate } from "./ExPlainDate.ts";
import { PlainDate } from "./PlainDate.ts";
import {
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from "./dev_deps.ts";

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
