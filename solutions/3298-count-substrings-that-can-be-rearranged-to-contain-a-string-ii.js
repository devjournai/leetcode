/**
 * Count Substrings That Can Be Rearranged to Contain a String II
 * Intuition: Same as 3297 with larger n. Sliding-window multiset covering is still O(n): a window is valid iff it contains every character of word2 at least as often, and every extension of a valid window stays valid.
 * Approach:
 * 1. Need array of size 26 from word2; `required` = word2.length (counting multiplicity).
 * 2. Expand right; when a needed letter is taken, decrease `required`.
 * 3. While the window is valid, every index from `r` to n-1 forms a valid substring with current `l`; then increment `l`.
 * Dry Run: word1 = "abcabc", word2 = "abc"
 *   - First valid window ends at r=2 ("abc"). ans += 6-2=4, then shrink until invalid.
 *   - Continue; total 10 valid substrings.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var validSubstringCount = function (word1, word2) {
  let ans = 0;
  let required = word2.length;
  const count = Array(26).fill(0);

  for (const c of word2) count[c.charCodeAt(0) - 97]++;

  for (let l = 0, r = 0; r < word1.length; r++) {
    if (--count[word1.charCodeAt(r) - 97] >= 0) required--;

    while (required === 0) {
      ans += word1.length - r;
      if (++count[word1.charCodeAt(l++) - 97] > 0) required++;
    }
  }

  return ans;
};
