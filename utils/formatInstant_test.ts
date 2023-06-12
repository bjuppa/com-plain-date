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

Deno.test("ignores timezone in options", () => {
  const instant = new Date("2023-06-10T13:20:30+0100");
  assertEquals(
    // @ts-ignore: Pass timeZone even if not allowed by type
    formatInstant("en")({ timeZone: "America/Chicago" })("Europe/London")(
      instant,
    ),
    "6/10/2023, 1:20:30 PM",
  );
});
