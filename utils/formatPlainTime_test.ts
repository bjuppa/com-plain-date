import { formatPlainTime } from "./formatPlainTime.ts";
import { PlainTime } from "../PlainTime.ts";
import { assert, assertEquals } from "../dev_deps.ts";

Deno.test("returns localized string for English locale", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
    second: 4,
    millisecond: 5,
  });
  assertEquals(formatPlainTime("en")()(plainTime), "2:03:04 AM");
});

Deno.test("returns localized string for Swedish locale", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
    second: 4,
    millisecond: 5,
  });
  assertEquals(formatPlainTime("sv")()(plainTime), "02:03:04");
});

Deno.test("returns localized string in default locale", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
    second: 4,
    millisecond: 5,
  });
  assert(formatPlainTime()()(plainTime));
});

Deno.test("takes Intl options", () => {
  const plainTime = PlainTime({
    hour: 2,
    minute: 3,
    second: 4,
    millisecond: 5,
  });
  assertEquals(
    formatPlainTime("en")({ hour: "numeric", hourCycle: "h23" })(plainTime),
    "02",
  );
});
