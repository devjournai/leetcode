/**
 * Minimum Number Of Operations To Make Array Empty
 * Intuition: The problem requires deleting elements in groups of 2 or 3. Since operations only apply to elements of equal value, we can process each distinct number's count independently. The goal is to reduce a count `k` to zero using minimum operations. It's impossible if `k=1`. For `k > 1`, `Math.ceil(k / 3)` operations is the most efficient way, as it implicitly handles remainders of 1 (by converting a 3-deletion into two 2-deletions) and 2 (by adding a 2-deletion).
 * Approach: 1. Compute the frequency of each number in the input array using a hash map. 2. Initialize a variable to accumulate the total minimum operations. 3. Iterate through the counts of each distinct number stored in the hash map. 4. For each count, if it is 1, return -1 immediately as it's impossible to remove. 5. Otherwise, calculate `Math.ceil(count / 3)` and add this value to the total operations. 6. After iterating through all distinct counts, return the accumulated total operations.
 * Dry Run: nums = [2,3,3,2,2,4,4,4,4,4]
 * 1. Initialize `numberFrequencies = new Map()`.
 * 2. Populate `numberFrequencies`:
 *    - Process 2: `numberFrequencies` becomes `{2 => 1}`.
 *    - Process 3: `numberFrequencies` becomes `{2 => 1, 3 => 1}`.
 *    - Process 3: `numberFrequencies` becomes `{2 => 1, 3 => 2}`.
 *    - Process 2: `numberFrequencies` becomes `{2 => 2, 3 => 2}`.
 *    - Process 2: `numberFrequencies` becomes `{2 => 3, 3 => 2}`.
 *    - Process 4: `numberFrequencies` becomes `{2 => 3, 3 => 2, 4 => 1}`.
 *    - Process 4: `numberFrequencies` becomes `{2 => 3, 3 => 2, 4 => 2}`.
 *    - Process 4: `numberFrequencies` becomes `{2 => 3, 3 => 2, 4 => 3}`.
 *    - Process 4: `numberFrequencies` becomes `{2 => 3, 3 => 2, 4 => 4}`.
 *    - Process 4: `numberFrequencies` becomes `{2 => 3, 3 => 2, 4 => 5}`.
 * 3. Initialize `totalOperationCount = 0`.
 * 4. Iterate `valueCount` through `numberFrequencies.values()`:
 *    - `valueCount = 3` (for number 2): `3 === 1` is false. `totalOperationCount += Math.ceil(3 / 3)` which is `1`. `totalOperationCount` is now `1`.
 *    - `valueCount = 2` (for number 3): `2 === 1` is false. `totalOperationCount += Math.ceil(2 / 3)` which is `1`. `totalOperationCount` is now `2`.
 *    - `valueCount = 5` (for number 4): `5 === 1` is false. `totalOperationCount += Math.ceil(5 / 3)` which is `2`. `totalOperationCount` is now `4`.
 * 5. All counts processed. Return `totalOperationCount` which is `4`.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var minOperations = function (nums) {
  const numberFrequencies = new Map();
  for (const currentNumber of nums) {
    numberFrequencies.set(
      currentNumber,
      (numberFrequencies.get(currentNumber) || 0) + 1,
    );
  }

  let totalOperationCount = 0;
  for (const valueCount of numberFrequencies.values()) {
    if (valueCount === 1) {
      return -1;
    }
    totalOperationCount += Math.ceil(valueCount / 3);
  }

  return totalOperationCount;
};
