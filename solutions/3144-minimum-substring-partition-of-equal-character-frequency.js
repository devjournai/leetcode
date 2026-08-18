/**
 * Minimum Substring Partition of Equal Character Frequency
 * Intuition: A balanced substring has every present character with the same frequency. The fewest such pieces is a classic prefix DP: try every balanced suffix of the current prefix.
 * Approach: 1. dp[i] = min partitions of s[0..i]. 2. For each i, expand j backward, counting letters. 3. When the window is balanced, set dp[i] = 1 + dp[j - 1] (or 1 if j is 0). 4. Return dp[n - 1].
 * Dry Run: s = "fabccddg"
 * - Balanced pieces "fab" (all freq 1), "ccdd" (c and d each freq 2), "g" give 3 partitions, which is optimal.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var minimumSubstringsInPartition = function (s) {
  const n = s.length;
  const dp = new Array(n).fill(n);

  const isBalanced = (count) => {
    let minFreq = 1001;
    let maxFreq = 0;
    for (const freq of count) {
      if (freq > 0) {
        minFreq = Math.min(minFreq, freq);
        maxFreq = Math.max(maxFreq, freq);
      }
    }
    return minFreq === maxFreq;
  };

  for (let i = 0; i < n; i++) {
    const count = new Array(26).fill(0);
    for (let j = i; j >= 0; j--) {
      count[s.charCodeAt(j) - 97]++;
      if (isBalanced(count)) {
        dp[i] = j > 0 ? Math.min(dp[i], 1 + dp[j - 1]) : 1;
      }
    }
  }

  return dp[n - 1];
};
