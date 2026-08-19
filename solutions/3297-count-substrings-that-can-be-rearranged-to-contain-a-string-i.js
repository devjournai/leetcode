/**
 * Count Substrings That Can Be Rearranged to Contain a String I
 * Intuition: word1[l..r] can be rearranged to contain word2 iff it includes at least the multiset of characters of word2. Once a window is valid, every longer window with the same L is valid, so we can count `n - r` at once and then shrink from the left.
 * Approach:
 * 1. `count[26]` starts as the need for word2; `required` is how many needed letters are still missing.
 * 2. Expand `r`. Decrement `count[c]`; if it was still needed (`>= 0` after decrement wait: if `--count >= 0` then we fulfilled a needed occurrence), decrease `required`.
 * 3. While `required === 0`, add `word1.length - r` (all suffixes from this valid window) and pop `word1[l]`, restoring need if a required letter is lost.
 * Dry Run: word1 = "bcca", word2 = "abc"
 *   - need a,b,c (required=3)
 *   - r=0 'b': required=2
 *   - r=1 'c': required=1
 *   - r=2 'c': extra c
 *   - r=3 'a': required=0. Window [0,3] is the whole string. ans += 4-3=1. Popping any left letter breaks the need. Answer 1.
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
