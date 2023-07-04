import { formatInstant } from "./formatInstant.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("returns localized string for English locale and UK timezone", () => {
  const instant = new Date("2023-06-10T13:20:30+0100");
  assertEquals(
    formatInstant("en")()("Europe/London")(instant),
    "6/10/2023, 1:20:30 PM GMT+1",
  );
});

Deno.test("returns localized string for Swedish locale and timezone", () => {
  const instant = new Date("2023-06-10T13:20:30+0200");
  assertEquals(
    formatInstant("sv")()("Europe/Stockholm")(instant),
    "2023-06-10 13:20:30 CEST",
  );
});

Deno.test("takes Intl options", () => {
  const instant = new Date("2023-06-10T13:20:30+0100");
  assertEquals(
    formatInstant("en")({ timeZoneName: "longGeneric" })("Europe/London")(
      instant,
    ),
    "6/10/2023, 1:20:30 PM United Kingdom Time",
  );
});

Deno.test("adds timeZoneName to options if left out", () => {
  const instant = new Date("2023-06-10T13:20:30+0100");
  assertEquals(
    formatInstant("en")({ hourCycle: "h23" })("Europe/London")(
      instant,
    ),
    "6/10/2023, 13:20:30 GMT+1",
  );
});

Deno.test("doesn't add timeZoneName when explicitly set to undefined", () => {
  const instant = new Date("2023-06-10T13:20:30+0100");
  assertEquals(
    formatInstant("en")({ timeZoneName: undefined })("Europe/London")(
      instant,
    ),
    "6/10/2023, 1:20:30 PM",
  );
});

Deno.test("ignores timeZone in options", () => {
  const instant = new Date("2023-06-10T13:20:30+0100");
  assertEquals(
    // @ts-ignore: Pass timeZone even if not allowed by type
    formatInstant("en")({ timeZone: "America/Chicago" })("Europe/London")(
      instant,
    ),
    "6/10/2023, 1:20:30 PM GMT+1",
  );
});

Deno.test("accepts leaving all parameters empty for system defaults and short timezone name", () => {
  const instant = new Date("2023-06-10T13:20:30+0100");
  assertEquals(
    formatInstant()()()(instant),
    instant.toLocaleString(undefined, { timeZoneName: "short" }),
  );
});
