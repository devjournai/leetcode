/**
 * Group By
 * Intuition: Iterate through each element of the array, compute a grouping key for it using the provided function, and collect elements into an object where keys are the computed grouping keys and values are arrays of corresponding elements.
 * Approach: 1. Initialize an empty object to store the grouped results. 2. Iterate over each element in the array using a for-of loop. 3. For each element, invoke the provided callback function `fn` to obtain its grouping key. 4. If the grouping key does not yet exist as a property in the result object, create it and assign an empty array as its value. 5. Push the current element into the array associated with its grouping key in the result object. 6. After iterating through all elements, return the populated result object.
 * Dry Run: For `[1,2,3].groupBy(String)`
 *   1. `resultContainer = {}`
 *   2. `for (const currentElement of this)`:
 *      - `currentElement = 1`:
 *          - `groupIdentifier = String(1)` which is `"1"`.
 *          - `resultContainer["1"]` is `undefined`. Initialize `resultContainer["1"] = []`.
 *          - `resultContainer["1"].push(1)`. `resultContainer` is `{"1": [1]}`.
 *      - `currentElement = 2`:
 *          - `groupIdentifier = String(2)` which is `"2"`.
 *          - `resultContainer["2"]` is `undefined`. Initialize `resultContainer["2"] = []`.
 *          - `resultContainer["2"].push(2)`. `resultContainer` is `{"1": [1], "2": [2]}`.
 *      - `currentElement = 3`:
 *          - `groupIdentifier = String(3)` which is `"3"`.
 *          - `resultContainer["3"]` is `undefined`. Initialize `resultContainer["3"] = []`.
 *          - `resultContainer["3"].push(3)`. `resultContainer` is `{"1": [1], "2": [2], "3": [3]}`.
 *   3. Loop finishes.
 *   4. Return `{"1":[1],"2":[2],"3":[3]}`.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N)
 */
Array.prototype.groupBy = function (fn) {
  const resultContainer = {};

  for (const currentElement of this) {
    const groupIdentifier = fn(currentElement);
    if (!resultContainer[groupIdentifier]) {
      resultContainer[groupIdentifier] = [];
    }
    resultContainer[groupIdentifier].push(currentElement);
  }

  return resultContainer;
};
