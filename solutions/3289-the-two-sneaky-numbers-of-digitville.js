/**
 * The Two Sneaky Numbers of Digitville
 * Intuition: The array contains every integer in [0, n-1] once, plus two duplicated "sneaky" values. Counting frequencies finds the two numbers that appear twice.
 * Approach: Count occurrences (values are at most 100). Whenever a count becomes 2, record that number.
 * Dry Run: nums = [0, 1, 1, 0]
 *   - 0: count 1, then 2 -> sneaky 0
 *   - 1: count 1, then 2 -> sneaky 1
 *   - Answer [0, 1]
 * Time Complexity: O(n)
 * Space Complexity: O(1) because the count array is size 101
 */
var getSneakyNumbers = function (nums) {
  const MAX = 100;
  const ans = [];
  const count = Array(MAX + 1).fill(0);

  for (const num of nums) {
    if (++count[num] === 2) ans.push(num);
  }

  return ans;
};
