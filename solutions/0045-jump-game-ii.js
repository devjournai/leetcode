/**
 * Jump Game II
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var jump = function (nums) {
  if (nums.length === 1) {
    return 0;
  }

  let totalJumps = 0;
  let furthestReachInCurrentJump = 0;
  let endOfCurrentJumpRange = 0;
  let currentProcessingIndex = 0;

  while (currentProcessingIndex < nums.length - 1) {
    furthestReachInCurrentJump = Math.max(
      furthestReachInCurrentJump,
      currentProcessingIndex + nums[currentProcessingIndex],
    );

    if (currentProcessingIndex === endOfCurrentJumpRange) {
      totalJumps++;
      endOfCurrentJumpRange = furthestReachInCurrentJump;
    }
    currentProcessingIndex++;
  }

  return totalJumps;
};
