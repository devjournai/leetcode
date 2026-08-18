/**
 * Minimum Number Game
 *
 * Intuition:
 *
 * In every round:
 *
 * 1. Alice removes the smallest element.
 * 2. Bob removes the next smallest element.
 * 3. Bob puts his element into arr first.
 * 4. Alice puts her element into arr second.
 *
 * Therefore, if we sort the array:
 *
 *     nums = [smallest, secondSmallest, ...]
 *
 * each pair of consecutive elements represents one round.
 *
 * For every pair:
 *
 *     [nums[i], nums[i + 1]]
 *
 * Alice gets:
 *
 *     nums[i]
 *
 * Bob gets:
 *
 *     nums[i + 1]
 *
 * But Bob appends first.
 *
 * Therefore we append:
 *
 *     nums[i + 1], nums[i]
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 *     nums = [5,4,2,3]
 *
 * After sorting:
 *
 *     [2,3,4,5]
 *
 * Round 1:
 *
 *     Alice -> 2
 *     Bob   -> 3
 *
 *     arr -> [3,2]
 *
 * Round 2:
 *
 *     Alice -> 4
 *     Bob   -> 5
 *
 *     arr -> [3,2,5,4]
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var numberGame = function (nums) {
  nums.sort((a, b) => a - b);

  const arr = [];
  for (let i = 0; i < nums.length; i += 2) {
    arr.push(nums[i + 1]);
    arr.push(nums[i]);
  }

  return arr;
};
