/**
 * Minimum Elements To Add To Form A Given Sum
 * Intuition: Each added value is in [-limit, limit], so the fewest additions is ceil(|goal - sum| / limit).
 * Approach: 1. Reduce `nums` to `initialArraySum`. 2. `absoluteDifference = |goal - sum|`. 3. Return `Math.ceil(absoluteDifference / limit)`.
 * Dry Run: nums = [1,-1,1], limit = 3, goal = -4.
 *   - Sum 1, need 5, ceil(5/3)=2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minElements = function (nums, limit, goal) {
  const initialArraySum = nums.reduce(
    (currentTotal, numberValue) => currentTotal + numberValue,
    0
  );
  const neededDifference = goal - initialArraySum;
  const absoluteDifference = Math.abs(neededDifference);
  const countOfElements = Math.ceil(absoluteDifference / limit);
  return countOfElements;
};
