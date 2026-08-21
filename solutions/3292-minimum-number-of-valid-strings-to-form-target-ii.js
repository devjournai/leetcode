/**
 * Minimum Number of Valid Strings to Form Target II
 * Intuition: Same problem as 3291 with larger limits. A valid string is still a prefix of some word. Greedy longest-prefix covers from the unmatched end remain optimal; KMP LPS of `word + '#' + target` answers longest word-prefix / target-prefix suffix queries in O(1) after preprocess.
 * Approach:
 * 1. Precompute LPS for every `word + '#' + target`.
 * 2. Repeatedly subtract the longest suffix of the remaining unmatched prefix that is a prefix of some word.
 * 3. If some remainder has no positive match, return -1; else the number of peels is the answer.
 * Dry Run: words = ["abababab","ab"], target = "ababaababa"
 *   - Remaining "ababaababa". Longest suffix that is a word prefix is "ababa" (prefix of "abababab"), peel 5. Remaining "ababa".
 *   - Remaining "ababa" peels another 5. Remaining empty.
 *   - Answer 2. If a remainder has LPS 0 for every word, return -1.
 * Time Complexity: O(sum(|word[i]| + |target|))
 * Space Complexity: O(sum(|word[i]| + |target|))
 */
var minValidStrings = function (words, target) {
  const getLPS = (pattern) => {
    const lps = Array(pattern.length).fill(0);

    for (let i = 1, j = 0; i < pattern.length; i++) {
      while (j > 0 && pattern[j] !== pattern[i]) j = lps[j - 1];
      if (pattern[i] === pattern[j]) lps[i] = ++j;
    }

    return lps;
  };

  let ans = 0;
  let unmatchedPrefix = target.length;
  const lpsList = words.map((word) => getLPS(word + "#" + target));

  while (unmatchedPrefix > 0) {
    let maxMatchSuffix = 0;

    for (let i = 0; i < words.length; i++) {
      maxMatchSuffix = Math.max(
        maxMatchSuffix,
        lpsList[i][words[i].length + unmatchedPrefix]
      );
    }

    if (maxMatchSuffix === 0) return -1;
    ans++;
    unmatchedPrefix -= maxMatchSuffix;
  }

  return ans;
};
