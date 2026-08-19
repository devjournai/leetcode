/**
 * Minimum Operations to Make Array Equal to Target
 * Intuition: Same idea as forming a target by subarray increments: diffs of the same sign can share operations, so only the extra height of a new peak (or valley) costs more.
 * Approach: 1. Let diff[i] = target[i] - nums[i]. 2. Start with abs(diff[0]). 3. If consecutive diffs share a sign, add max(0, abs(curr) - abs(prev)). 4. If the sign flips, add abs(curr).
 * Dry Run: nums = [3, 1, 1, 2], target = [1, 2, 2, 1]. diffs = [-2, 1, 1, -1]. Start 2; sign flip add 1; same positive add 0; sign flip add 1. Answer 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minimumOperations = function (nums, target) {
  let operationCount = Math.abs(nums[0] - target[0]);

  for (let index = 1; index < nums.length; index++) {
    const currentDiff = target[index] - nums[index];
    const previousDiff = target[index - 1] - nums[index - 1];
    if (currentDiff >= 0 && previousDiff >= 0) {
      operationCount += Math.max(0, currentDiff - previousDiff);
    } else if (currentDiff <= 0 && previousDiff <= 0) {
      operationCount += Math.max(
        0,
        Math.abs(currentDiff) - Math.abs(previousDiff),
      );
    } else {
      operationCount += Math.abs(currentDiff);
    }
  }

  return operationCount;
};
