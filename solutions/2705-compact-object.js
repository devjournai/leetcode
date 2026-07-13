/**
 * Compact Object
 * Intuition: Recursively traverse the object or array. For each element or property, if it's an object or array, compact it recursively. If the compacted value is truthy, include it in the new structure. Primitives are returned as-is and checked for truthiness.
 * Approach: 1. Handle base cases for null and non-object primitives by returning them directly. 2. If the input is an array, iterate through its elements, recursively compacting each. Only truthy compacted elements are added to a new result array. 3. If the input is an object, iterate through its keys. For each key, recursively compact its corresponding value. Only truthy compacted values are assigned to a new result object under their original keys.
 * Dry Run: obj = [null, 0, 5, [false, 1, { a: null, b: 2 }], { c: 0, d: [3, null] }]
 * 1. compactObject([null, 0, 5, [false, 1, { a: null, b: 2 }], { c: 0, d: [3, null] }])
 *    - inputObject is array. resultArray = [].
 *    - For null: compactObject(null) -> null (falsy). Skip.
 *    - For 0: compactObject(0) -> 0 (falsy). Skip.
 *    - For 5: compactObject(5) -> 5 (truthy). resultArray = [5].
 *    - For [false, 1, { a: null, b: 2 }]:
 *      - compactObject([false, 1, { a: null, b: 2 }]) -> innerResultArray = [].
 *      - For false: compactObject(false) -> false (falsy). Skip.
 *      - For 1: compactObject(1) -> 1 (truthy). innerResultArray = [1].
 *      - For { a: null, b: 2 }:
 *        - compactObject({ a: null, b: 2 }) -> innerResultObject = {}.
 *        - For 'a': compactObject(null) -> null (falsy). Skip.
 *        - For 'b': compactObject(2) -> 2 (truthy). innerResultObject['b'] = 2. innerResultObject = {b: 2}.
 *        - Returns {b: 2} (truthy).
 *      - innerResultArray.push({b: 2}). innerResultArray = [1, {b: 2}].
 *      - Returns [1, {b: 2}] (truthy).
 *    - resultArray.push([1, {b: 2}]). resultArray = [5, [1, {b: 2}]].
 *    - For { c: 0, d: [3, null] }:
 *      - compactObject({ c: 0, d: [3, null] }) -> outerResultObject = {}.
 *      - For 'c': compactObject(0) -> 0 (falsy). Skip.
 *      - For 'd': compactObject([3, null]):
 *        - compactObject([3, null]) -> finalArray = [].
 *        - For 3: compactObject(3) -> 3 (truthy). finalArray = [3].
 *        - For null: compactObject(null) -> null (falsy). Skip.
 *        - Returns [3] (truthy).
 *      - outerResultObject['d'] = [3]. outerResultObject = {d: [3]}.
 *      - Returns {d: [3]} (truthy).
 *    - resultArray.push({d: [3]}). resultArray = [5, [1, {b: 2}], {d: [3]}].
 *    - Returns [5, [1, {b: 2}], {d: [3]}].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var compactObject = function (obj) {
  const inputObject = obj;

  if (inputObject === null) {
    return null;
  }

  if (typeof inputObject !== "object") {
    return inputObject;
  }

  if (Array.isArray(inputObject)) {
    const resultArray = [];
    for (const elementValue of inputObject) {
      const compactedElement = compactObject(elementValue);
      if (Boolean(compactedElement)) {
        resultArray.push(compactedElement);
      }
    }
    return resultArray;
  }

  const resultObject = {};
  const objectKeys = Object.keys(inputObject);

  objectKeys.forEach((propertyKey) => {
    const propertyValue = inputObject[propertyKey];
    const compactedValue = compactObject(propertyValue);
    if (Boolean(compactedValue)) {
      resultObject[propertyKey] = compactedValue;
    }
  });

  return resultObject;
};
