/**
 * Undefined To Null
 * Intuition: Recursively traverse complex data structures, applying a transformation to individual elements or properties. The transformation specifically targets `undefined` values, replacing them with `null` to ensure consistent data representation.
 * Approach: 1. Implement base cases for primitive values, `null`, and the specific `undefined` input, which should immediately return `null`. 2. For arrays, iterate through elements using a traditional `for` loop, recursively processing each element and collecting the results into a new array. 3. For objects, iterate through own properties using a `for...in` loop with `hasOwnProperty` check, recursively processing each property's value and assigning it to a new object.
 * Dry Run:
 * Input: [{ keyOne: undefined, keyTwo: 123 }, null, undefined, [456, undefined]]
 * 1. undefinedToNull([{ keyOne: undefined, keyTwo: 123 }, null, undefined, [456, undefined]]) -> Input is an array.
 * 2.   Initialize transformedArray = [].
 * 3.   Loop currentArrayIndex = 0: arrayItemValue = { keyOne: undefined, keyTwo: 123 }
 * 4.     undefinedToNull({ keyOne: undefined, keyTwo: 123 }) -> Input is an object.
 * 5.       Initialize newObjectResult = {}.
 * 6.       Loop objectPropertyKey = 'keyOne': originalObjectPropertyValue = undefined
 * 7.         undefinedToNull(undefined) -> returns null.
 * 8.         newObjectResult['keyOne'] = null.
 * 9.       Loop objectPropertyKey = 'keyTwo': originalObjectPropertyValue = 123
 * 10.        undefinedToNull(123) -> returns 123.
 * 11.       newObjectResult['keyTwo'] = 123.
 * 12.      Return { keyOne: null, keyTwo: 123 }.
 * 13.    transformedArray.push({ keyOne: null, keyTwo: 123 }). transformedArray = [{ keyOne: null, keyTwo: 123 }].
 * 14.  Loop currentArrayIndex = 1: arrayItemValue = null
 * 15.    undefinedToNull(null) -> returns null.
 * 16.  transformedArray.push(null). transformedArray = [{ keyOne: null, keyTwo: 123 }, null].
 * 17. Loop currentArrayIndex = 2: arrayItemValue = undefined
 * 18.   undefinedToNull(undefined) -> returns null.
 * 19.  transformedArray.push(null). transformedArray = [{ keyOne: null, keyTwo: 123 }, null, null].
 * 20. Loop currentArrayIndex = 3: arrayItemValue = [456, undefined]
 * 21.   undefinedToNull([456, undefined]) -> Input is an array.
 * 22.    Initialize innerTransformedArray = [].
 * 23.    Loop innerArrayIndex = 0: innerItemValue = 456
 * 24.      undefinedToNull(456) -> returns 456.
 * 25.      innerTransformedArray.push(456). innerTransformedArray = [456].
 * 26.    Loop innerArrayIndex = 1: innerItemValue = undefined
 * 27.      undefinedToNull(undefined) -> returns null.
 * 28.      innerTransformedArray.push(null). innerTransformedArray = [456, null].
 * 29.   Return [456, null].
 * 30.  transformedArray.push([456, null]). transformedArray = [{ keyOne: null, keyTwo: 123 }, null, null, [456, null]].
 * 31. Return [{ keyOne: null, keyTwo: 123 }, null, null, [456, null]].
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var undefinedToNull = function (obj) {
  if (obj === undefined) {
    return null;
  }

  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const transformedArray = [];
    for (
      let currentArrayIndex = 0;
      currentArrayIndex < obj.length;
      currentArrayIndex++
    ) {
      const arrayItemValue = obj[currentArrayIndex];
      const processedArrayItem = undefinedToNull(arrayItemValue);
      transformedArray.push(processedArrayItem);
    }
    return transformedArray;
  }

  const newObjectResult = {};
  for (const objectPropertyKey in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, objectPropertyKey)) {
      const originalObjectPropertyValue = obj[objectPropertyKey];
      const convertedObjectPropertyValue = undefinedToNull(
        originalObjectPropertyValue
      );
      newObjectResult[objectPropertyKey] = convertedObjectPropertyValue;
    }
  }

  return newObjectResult;
};
