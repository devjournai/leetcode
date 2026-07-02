/**
 * Count The Number Of Good Subarrays
 * Intuition: This problem asks to count subarrays with at least 'k' pairs of identical elements. The "at least k" property combined with subarrays suggests a sliding window approach. As we expand the window from the right, we track the count of pairs. If the current window contains 'k' or more pairs, it means we've found a valid starting point for 'good' subarrays. Any subarray starting at the current window's left boundary and extending to the current right boundary or beyond (up to the end of the main array) will also be 'good'. We count these valid subarrays and then shrink the window from the left until the condition is no longer met, allowing us to find new valid starting points.
 * Approach: 1. Initialize `totalGoodSubarrays` to 0, `windowStartingIndex` to 0, `elementFrequencies` (a Map) to store frequencies of numbers in the current window, and `currentPairAccumulator` to 0.
 * 2. Iterate `windowEndingIndex` from 0 to `nums.length - 1`:
 *    a. Get the `itemValue` at `nums[windowEndingIndex]`.
 *    b. Retrieve its `previousOccurrenceCount` from `elementFrequencies`. Add this `previousOccurrenceCount` to `currentPairAccumulator` (as the `itemValue` forms this many new pairs with existing identical elements).
 *    c. Increment the frequency of `itemValue` in `elementFrequencies`.
 *    d. While `currentPairAccumulator` is greater than or equal to `k`:
 *        i. Add `(nums.length - windowEndingIndex)` to `totalGoodSubarrays`. This counts all good subarrays that start at `windowStartingIndex` and end at or after `windowEndingIndex`.
 *        ii. Get the `leftmostValue` from `nums[windowStartingIndex]`.
 *        iii. Retrieve its `currentLeftmostFrequency` from `elementFrequencies`.
 *        iv. Subtract `(currentLeftmostFrequency - 1)` from `currentPairAccumulator` (as removing one instance of `leftmostValue` reduces pairs by this amount).
 *        v. Decrement the frequency of `leftmostValue` in `elementFrequencies`.
 *        vi. Increment `windowStartingIndex`.
 * 3. Return `totalGoodSubarrays`.
 * Dry Run: nums = [1,1,1,1], k = 2
 * Initial: totalGoodSubarrays = 0, windowStartingIndex = 0, elementFrequencies = Map(), currentPairAccumulator = 0, N = 4
 * windowEndingIndex = 0 (value = 1):
 *   previousOccurrenceCount = 0. currentPairAccumulator = 0 + 0 = 0. elementFrequencies = {1: 1}.
 *   while (0 >= 2) is false.
 * windowEndingIndex = 1 (value = 1):
 *   previousOccurrenceCount = 1. currentPairAccumulator = 0 + 1 = 1. elementFrequencies = {1: 2}.
 *   while (1 >= 2) is false.
 * windowEndingIndex = 2 (value = 1):
 *   previousOccurrenceCount = 2. currentPairAccumulator = 1 + 2 = 3. elementFrequencies = {1: 3}.
 *   while (3 >= 2) is true:
 *     totalGoodSubarrays += (4 - 2) = 2. totalGoodSubarrays = 2. (Counts [1,1,1] from index 0 and [1,1,1,1] from index 0)
 *     leftmostValue = nums[0] = 1. currentLeftmostFrequency = 3.
 *     currentPairAccumulator -= (3 - 1) = 2. currentPairAccumulator = 3 - 2 = 1.
 *     elementFrequencies.set(1, 2). windowStartingIndex = 1.
 *   while (1 >= 2) is false.
 * windowEndingIndex = 3 (value = 1):
 *   previousOccurrenceCount = 2. currentPairAccumulator = 1 + 2 = 3. elementFrequencies = {1: 3}.
 *   while (3 >= 2) is true:
 *     totalGoodSubarrays += (4 - 3) = 1. totalGoodSubarrays = 2 + 1 = 3. (Counts [1,1,1] from index 1)
 *     leftmostValue = nums[1] = 1. currentLeftmostFrequency = 3.
 *     currentPairAccumulator -= (3 - 1) = 2. currentPairAccumulator = 3 - 2 = 1.
 *     elementFrequencies.set(1, 2). windowStartingIndex = 2.
 *   while (1 >= 2) is false.
 * Loop ends.
 * Return totalGoodSubarrays = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var countGood = function (nums, k) {
  const elementFrequencies = new Map();
  let totalGoodSubarrays = 0;
  let currentPairAccumulator = 0;
  let windowStartingIndex = 0;

  for (
    let windowEndingIndex = 0;
    windowEndingIndex < nums.length;
    windowEndingIndex++
  ) {
    const itemValue = nums[windowEndingIndex];
    const previousOccurrenceCount = elementFrequencies.get(itemValue) || 0;
    currentPairAccumulator += previousOccurrenceCount;
    elementFrequencies.set(itemValue, previousOccurrenceCount + 1);

    while (currentPairAccumulator >= k) {
      totalGoodSubarrays += nums.length - windowEndingIndex;
      const leftmostValue = nums[windowStartingIndex];
      const currentLeftmostFrequency = elementFrequencies.get(leftmostValue);
      currentPairAccumulator -= currentLeftmostFrequency - 1;
      elementFrequencies.set(leftmostValue, currentLeftmostFrequency - 1);
      windowStartingIndex++;
    }
  }

  return totalGoodSubarrays;
};
