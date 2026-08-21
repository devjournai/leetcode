/**
 * Count Substrings With K-Frequency Characters I
 * Intuition: Count all substrings minus those where every character appears fewer than k times. A sliding window that never lets any count reach k enumerates the latter.
 * Approach: 1. Start with n*(n+1)/2. 2. Expand r, increment count[s[r]]. 3. While that count equals k, shrink l. 4. Subtract the number of windows ending at r with all frequencies < k.
 * Dry Run: s = "abacb", k = 2
 *   - Substrings with some letter at least twice: "aba", "abac", "abacb", "bacb", "ab" is not (each once)... sample answer 4
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfSubstrings = function (s, k) {
  const n = s.length;
  let ans = (n * (n + 1)) / 2;
  const count = Array(26).fill(0);
  let l = 0;

  for (let r = 0; r < n; r++) {
    const c = s.charCodeAt(r) - 97;
    count[c]++;
    while (count[c] === k) {
      count[s.charCodeAt(l) - 97]--;
      l++;
    }
    ans -= r - l + 1;
  }

  return ans;
};
