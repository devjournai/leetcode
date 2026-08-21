/**
 * Minimum Removals to Balance Array
 * Intuition: After sorting, a balanced subarray is a window where max <= min * k. Minimize deletions by maximizing that window length.
 * Approach: 1. Sort nums. 2. Two pointers: advance right, move left while nums[right] > nums[left] * k. 3. Track max window length. 4. Return n - maxLen.
 * Dry Run: nums = [2, 1, 5], k = 2. Sorted [1, 2, 5]. Window [1, 2] length 2 (5 > 2*2). Removals 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minRemoval = function (nums, k) {
  nums.sort((a, b) => a - b);

  const n = nums.length;
  if (n <= 1) {
    return 0;
  }

  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < n; right++) {
    while (nums[right] > nums[left] * k) {
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return n - maxLen;
};
