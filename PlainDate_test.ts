import { PlainDate, PlainDateContract } from "./PlainDate.ts";
import {
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from "./testing/asserts.ts";

Deno.test("factory accepts number date parts", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 2 });

  assertEquals(String(plainDate), "2022-02-02");
});

Deno.test("factory accepts string date parts", () => {
  const plainDate = PlainDate({ year: "2022", month: "02", day: "02" });

  assertEquals(String(plainDate), "2022-02-02");
});

Deno.test("factory throws error when date is invalid", () => {
  assertThrows(() => {
    PlainDate({ year: NaN });
  });
});

Deno.test("enumerable properties can not be set", async (t) => {
  const plainDate = PlainDate({ year: "2022", month: "12", day: "22" });

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
  const plainDate = PlainDate({ year: 2022, month: 2, day: 2 });
  const iso = "2022-02-02";

  assertEquals(plainDate.iso, iso);
  assertEquals(plainDate.valueOf(), iso);
  assertEquals(plainDate.toString(), iso);
  assertEquals(plainDate.toJSON(), iso);
  assertEquals(String(plainDate), iso);
});

Deno.test("up to 6-digit years can be represented in ISO string", () => {
  const plainDate = PlainDate({ year: 100000, month: 1, day: 1 });

  assertEquals(plainDate.iso, "+100000-01-01");
});

Deno.test("negative years can be represented in ISO string", () => {
  const plainDate = PlainDate({ year: -1, month: 1, day: 1 });

  assertEquals(plainDate.iso, "-000001-01-01");
});

Deno.test("can be localized", () => {
  const plainDate = PlainDate({ year: 2020, month: 6, day: 13 });

  assertEquals(
    plainDate.toLocaleString("sv", { dateStyle: "full" }),
    "lördag 13 juni 2020",
  );
});

Deno.test("can be created from ISO string", () => {
  assertEquals(String(PlainDate.fromString("2022-02-02")), "2022-02-02");
});

Deno.test("throws error when string only contains year part", () => {
  assertThrows(() => PlainDate.fromString("2022"));
});

Deno.test("can be converted to instant in UTC", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  assertEquals(
    plainDate.toUtcInstant(time).toISOString(),
    "2022-02-02T23:59:59.999Z",
  );
});

Deno.test("can be converted to instant in local timezone", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  assertStringIncludes(
    plainDate.toLocalInstant(time).toString(),
    "Feb 02 2022 23:59:59",
  );
});

Deno.test("can be converted to instant in given timezone", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 2 });
  const time = { hour: 23, minute: 59, second: 59, millisecond: 999 };

  // India Standard Time is UTC+5:30
  assertStringIncludes(
    plainDate.toInstant("IST", time).toISOString(),
    "2022-02-02T18:29:59.999Z",
  );
});

Deno.test("functor obeys identity law", () => {
  const plainDate = PlainDate({ year: "2022", month: "12", day: "22" });
  const identityFunction = <T>(x: T): T => x;

  assertEquals(
    String(plainDate),
    String(plainDate.map(identityFunction)),
  );
});

Deno.test("functor obeys composition law", () => {
  const plainDate = PlainDate({ year: "2022", month: "12", day: "22" });
  const addOneYear = (plainDate: PlainDateContract) => ({
    ...plainDate,
    year: plainDate.year + 1,
  });
  const doubleYear = (plainDate: PlainDateContract) => ({
    ...plainDate,
    year: plainDate.year * 2,
  });

  assertEquals(
    String(plainDate.map(addOneYear).map(doubleYear)),
    String(plainDate.map((x) => doubleYear(addOneYear(x)))),
  );
});
