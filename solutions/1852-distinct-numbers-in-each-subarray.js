/**
 * Distinct Numbers In Each Subarray
 * Intuition: A sliding window of length k with a frequency map’s size is the distinct count of each subarray.
 * Approach: 1. Expand `currentWindowRight`, increment `elementFrequencies`. 2. Once the window has k elements, push `elementFrequencies.size`. 3. Decrement/remove the leftmost value and continue.
 * Dry Run: nums=[1,2,3,2,2,1,3], k=3.
 *   - windows: {1,2,3}→3, {2,3,2}→2, {3,2,2}→2, {2,2,1}→2, {2,1,3}→3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var distinctNumbers = function (nums, k) {
  const collectedDistincts = [];
  const elementFrequencies = new Map();

  for (
    let currentWindowRight = 0;
    currentWindowRight < nums.length;
    currentWindowRight++
  ) {
    const addedValue = nums[currentWindowRight];
    elementFrequencies.set(
      addedValue,
      (elementFrequencies.get(addedValue) || 0) + 1
    );

    if (currentWindowRight >= k - 1) {
      collectedDistincts.push(elementFrequencies.size);

      const windowShiftLeft = currentWindowRight - k + 1;
      const removedValue = nums[windowShiftLeft];

      elementFrequencies.set(
        removedValue,
        elementFrequencies.get(removedValue) - 1
      );

      if (elementFrequencies.get(removedValue) === 0) {
        elementFrequencies.delete(removedValue);
      }
    }
  }

  return collectedDistincts;
};
