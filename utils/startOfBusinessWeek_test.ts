import { PlainDate } from "../PlainDate.ts";
import { startOfBusinessWeek } from "./startOfBusinessWeek.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("returns same day for a Monday", () => {
  assertEquals(
    String(startOfBusinessWeek(PlainDate({ year: 2023, month: 1, day: 30 }))),
    "2023-01-30",
  );
});

Deno.test("returns previous Monday for a Sunday", () => {
  assertEquals(
    String(startOfBusinessWeek(PlainDate({ year: 2023, month: 1, day: 29 }))),
    "2023-01-23",
  );
});
