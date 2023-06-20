import { localTimezone } from "./localTimezone.ts";
import { assert } from "../dev_deps.ts";

Deno.test("returns either a named timezone or UTC", () => {
  const tz = localTimezone();
  assert(tz.match(/\w+\/\w+/) || tz === "UTC");
});
