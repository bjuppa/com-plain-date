import { supportedNamedTimezones } from "./supportedNamedTimezones.ts";
import { assertInstanceOf } from "../dev_deps.ts";

Deno.test("returns a list of timezones", () => {
  const timezones = supportedNamedTimezones();
  assertInstanceOf(timezones, Array);
});
