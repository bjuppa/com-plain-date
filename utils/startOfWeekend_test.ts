import { PlainDate } from "../PlainDate.ts";
import { startOfWeekend } from "./startOfWeekend.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("returns same day for a Saturday", () => {
  assertEquals(
    String(startOfWeekend(PlainDate({ year: 2023, month: 1, day: 28 }))),
    "2023-01-28",
  );
});

Deno.test("returns previous day for a Sunday", () => {
  assertEquals(
    String(startOfWeekend(PlainDate({ year: 2023, month: 1, day: 29 }))),
    "2023-01-28",
  );
});

Deno.test("returns Saturday for a Monday", () => {
  assertEquals(
    String(startOfWeekend(PlainDate({ year: 2023, month: 1, day: 23 }))),
    "2023-01-28",
  );
});
