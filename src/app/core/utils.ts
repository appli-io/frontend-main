import { DateTime } from 'luxon';

export const relativeTime = (date: number) => DateTime.fromMillis(date).toRelative();


/**
 * Filter an array of objects by a given value
 *
 * @param {T[]} array
 * @param {string} value
 * @param {keyof T} field
 *
 * @param predicate
 * @returns {T[]}
 */
export function filterByValue<T>(array: T[], value: string, field: keyof T, predicate?: (item: T) => boolean): T[] {
  return array.filter((item) => item[field].toString().toLowerCase().includes(value.toLowerCase()) && (!predicate || predicate(item)));
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

export function formDataFromObject<T>(object: T): FormData {
  const formData = new FormData();

  Object.keys(formData).forEach((key) => {
    if (formData[key] instanceof File) {
      formData.append(key, formData[key]);
    } else if (formData[key] instanceof Object) {
      formData.append(key, JSON.stringify(formData[key]));
    } else {
      formData.append(key, formData[key]);
    }
  });

  return formData;
}
