/**
 * Trionic Array I
 * Intuition: A trionic array is strictly increasing, then strictly decreasing, then strictly increasing, covering the whole array with n >= 4.
 * Approach: 1. Walk the first ascent; fail if it has length 0. 2. Walk a descent; fail if empty. 3. Walk a second ascent; fail if empty. 4. Accept iff the walk ends at n-1.
 * Dry Run: nums = [1, 3, 2, 4]. i goes 0→1 (peak), 1→2 (valley), 2→3 and i === n-1. True.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isTrionic = function (nums) {
  const n = nums.length;

  if (n < 4) return false;

  let i = 0;

  while (i + 1 < n && nums[i] < nums[i + 1]) {
    i++;
  }
  if (i === 0) return false;

  let peak = i;

  while (i + 1 < n && nums[i] > nums[i + 1]) {
    i++;
  }
  if (i === peak) return false;

  let valley = i;

  while (i + 1 < n && nums[i] < nums[i + 1]) {
    i++;
  }
  if (i === valley) return false;

  return i === n - 1;
};
