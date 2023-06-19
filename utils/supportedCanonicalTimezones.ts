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
 * Get all canonical timezones that are supported by the browser or runtime,
 * or an empty array if the list is not available.
 *
 * This is useful to populate an HTML
 * `<datalist id="availableTimezones">`
 * with all relevant timezones, enabling an ordinary
 * `<input type="text" list="availableTimezones">`
 * to become an autocomplete "combobox" for the user to select from.
 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist documentation on MDN }
 * for details and examples.
 *
 * Most browsers and runtimes expose this list of 400+ timezones since
 * March or April 2022.
 * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf#browser_compatibility | compatibility data on MDN }
 * for details.
 */
export function supportedCanonicalTimezones(): string[] {
  return Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : [];
}
