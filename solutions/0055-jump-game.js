/**
 * Jump Game
 * Intuition: Working backward, the last index is reachable if some earlier index can jump to the current “goal”. Sliding the goal left to that index means the start must eventually become the goal.
 * Approach: 1. Set goal to n-1. 2. For i from n-2 down to 0, if i + nums[i] >= goal, set goal = i. 3. Return whether goal is 0.
 * Dry Run: nums = [2, 3, 1, 1, 4].
 *   - i=3: 3+1 >= 4 → goal=3. i=2: 2+1 >= 3 → goal=2. i=1: 1+3 >= 2 → goal=1. i=0: 0+2 >= 1 → goal=0. Return true.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var canJump = function (nums) {
  const arraySize = nums.length;
  let goalPosition = arraySize - 1;

  for (
    let currentPosition = arraySize - 2;
    currentPosition >= 0;
    currentPosition--
  ) {
    const potentialReach = currentPosition + nums[currentPosition];
    if (potentialReach >= goalPosition) {
      goalPosition = currentPosition;
    }
  }

  return goalPosition === 0;
};
