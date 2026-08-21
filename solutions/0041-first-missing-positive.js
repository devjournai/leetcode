/**
 * First Missing Positive
 * Intuition: The smallest missing positive must be in 1..n+1. If we place every in-range value v at index v-1 (cyclic swaps), a linear scan finds the first index whose value is not i+1.
 * Approach: 1. While scanning, if nums[i] is in [1, n] and not already at index nums[i]-1, swap it there (do not increment i until the current slot is settled). 2. Walk i from 0 to n-1 and return the first i+1 that is missing. 3. If every slot is correct, return n+1.
 * Dry Run: nums = [3, 4, -1, 1], n = 4.
 *   - 3 swaps with index 2: [ -1, 4, 3, 1 ]; -1 is invalid so i advances.
 *   - 4 swaps with index 3: [ -1, 1, 3, 4 ]; 1 swaps with index 0: [ 1, -1, 3, 4 ].
 *   - Scan: index 1 holds -1, not 2. Return 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var firstMissingPositive = function (nums) {
  let placementIterator = 0;
  const arrayLengthVal = nums.length;

  while (placementIterator < arrayLengthVal) {
    const currentNumber = nums[placementIterator];
    const correctPosition = currentNumber - 1;

    if (
      currentNumber > 0 &&
      currentNumber <= arrayLengthVal &&
      nums[correctPosition] !== currentNumber
    ) {
      const temporaryStore = nums[correctPosition];
      nums[correctPosition] = currentNumber;
      nums[placementIterator] = temporaryStore;
    } else {
      placementIterator++;
    }
  }

  for (
    let searchIterator = 0;
    searchIterator < arrayLengthVal;
    searchIterator++
  ) {
    const expectedValue = searchIterator + 1;
    const actualValue = nums[searchIterator];
    if (actualValue !== expectedValue) {
      return expectedValue;
    }
  }

  return arrayLengthVal + 1;
};
