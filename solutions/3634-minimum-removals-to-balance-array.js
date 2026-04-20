/**
 * Minimum Removals to Balance Array
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
