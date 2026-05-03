/**
 * Distinct Numbers In Each Subarray
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
      (elementFrequencies.get(addedValue) || 0) + 1,
    );

    if (currentWindowRight >= k - 1) {
      collectedDistincts.push(elementFrequencies.size);

      const windowShiftLeft = currentWindowRight - k + 1;
      const removedValue = nums[windowShiftLeft];

      elementFrequencies.set(
        removedValue,
        elementFrequencies.get(removedValue) - 1,
      );

      if (elementFrequencies.get(removedValue) === 0) {
        elementFrequencies.delete(removedValue);
      }
    }
  }

  return collectedDistincts;
};
