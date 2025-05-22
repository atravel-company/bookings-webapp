/**
 * Converts a URLSearchParams instance into a plain JavaScript object.
 *
 * If a key appears multiple times in the search parameters, its corresponding
 * value in the object will be an array of all its values. Otherwise, it will
 * be a single string value.
 *
 * @param {URLSearchParams} searchParams The URLSearchParams instance to convert.
 * @returns {Record<string, string | string[]>} A plain object representation
 * of the search parameters.
 *
 * @example
 * // Example 1: Simple case
 * const params1 = new URLSearchParams('id=10&name=JohnDoe');
 * const obj1 = searchParamsToObject(params1);
 * console.log(obj1); // Output: { id: '10', name: 'JohnDoe' }
 *
 * // Example 2: Case with multiple values for the same key
 * const params2 = new URLSearchParams('id=10&name=JaneDoe&id=20&tags=js&tags=react');
 * const obj2 = searchParamsToObject(params2);
 * console.log(obj2);
 * // Output: { id: ['10', '20'], name: 'JaneDoe', tags: ['js', 'react'] }
 */
export function searchParamsToObject(
  searchParams: URLSearchParams
): Record<string, string | string[]> {
  const plainObject: Record<string, string | string[]> = {};

  if (!searchParams) {
    return plainObject;
  }

  for (const [key, value] of searchParams.entries()) {
    if (plainObject.hasOwnProperty(key)) {
      const existingValue = plainObject[key];
      if (Array.isArray(existingValue)) {
        existingValue.push(value);
      } else {
        plainObject[key] = [existingValue, value];
      }
    } else {
      plainObject[key] = value;
    }
  }
  return plainObject;
}
