/**
 * Maximum Score Of A Good Subarray
 * Intuition: A good subarray must contain index k. Expanding from k, always add the larger neighboring value so the running minimum drops as slowly as possible, and score = min * length.
 * Approach: 1. Start `currentLeftIndex = currentRightIndex = k`. 2. While a side can grow, extend the side with the larger next value (or the only available side). 3. Update `minimumInSubarray` and `maxScoreFound`. 4. Return the max score.
 * Dry Run: nums = [1,4,3,7,4,5], k = 3.
 *   - Start min 7 score 7. Expand to [3,7,4] min 3 length 3 score 9, then [4,3,7,4,5] min 3 length 5 score 15. Return 15.
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
          nums[currentRightIndex]
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
      minimumInSubarray * currentSubarrayLength
    );
  }

  return maxScoreFound;
};
