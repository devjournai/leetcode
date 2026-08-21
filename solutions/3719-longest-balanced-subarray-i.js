/**
 * Longest Balanced Subarray I
 * Intuition: A subarray is balanced when it has equally many distinct even and distinct odd values. Expand from each start with two Sets.
 * Approach: 1. For each i, clear even/odd Sets. 2. For j from i to n-1 insert nums[j] by parity. 3. If sizes match, update max length.
 * Dry Run: nums = [2, 3, 2]. [0,1] even{2} odd{3} length 2; [0,2] still 1 vs 1 length 3. Answer 3.
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
