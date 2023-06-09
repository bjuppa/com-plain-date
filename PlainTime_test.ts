import { PlainTime } from "./PlainTime.ts";
import { MS_IN_HOUR, MS_IN_MINUTE } from "./constants.ts";
import { assert, assertEquals, assertFalse, assertThrows } from "./dev_deps.ts";

Deno.test("factory accepts number time parts", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
    second: 4,
    millisecond: 5,
  });

  assertEquals(String(plainTime), "02:03:04.005");
});

Deno.test("factory accepts string time parts", () => {
  const plainTime = PlainTime({
    hour: "02",
    minute: "03",
    second: "04",
    millisecond: "005",
  });

  assertEquals(String(plainTime), "02:03:04.005");
});

Deno.test("factory throws error when tally is negative", () => {
  assertThrows(() => {
    PlainTime({ hour: 1, minute: -61 });
  });
});

Deno.test("factory throws error when tally is 24 hours", () => {
  assertThrows(() => {
    PlainTime({ hour: 23, minute: 60 });
  });
});

Deno.test("enumerable properties can not be set", async (t) => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
    second: 4,
    millisecond: 5,
  });

  for (const property in plainTime) {
    await t.step(`property '${property}'`, () => {
      assertThrows(() => {
        // @ts-ignore: Bypass readonly
        plainTime[property] = 1;
      });
    });
  }
});

Deno.test("value conversion returns number of milliseconds from 00:00", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
  });
  const ms = 2 * MS_IN_HOUR + 3 * MS_IN_MINUTE;

  assertEquals(plainTime.valueOf(), ms);
  assertEquals(Number(plainTime), ms);
});

Deno.test("ISO string has prefix T and full resolution", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
  });

  assertEquals(plainTime.iso, "T02:03:00.000");
});

Deno.test("string representation is short for 0 seconds", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
  });
  const time = "02:03";

  assertEquals(plainTime.toString(), time);
  assertEquals(plainTime.toJSON(), time);
  assertEquals(String(plainTime), time);
});

Deno.test("string representation is medium for 0 milliseconds", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
    second: 4,
  });
  const time = "02:03:04";

  assertEquals(plainTime.toString(), time);
  assertEquals(plainTime.toJSON(), time);
  assertEquals(String(plainTime), time);
});

Deno.test("string representation is long for fractional seconds", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
    millisecond: 1,
  });
  const time = "02:03:00.001";

  assertEquals(plainTime.toString(), time);
  assertEquals(plainTime.toJSON(), time);
  assertEquals(String(plainTime), time);
});

Deno.test("can be localized", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
  });

  assertEquals(
    plainTime.toLocaleString("en", { timeStyle: "medium" }),
    "2:03:00 AM",
  );
});

Deno.test("can be compared as primitives", () => {
  assert(PlainTime({ hour: 12, minute: 1 }) > PlainTime({ hour: 12 }));
  assert(PlainTime({ hour: 12 }) >= PlainTime({ hour: 12 }));
  assertFalse(PlainTime({ hour: 12 }) > PlainTime({ hour: 12 }));
});

Deno.test("can be compared for full equality", () => {
  assert(PlainTime({ hour: 12 }).is(PlainTime({ hour: 12 })));
  assert(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 })
      .is({ hour: 12, minute: 1, second: 2, millisecond: 3 }),
  );
  assert(
    PlainTime({ hour: 1, minute: 1, second: 2, millisecond: 3 })
      .is({ hour: "01", minute: "01", second: "02", millisecond: "03" }),
  );

  assertFalse(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 })
      .is({ hour: 12, minute: 1, second: 2, millisecond: 4 }),
  );
  assertFalse(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 })
      .is({ hour: 12, minute: 1, second: 3, millisecond: 3 }),
  );
  assertFalse(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 })
      .is({ hour: 12, minute: 2, second: 2, millisecond: 3 }),
  );
  assertFalse(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 })
      .is({ hour: 11, minute: 1, second: 2, millisecond: 3 }),
  );
});

Deno.test("can be compared for partial equality", () => {
  assert(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 }).is({
      hour: 12,
    }),
  );
  assert(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 }).is({
      minute: 1,
    }),
  );
  assert(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 }).is({
      second: 2,
    }),
  );
  assert(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 }).is({
      millisecond: 3,
    }),
  );

  assert(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 }).is({
      hour: 12,
      minute: 1,
      second: 2,
    }),
  );
  assert(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 }).is({
      hour: 12,
      minute: 1,
    }),
  );
  assert(
    PlainTime({ hour: 12, minute: 1, second: 2, millisecond: 3 }).is({
      hour: 12,
      millisecond: 3,
    }),
  );

  assertFalse(PlainTime({ hour: 12 }).is({ hour: 13 }));
  assertFalse(PlainTime({ hour: 12 }).is({ minute: 1 }));
  assertFalse(PlainTime({ hour: 12 }).is({ second: 1 }));
  assertFalse(PlainTime({ hour: 12 }).is({ millisecond: 1 }));

  // Empty comparison object matches, although not allowed by type
  assert(
    PlainTime({ hour: 12 }).is(
      // @ts-ignore Force passing empty object
      {},
    ),
  );
});
