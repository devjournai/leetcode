/**
 * Minimize Maximum Of Array
 * Intuition: The operation allows moving a value from an element `nums[i]` to its left neighbor `nums[i-1]`. This implies values can only propagate leftwards, but not rightwards. To minimize the maximum value within any prefix `nums[0...i]`, the sum of elements in that prefix `(sum(nums[0...i]))` must be distributed as evenly as possible among the `i+1` elements. The maximum value for any element within this prefix will thus be `ceil(sum(nums[0...i]) / (i+1))`. The overall minimum possible maximum for the entire array will be the maximum of these prefix-bound maximums.
 * Approach: 1. Initialize `maximumOverallValue` to 0. 2. Initialize `currentPrefixTotal` to 0 (using a BigInt for large sums to prevent overflow, though in JS, numbers handle large integers up to 2^53 - 1, which might be sufficient depending on constraints, but BigInt is safer for sums). 3. Initialize `prefixElementCount` to 0. 4. Iterate through the input array `nums` from the first element to the last (left-to-right). 5. In each iteration, add the current `nums[arrayIndex]` to `currentPrefixTotal` and increment `prefixElementCount`. 6. Calculate `currentPrefixMaximum` as `Math.ceil(Number(currentPrefixTotal) / prefixElementCount)`. 7. Update `maximumOverallValue` by taking the maximum of its current value and `currentPrefixMaximum`. 8. After iterating through all elements, `maximumOverallValue` will hold the minimum possible maximum value of the array.
 * Dry Run: nums = [3, 7, 1, 6]
 * - Initialize: `maximumOverallValue = 0`, `currentPrefixTotal = 0n`, `prefixElementCount = 0`
 * - `arrayIndex = 0` (nums[0] = 3):
 *   - `currentPrefixTotal = 0n + 3n = 3n`
 *   - `prefixElementCount = 0 + 1 = 1`
 *   - `currentPrefixMaximum = Math.ceil(Number(3n) / 1) = 3`
 *   - `maximumOverallValue = Math.max(0, 3) = 3`
 * - `arrayIndex = 1` (nums[1] = 7):
 *   - `currentPrefixTotal = 3n + 7n = 10n`
 *   - `prefixElementCount = 1 + 1 = 2`
 *   - `currentPrefixMaximum = Math.ceil(Number(10n) / 2) = 5`
 *   - `maximumOverallValue = Math.max(3, 5) = 5`
 * - `arrayIndex = 2` (nums[2] = 1):
 *   - `currentPrefixTotal = 10n + 1n = 11n`
 *   - `prefixElementCount = 2 + 1 = 3`
 *   - `currentPrefixMaximum = Math.ceil(Number(11n) / 3) = 4` (since 11/3 is approx 3.67)
 *   - `maximumOverallValue = Math.max(5, 4) = 5`
 * - `arrayIndex = 3` (nums[3] = 6):
 *   - `currentPrefixTotal = 11n + 6n = 17n`
 *   - `prefixElementCount = 3 + 1 = 4`
 *   - `currentPrefixMaximum = Math.ceil(Number(17n) / 4) = 5` (since 17/4 is 4.25)
 *   - `maximumOverallValue = Math.max(5, 5) = 5`
 * - Loop finishes. Return `maximumOverallValue = 5`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimizeArrayValue = function (nums) {
  let maximumOverallValue = 0;
  let currentPrefixTotal = 0n;
  let prefixElementCount = 0;

  for (let arrayIndex = 0; arrayIndex < nums.length; arrayIndex++) {
    currentPrefixTotal = currentPrefixTotal + BigInt(nums[arrayIndex]);
    prefixElementCount = prefixElementCount + 1;
    const currentPrefixMaximum = Math.ceil(
      Number(currentPrefixTotal) / prefixElementCount,
    );
    maximumOverallValue = Math.max(maximumOverallValue, currentPrefixMaximum);
  }

  return maximumOverallValue;
};
