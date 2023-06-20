import { formatTimezone } from "./formatTimezone.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("underscore are replaced by space", () => {
  assertEquals(formatTimezone("Africa/Dar_es_Salaam"), "Africa/Dar es Salaam");
});
