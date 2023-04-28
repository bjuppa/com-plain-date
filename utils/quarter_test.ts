import { quarter } from "./quarter.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("Last of March is Q1", () => {
  assertEquals(quarter(PlainDate({ year: 2023, month: 3, day: 31 })), 1);
});

Deno.test("Last of June is Q2", () => {
  assertEquals(quarter(PlainDate({ year: 2023, month: 6, day: 30 })), 2);
});

Deno.test("Last of September is Q3", () => {
  assertEquals(quarter(PlainDate({ year: 2023, month: 9, day: 30 })), 3);
});

Deno.test("Last of December is Q4", () => {
  assertEquals(quarter(PlainDate({ year: 2023, month: 12, day: 31 })), 4);
});
