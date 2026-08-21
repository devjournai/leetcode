/**
 * Count Substrings With K-Frequency Characters II
 * Intuition: Every substring is either "good" (some character appears at least k times) or "bad" (every character appears fewer than k times). Count all n(n+1)/2 substrings and subtract the bad ones with a sliding window that never lets any count reach k.
 * Approach: 1. ans = n*(n+1)/2. 2. Expand r, increment count[s[r]]. 3. While that count equals k, shrink from l. 4. Subtract the (r-l+1) windows ending at r that stay below k.
 * Dry Run: s = "abacb", k = 2. Total 15. After processing, remaining good substrings include those with two 'a's or two 'b's.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var numberOfSubstrings = function (s, k) {
  const n = s.length;
  let answer = (n * (n + 1)) / 2;
  const count = Array(26).fill(0);
  let left = 0;

  for (let right = 0; right < n; right++) {
    const charIndex = s.charCodeAt(right) - 97;
    count[charIndex]++;
    while (count[charIndex] === k) {
      count[s.charCodeAt(left) - 97]--;
      left++;
    }
    answer -= right - left + 1;
  }

  return answer;
};
