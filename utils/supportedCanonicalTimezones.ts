/**
 * Get all canonical timezones that are supported by the browser or runtime,
 * or an empty array if the list is not available.
 *
 * This is useful for populating an HTML
 * `<datalist id="availableTimezones">`
 * with all relevant timezones, enabling an ordinary
 * `<input type="text" list="availableTimezones">`
 * to become an autocomplete "combobox" for the user to select from.
 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist documentation on MDN }
 * for details and examples.
 *
 * Most browsers and runtime systems expose this list of 400+ timezones since
 * March or April 2022.
 * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf#browser_compatibility | compatibility data on MDN }
 * for details.
 *
 * @category Timezones
 */
export function supportedCanonicalTimezones(): string[] {
  return Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : [];
}
