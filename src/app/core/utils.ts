import { DateTime } from 'luxon';

export const relativeTime = (date: number) => DateTime.fromMillis(date).toRelative();


/**
 * Filter an array of objects by a given value
 *
 * @param {T[]} array
 * @param {string} value
 * @param {keyof T} field
 *
 * @returns {T[]}
 */
export function filterByValue<T>(array: T[], value: string, field: keyof T): T[] {
  return array.filter((item) => item[field].toString().toLowerCase().includes(value.toLowerCase()));
}

/**
 * Display With fn for autocomplete, it receives a function that will be used to display the item
 *
 * @param {string} fieldName
 *
 * @returns {(item: any) => string}
 */
export function displayWithFn<T>(fieldName: keyof T): (item: any) => string {
  return (item: any) => item ? item[fieldName] : '';
}
