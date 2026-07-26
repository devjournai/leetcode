/**
 * Inversion Of Object
 * Intuition: The core idea is to swap keys and values. When multiple keys map to the same value, the inverted object should store all original keys as an array under the common value.
 * Approach: 1. Initialize an empty object to store the inverted result. 2. Iterate through each key-value pair of the input object/array. 3. For each pair, use the original value as the new key in the inverted object. 4. If the new key (original value) is encountered for the first time, assign the original key to it. 5. If the new key has been seen before and currently maps to a single original key, convert its value to an array containing both the existing key and the current key. 6. If the new key already maps to an array of original keys, simply append the current original key to that array. 7. Return the constructed inverted object.
 * Dry Run:
 * obj = { "first": "apple", "second": "banana", "third": "apple", "fourth": "cherry" }
 *
 * 1. invertedResult = {}
 *
 * 2. Loop start: for (let originalKey in obj)
 *
 *    - originalKey = "first"
 *      - originalValue = obj["first"] = "apple"
 *      - currentEntry = invertedResult["apple"] is undefined.
 *      - invertedResult["apple"] = "first".
 *      - invertedResult is { "apple": "first" }
 *
 *    - originalKey = "second"
 *      - originalValue = obj["second"] = "banana"
 *      - currentEntry = invertedResult["banana"] is undefined.
 *      - invertedResult["banana"] = "second".
 *      - invertedResult is { "apple": "first", "banana": "second" }
 *
 *    - originalKey = "third"
 *      - originalValue = obj["third"] = "apple"
 *      - currentEntry = invertedResult["apple"] is "first". It is not undefined.
 *      - Array.isArray(currentEntry) (Array.isArray("first")) is false.
 *      - Go to else block: invertedResult["apple"] = [currentEntry, originalKey].
 *      - invertedResult["apple"] becomes ["first", "third"].
 *      - invertedResult is { "apple": ["first", "third"], "banana": "second" }
 *
 *    - originalKey = "fourth"
 *      - originalValue = obj["fourth"] = "cherry"
 *      - currentEntry = invertedResult["cherry"] is undefined.
 *      - invertedResult["cherry"] = "fourth".
 *      - invertedResult is { "apple": ["first", "third"], "banana": "second", "cherry": "fourth" }
 *
 * 3. Loop ends.
 *
 * 4. Return invertedResult.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var invertObject = function (obj) {
  const invertedResult = {};

  for (let originalKey in obj) {
    const originalValue = obj[originalKey];
    const currentEntry = invertedResult[originalValue];

    if (currentEntry === undefined) {
      invertedResult[originalValue] = originalKey;
    } else if (Array.isArray(currentEntry)) {
      currentEntry.push(originalKey);
    } else {
      invertedResult[originalValue] = [currentEntry, originalKey];
    }
  }

  return invertedResult;
};
