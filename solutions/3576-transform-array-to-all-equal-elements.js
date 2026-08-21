/**
 * Transform Array to All Equal Elements
 * Intuition: Allowed operation flips two adjacent ±1 values. Greedy: whenever nums[i] is not the target, flip i and i+1. Try targets +1 and -1.
 * Approach: 1. Define check(target): scan 0..n-2, flip when the effective value (with a pending sign) is not target. 2. The last element must match after the leftover sign. 3. Flip count must be ≤ k.
 * Dry Run: nums = [1, -1, 1], k = 2. Target 1: index 1 is -1 → flip, count 1, last becomes 1. Valid.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var canMakeEqual = function (nums, k) {
  const check = (target) => {
    let flips = 0;
    let sign = 1;
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] * sign === target) {
        sign = 1;
      } else {
        sign = -1;
        flips++;
      }
    }
    return flips <= k && nums[nums.length - 1] * sign === target;
  };

  return check(1) || check(-1);
};
