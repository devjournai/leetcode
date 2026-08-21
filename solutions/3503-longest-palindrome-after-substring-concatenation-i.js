/**
 * Longest Palindrome After Substring Concatenation I
 * Intuition: A palindrome is either entirely in s, entirely in t, or a matching prefix of s against a reversed suffix of t, optionally extended by a palindrome in the leftover of s or t.
 * Approach: 1. Precompute longest palindromic suffix lengths in s and prefix lengths in t. 2. DP dp[i][j] = longest palindrome using s[..i] matched to t[j..] when s[i]==t[j]. 3. Take max of standalone palindromes and dp plus an adjacent palindrome extension.
 * Dry Run: s = "a", t = "a". suffix/prefix length 1, match gives 2 → answer 2.
 * Time Complexity: O(|s| * |t|)
 * Space Complexity: O(|s| * |t|)
 */
var longestPalindrome = function (s, t) {
  const getPalindromeLengths = (str, isSuffix) => {
    const n = str.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(false));
    const lengths = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      for (let j = i; j < n; j++) {
        if (str[i] === str[j] && (j - i < 2 || dp[i + 1][j - 1])) {
          dp[i][j] = true;
          const index = isSuffix ? i : j;
          lengths[index] = Math.max(lengths[index], j - i + 1);
        }
      }
    }
    return lengths;
  };

  const m = s.length;
  const n = t.length;
  const suffix = getPalindromeLengths(s, true);
  const prefix = getPalindromeLengths(t, false);
  let answer = Math.max(Math.max(...suffix), Math.max(...prefix));
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = n - 1; j >= 0; j--) {
      if (s[i] === t[j]) {
        dp[i][j] = 2 + (i > 0 && j < n - 1 ? dp[i - 1][j + 1] : 0);
        const extend = Math.max(
          i + 1 < m ? suffix[i + 1] : 0,
          j > 0 ? prefix[j - 1] : 0
        );
        answer = Math.max(answer, dp[i][j] + extend);
      }
    }
  }

  return answer;
};
