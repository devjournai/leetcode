/**
 * Find the Power of K-Size Subarrays II
 * Intuition: Same as part I: a k-window's power is its last (max) element only when the window is consecutive increasing; otherwise -1. Larger n still allows a single O(n) scan.
 * Approach: 1. Track the start of the current consecutive-increasing run. 2. Reset the start when nums[i] != nums[i-1] + 1. 3. For each window ending at i, emit nums[i] if the run covers the whole window, else -1.
 * Dry Run: nums = [1, 2, 3, 4, 3, 2, 5], k = 3. Results [3, 4, -1, -1, -1].
 * Time Complexity: O(n)
 * Space Complexity: O(1) extra besides the answer array
 */
var resultsArray = function (nums, k) {
  const powers = [];
  let consecutiveStart = 0;

  for (let index = 0; index < nums.length; index++) {
    if (index > 0 && nums[index] !== nums[index - 1] + 1) {
      consecutiveStart = index;
    }
    if (index >= k - 1) {
      powers.push(index - consecutiveStart + 1 >= k ? nums[index] : -1);
    }
  }

  return powers;
};
