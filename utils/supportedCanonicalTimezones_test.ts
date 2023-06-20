import { supportedCanonicalTimezones } from "./supportedCanonicalTimezones.ts";
import { assertInstanceOf } from "../dev_deps.ts";

Deno.test("returns a list of timezones", () => {
  const timezones = supportedCanonicalTimezones();
  assertInstanceOf(timezones, Array);
});
