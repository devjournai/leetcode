/**
 * Remove One Element To Make The Array Strictly Increasing
 * Intuition: At most one descent is allowed. When nums[i-1] ≥ nums[i], either drop the previous (if nums[i-2] < nums[i]) or overwrite nums[i] with nums[i-1] (drop current). A second descent fails.
 * Approach: 1. Count `violationCount`. 2. On a descent, if i>1 and nums[i-2] ≥ nums[i], set nums[i]=previousValue. 3. Return whether violations ≤ 1.
 * Dry Run: nums=[1,2,10,5,7]. One descent 10>5, and 2<5 so keep 5. Rest increasing. Return true.
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
