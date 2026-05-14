/**
 * Find Original Array From Doubled Array
 * Intuition: If an array is a doubled array, it must contain pairs (x, 2x). Sorting the array allows us to process elements in an increasing order, ensuring that when we encounter 'x', its potential double '2x' will appear later in the sorted array (or be the same element if x=0).
 * Approach: 1. Handle edge case for odd length. 2. Sort the input array in ascending order. 3. Use a frequency map to store counts of all numbers in the sorted array. 4. Iterate through the sorted array; for each number 'x', if its count is positive, decrement its count and then attempt to find '2x'. If '2x' is found and its count is positive, decrement its count and add 'x' to the result. If '2x' is not found or its count is zero, the array is not a doubled array, so return an empty array. 5. Return the collected original elements.
 * Dry Run: changed = [1, 3, 4, 2, 6, 8]
 * 1. `inputArray` length (6) is even.
 * 2. `inputArray` sorted: `[1, 2, 3, 4, 6, 8]`.
 * 3. `countMap` populated: `{1: 1, 2: 1, 3: 1, 4: 1, 6: 1, 8: 1}`.
 * 4. `originalElements = []`.
 * 5. Iterate through sorted `inputArray`:
 *    - `indexTwo = 0`, `targetNumber = 1`:
 *      - `countMap.get(1)` is 1. Decrement `countMap.set(1, 0)`.
 *      - `doubleValue = 2`. `countMap.has(2)` and `countMap.get(2)` (1) are valid. Decrement `countMap.set(2, 0)`.
 *      - `originalElements.push(1)`. `originalElements = [1]`.
 *    - `indexTwo = 1`, `targetNumber = 2`:
 *      - `countMap.get(2)` is 0. Continue.
 *    - `indexTwo = 2`, `targetNumber = 3`:
 *      - `countMap.get(3)` is 1. Decrement `countMap.set(3, 0)`.
 *      - `doubleValue = 6`. `countMap.has(6)` and `countMap.get(6)` (1) are valid. Decrement `countMap.set(6, 0)`.
 *      - `originalElements.push(3)`. `originalElements = [1, 3]`.
 *    - `indexTwo = 3`, `targetNumber = 4`:
 *      - `countMap.get(4)` is 1. Decrement `countMap.set(4, 0)`.
 *      - `doubleValue = 8`. `countMap.has(8)` and `countMap.get(8)` (1) are valid. Decrement `countMap.set(8, 0)`.
 *      - `originalElements.push(4)`. `originalElements = [1, 3, 4]`.
 *    - `indexTwo = 4`, `targetNumber = 6`:
 *      - `countMap.get(6)` is 0. Continue.
 *    - `indexTwo = 5`, `targetNumber = 8`:
 *      - `countMap.get(8)` is 0. Continue.
 * 6. Loop finishes. Return `originalElements = [1, 3, 4]`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var findOriginalArray = function (changed) {
  if (changed.length % 2 !== 0) {
    return [];
  }

  const inputArray = changed;
  const countMap = new Map();
  const originalElements = [];

  inputArray.sort((valA, valB) => valA - valB);

  for (let indexOne = 0; indexOne < inputArray.length; indexOne++) {
    const itemValue = inputArray[indexOne];
    countMap.set(itemValue, (countMap.get(itemValue) || 0) + 1);
  }

  for (let indexTwo = 0; indexTwo < inputArray.length; indexTwo++) {
    const targetNumber = inputArray[indexTwo];

    if (countMap.get(targetNumber) === 0) {
      continue;
    }

    countMap.set(targetNumber, countMap.get(targetNumber) - 1);

    const doubleValue = targetNumber * 2;
    if (!countMap.has(doubleValue) || countMap.get(doubleValue) === 0) {
      return [];
    }

    countMap.set(doubleValue, countMap.get(doubleValue) - 1);
    originalElements.push(targetNumber);
  }

  return originalElements;
};
