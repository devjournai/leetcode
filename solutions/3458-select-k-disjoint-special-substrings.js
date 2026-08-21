/**
 * Select K Disjoint Special Substrings
 * Intuition: A special substring contains every occurrence of the letters inside it and is not the whole string. Each letter’s first/last span expands to a closed interval; those intervals are candidates we can pack with DP.
 * Approach: 1. Record first and last index of each letter, in first-seen order. 2. For each letter, expand `[first, last]` over letters that appear inside it. 3. `dp[i+1]` is the max number of disjoint specials covering `s[0..i]`. If `i` is the end of letter `a`’s interval and the interval is not the full string, take `max(dp[i], 1 + dp[first[a]])`. 4. Return `dp[n] >= k`.
 * Dry Run: s = "abcdbaefba", k = 2. Letter intervals close into several proper specials (e.g. around inner repeats). DP can select at least two disjoint ones → true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxSubstringLength = function (s, k) {
  const n = s.length;
  const firstIndex = new Array(26).fill(n);
  const lastIndex = new Array(26).fill(-1);
  const seenOrder = [];
  const dp = new Array(n + 1).fill(0);

  for (let index = 0; index < n; index++) {
    const letter = s.charCodeAt(index) - 97;
    if (firstIndex[letter] === n) {
      firstIndex[letter] = index;
      seenOrder.push(s[index]);
    }
    lastIndex[letter] = index;
  }

  for (const character of seenOrder) {
    const letter = character.charCodeAt(0) - 97;
    for (let index = firstIndex[letter]; index < lastIndex[letter]; index++) {
      const innerLetter = s.charCodeAt(index) - 97;
      firstIndex[letter] = Math.min(
        firstIndex[letter],
        firstIndex[innerLetter]
      );
      lastIndex[letter] = Math.max(lastIndex[letter], lastIndex[innerLetter]);
    }
  }

  for (let index = 0; index < n; index++) {
    const letter = s.charCodeAt(index) - 97;
    if (
      lastIndex[letter] !== index ||
      (firstIndex[letter] === 0 && index === n - 1)
    ) {
      dp[index + 1] = dp[index];
    } else {
      dp[index + 1] = Math.max(dp[index], 1 + dp[firstIndex[letter]]);
    }
  }

  return dp[n] >= k;
};
