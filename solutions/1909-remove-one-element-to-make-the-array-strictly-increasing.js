/**
 * Remove One Element To Make The Array Strictly Increasing
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var canBeIncreasing = function (nums) {
  let violationCount = 0;
  const initialArraySize = nums.length;

  for (
    let comparisonIndex = 1;
    comparisonIndex < initialArraySize;
    comparisonIndex++
  ) {
    const previousValue = nums[comparisonIndex - 1];
    const currentValue = nums[comparisonIndex];

    if (previousValue >= currentValue) {
      violationCount++;
      if (violationCount > 1) {
        return false;
      }

      if (comparisonIndex > 1 && nums[comparisonIndex - 2] >= currentValue) {
        nums[comparisonIndex] = previousValue;
      }
    }
  }

  return true;
};
