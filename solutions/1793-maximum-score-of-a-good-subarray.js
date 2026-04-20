/**
 * Maximum Score Of A Good Subarray
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumScore = function (nums, k) {
  let currentLeftIndex = k;
  let currentRightIndex = k;
  let maxScoreFound = nums[k];
  let minimumInSubarray = nums[k];
  const totalElementsCount = nums.length;

  while (currentLeftIndex > 0 || currentRightIndex < totalElementsCount - 1) {
    const canMoveLeft = currentLeftIndex > 0;
    const canMoveRight = currentRightIndex < totalElementsCount - 1;

    if (canMoveLeft && canMoveRight) {
      const valueAtLeftExtension = nums[currentLeftIndex - 1];
      const valueAtRightExtension = nums[currentRightIndex + 1];

      if (valueAtLeftExtension >= valueAtRightExtension) {
        currentLeftIndex--;
        minimumInSubarray = Math.min(minimumInSubarray, nums[currentLeftIndex]);
      } else {
        currentRightIndex++;
        minimumInSubarray = Math.min(
          minimumInSubarray,
          nums[currentRightIndex],
        );
      }
    } else if (canMoveLeft) {
      currentLeftIndex--;
      minimumInSubarray = Math.min(minimumInSubarray, nums[currentLeftIndex]);
    } else if (canMoveRight) {
      currentRightIndex++;
      minimumInSubarray = Math.min(minimumInSubarray, nums[currentRightIndex]);
    }

    const currentSubarrayLength = currentRightIndex - currentLeftIndex + 1;
    maxScoreFound = Math.max(
      maxScoreFound,
      minimumInSubarray * currentSubarrayLength,
    );
  }

  return maxScoreFound;
};
