/**
 * Longest Balanced Subarray I
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var longestBalanced = function (nums) {
  let maxLength = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    const distinctEvens = new Set();
    const distinctOdds = new Set();
    for (let j = i; j < n; j++) {
      const num = nums[j];
      if (num % 2 === 0) {
        distinctEvens.add(num);
      } else {
        distinctOdds.add(num);
      }

      if (distinctEvens.size === distinctOdds.size) {
        maxLength = Math.max(maxLength, j - i + 1);
      }
    }
  }

  return maxLength;
};
