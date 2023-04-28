import { formatPlainDate } from "./formatPlainDate.ts";
import { PlainDate } from "../PlainDate.ts";
import { assert, assertEquals } from "../dev_deps.ts";

Deno.test("returns localized string for English locale", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 3 });
  assertEquals(formatPlainDate("en")()(plainDate), "2/3/2022");
});

Deno.test("returns localized string for Swedish locale", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 3 });
  assertEquals(formatPlainDate("sv")()(plainDate), "2022-02-03");
});

Deno.test("returns localized string in default locale", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 3 });
  assert(formatPlainDate()()(plainDate));
});

Deno.test("ignores timezone in options", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 3 });
  // Chicago would still be in the previous day relative UTC
  assertEquals(
    // @ts-ignore: Pass timeZone even if not allowed by type
    formatPlainDate("en")({ timeZone: "America/Chicago" })(plainDate),
    "2/3/2022",
  );
});

Deno.test("takes Intl options", () => {
  const plainDate = PlainDate({ year: 2022, month: 2, day: 3 });
  assertEquals(
    formatPlainDate("en")({ dateStyle: "full" })(plainDate),
    "Thursday, February 3, 2022",
  );
});
