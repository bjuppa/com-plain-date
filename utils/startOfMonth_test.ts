import { startOfMonth } from "./startOfMonth.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("returns first day of the month", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 15 });

  assertEquals(String(startOfMonth(plainDate)), "2022-02-01");
});
