/**
 * Convert Object To Json String
 * Intuition: Recursively serialize different data types (primitives, arrays, objects) according to JSON rules.
 * Approach: 1. Handle primitive types (null, boolean, number, string) directly. 2. For arrays, recursively stringify each element and join them with commas, wrapped in square brackets. 3. For objects, get keys, recursively stringify each key's value, format as "key":value, and join these pairs with commas, wrapped in curly braces.
 * Dry Run: jsonStringify({"a": 1, "b": [true, null]})
 *   - inputObject is {"a": 1, "b": [true, null]} (an object)
 *   - objectPropertyNames = ["a", "b"]
 *   - objectPropertyNames.map:
 *     - For "a":
 *       - jsonStringify(1) returns "1"
 *       - objectPair = '"a":1'
 *     - For "b":
 *       - jsonStringify([true, null]) (an array)
 *         - arrayElementsConverted = [jsonStringify(true), jsonStringify(null)]
 *           - jsonStringify(true) returns "true"
 *           - jsonStringify(null) returns "null"
 *         - arrayElementsConverted becomes ["true", "null"]
 *         - arrayResultString = "true,null"
 *         - returns "[true,null]"
 *       - objectPair = '"b":[true,null]'
 *   - objectPropertyStrings becomes ['"a":1', '"b":[true,null]']
 *   - objectResultString = '"a":1,"b":[true,null]'
 *   - Returns '{"a":1,"b":[true,null]}'
 * Time Complexity: O(N)
 * Space Complexity: O(H + L)
 */
var jsonStringify = function (inputObject) {
  if (inputObject === null) {
    return "null";
  }

  if (typeof inputObject === "boolean" || typeof inputObject === "number") {
    return String(inputObject);
  }

  if (typeof inputObject === "string") {
    return `"${inputObject}"`;
  }

  if (Array.isArray(inputObject)) {
    const arrayElementsConverted = inputObject.map((itemToConvert) =>
      jsonStringify(itemToConvert)
    );
    const arrayResultString = arrayElementsConverted.join(",");
    return `[${arrayResultString}]`;
  }

  const objectPropertyNames = Object.keys(inputObject);
  const objectPropertyStrings = objectPropertyNames.map((currentKey) => {
    const valueConverted = jsonStringify(inputObject[currentKey]);
    return `"${currentKey}":${valueConverted}`;
  });
  const objectResultString = objectPropertyStrings.join(",");
  return `{${objectResultString}}`;
};
