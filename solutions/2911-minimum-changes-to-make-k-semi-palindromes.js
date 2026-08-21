/**
 * Minimum Changes to Make K Semi-palindromes
 *
 * Intuition:
 * For every substring, we calculate the minimum number of changes
 * needed to make it a semi-palindrome.
 *
 * A substring of length len is a semi-palindrome if there exists
 * a divisor d of len such that every sequence of characters at
 * positions i, i + d, i + 2d, ... forms a palindrome.
 *
 * For a fixed divisor d, each sequence can be made a palindrome
 * independently. The cost is the number of mismatched character
 * pairs in those sequences.
 *
 * After calculating the cost for every substring, we use interval
 * DP to partition the complete string into exactly k parts.
 *
 * Approach:
 * 1. Precompute `cost[l][r]`:
 *    Minimum changes required to make s[l..r] a semi-palindrome.
 *
 * 2. For every substring:
 *    - Let len = r - l + 1.
 *    - Try every proper divisor d of len.
 *    - For every starting position from 0 to d - 1:
 *      compare characters at:
 *      start, start + d, start + 2d, ...
 *    - Count mismatched symmetric pairs.
 *
 * 3. Use DP:
 *    dp[group][end] = minimum changes needed to divide
 *    s[0..end-1] into exactly `group` semi-palindromes.
 *
 * 4. Transition:
 *    dp[group][end] =
 *      min(dp[group - 1][start] + cost[start][end - 1])
 *
 * Dry Run: s="abcac", k=2. Precompute cost[l][r] as min mismatches over proper divisors d. Then dp[group][end] = min of dp[group-1][start]+cost[start][end-1]; answer is dp[k][n].
 *
 * Time Complexity: O(N^4 + K * N^2)
 * Space Complexity: O(N^2)
 */
var minimumChanges = function (s, k) {
  const n = s.length;

  const cost = Array.from({ length: n }, () => Array(n).fill(Infinity));

  for (let len = 2; len <= n; len++) {
    for (let l = 0; l <= n - len; l++) {
      const r = l + len - 1;

      for (let d = 1; d < len; d++) {
        if (len % d !== 0) continue;

        let changes = 0;
        for (let offset = 0; offset < d; offset++) {
          let leftIdx = l + offset;
          let rightIdx = l + offset + Math.floor((len - 1 - offset) / d) * d;

          while (leftIdx < rightIdx) {
            if (s[leftIdx] !== s[rightIdx]) {
              changes++;
            }
            leftIdx += d;
            rightIdx -= d;
          }
        }
        cost[l][r] = Math.min(cost[l][r], changes);
      }
    }
  }

  const dp = Array.from({ length: k + 1 }, () => Array(n + 1).fill(Infinity));
  dp[0][0] = 0;

  for (let group = 1; group <= k; group++) {
    for (let end = 1; end <= n; end++) {
      for (let start = group - 1; start < end; start++) {
        if (dp[group - 1][start] === Infinity) continue;
        if (cost[start][end - 1] === Infinity) continue;

        dp[group][end] = Math.min(
          dp[group][end],
          dp[group - 1][start] + cost[start][end - 1]
        );
      }
    }
  }

  return dp[k][n];
};
