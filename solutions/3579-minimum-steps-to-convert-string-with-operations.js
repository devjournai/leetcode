/**
 * Minimum Steps to Convert String with Operations
 * Intuition: Split word1 into contiguous segments. Each segment maps to the same slice of word2 either in order or reversed; mismatched pairs (a→b and b→a) share a swap, otherwise each mismatch is a replace. DP over split points.
 * Approach: 1. f[i] = min ops to convert word1[:i] to word2[:i]. 2. For each j < i, cost of segment [j, i) is calc(false) or 1+calc(true) for a reverse. 3. calc counts unmatched directed letter pairs.
 * Dry Run: word1 = "ab", word2 = "ba". One reverse of the whole string costs 1, cheaper than two replacements.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N)
 */
var minOperations = function (word1, word2) {
  const n = word1.length;
  const f = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  f[0] = 0;

  const calc = (left, right, reversed) => {
    const cnt = Array.from({ length: 26 }, () => Array(26).fill(0));
    let res = 0;
    for (let i = left; i <= right; i++) {
      const j = reversed ? right - (i - left) : i;
      const a = word1.charCodeAt(j) - 97;
      const b = word2.charCodeAt(i) - 97;
      if (a !== b) {
        if (cnt[b][a] > 0) {
          cnt[b][a]--;
        } else {
          cnt[a][b]++;
          res++;
        }
      }
    }
    return res;
  };

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const t = Math.min(calc(j, i - 1, false), 1 + calc(j, i - 1, true));
      f[i] = Math.min(f[i], f[j] + t);
    }
  }

  return f[n];
};
