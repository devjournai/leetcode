/**
 * Jump Game II
 * Intuition: Each index i can reach up to i+nums[i]. Treating the array as BFS layers, one jump covers the current reachable range; when that range ends we take another jump and extend the frontier.
 * Approach: 1. If length is 1, return 0. 2. Track jumps, the end of the current jump’s range, and the farthest index reachable while scanning that range. 3. For each i before the last index, update farthest. 4. When i hits the range end, increment jumps and set the new range end to farthest.
 * Dry Run: nums = [2, 3, 1, 1, 4].
 *   - i=0: farthest=2, range end 0 → jump 1, new end=2.
 *   - i=1: farthest=4; i=2: still farthest=4, range end 2 → jump 2, new end=4. Stop at last index. Return 2.
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
      currentProcessingIndex + nums[currentProcessingIndex]
    );

    if (currentProcessingIndex === endOfCurrentJumpRange) {
      totalJumps++;
      endOfCurrentJumpRange = furthestReachInCurrentJump;
    }
    currentProcessingIndex++;
  }

  return totalJumps;
};
