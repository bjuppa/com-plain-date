/**
 * Intl.supportedValuesOf is not shipped until Typescript 5.1
 * Temporary workaround is from https://github.com/microsoft/TypeScript/issues/49231#issuecomment-1137251612
 *
 * TODO: When Typescript 5.1 is released with Deno (check with `deno --version`), remove this namespace extension.
 */
declare namespace Intl {
  type Key =
    | "calendar"
    | "collation"
    | "currency"
    | "numberingSystem"
    | "timeZone"
    | "unit";

  function supportedValuesOf(input: Key): string[];
}

/**
 * Get all canonical timezones that are supported by the browser or runtime, or an empty array if unavailable.
 */
export function supportedNamedTimezones(): string[] {
  return Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : [];
}
