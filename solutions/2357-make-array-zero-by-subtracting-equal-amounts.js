/**
 * Make Array Zero By Subtracting Equal Amounts
 * Intuition: Each operation effectively "removes" the smallest positive value by reducing it to zero. All other positive values are also reduced by this amount, maintaining their relative differences. Thus, each distinct positive value in the original array requires exactly one unique "reduction cycle" to be eliminated, corresponding to one operation.
 * Approach: 1. Initialize a Set to store unique positive numbers. 2. Iterate through the input array. 3. For each number, if it is positive, add it to the Set. 4. The final size of the Set represents the minimum number of operations.
 * Dry Run: nums = [1, 5, 0, 3, 5]
 * 1. Initialize `uniquePositiveValues` as an empty Set.
 * 2. Loop through `nums`:
 *    - `currentValue` = 1. `1 > 0`, so add 1 to `uniquePositiveValues`. `uniquePositiveValues` = {1}.
 *    - `currentValue` = 5. `5 > 0`, so add 5 to `uniquePositiveValues`. `uniquePositiveValues` = {1, 5}.
 *    - `currentValue` = 0. `0 > 0` is false. Skip.
 *    - `currentValue` = 3. `3 > 0`, so add 3 to `uniquePositiveValues`. `uniquePositiveValues` = {1, 5, 3}.
 *    - `currentValue` = 5. `5 > 0`, 5 is already in `uniquePositiveValues`. Set remains {1, 5, 3}.
 * 3. Loop finishes.
 * 4. Return `uniquePositiveValues.size`, which is 3.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var minimumOperations = function (nums) {
  const distinctPositiveNumbers = new Set();
  const arrayLength = nums.length;

  for (
    let currentElementIndex = 0;
    currentElementIndex < arrayLength;
    currentElementIndex++
  ) {
    const elementValue = nums[currentElementIndex];
    if (elementValue > 0) {
      distinctPositiveNumbers.add(elementValue);
    }
  }

  const totalOperations = distinctPositiveNumbers.size;
  return totalOperations;
};
