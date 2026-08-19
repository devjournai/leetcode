/**
 * Minimum Number of Valid Strings to Form Target I
 * Intuition: A valid piece is any prefix of any word. Covering `target` is like jumping along the string; always peel off the longest prefix of the remaining suffix that is a word-prefix. KMP LPS on `word + '#' + target` tells, for every prefix of `target`, the longest suffix of that prefix that matches a prefix of `word`. Greedy covering from the right of the unmatched prefix is optimal.
 * Approach:
 * 1. For each word, compute LPS of `word + '#' + target`.
 * 2. Let `unmatchedPrefix` start at `target.length`.
 * 3. While unmatched length > 0, take the max LPS value at index `word.length + unmatchedPrefix` over all words (longest word-prefix that is a suffix of the unmatched prefix).
 * 4. If that max is 0, covering is impossible (`-1`). Else subtract it and count one string.
 * Dry Run: words = ["abc","aaaaa","bcdef"], target = "aabcdabc"
 *   - Remaining "aabcdabc". Longest suffix that is a word prefix is "abc", peel 3. Remaining "aabcd".
 *   - Remaining "aabcd". Longest suffix prefix is "bcd" (from "bcdef"), peel 3. Remaining "aa".
 *   - Remaining "aa" is a prefix of "aaaaa", peel 2. Remaining empty.
 *   - Answer 3 ("aa" + "bcd" + "abc").
 * Time Complexity: O(sum(|word[i]| + |target|) over words, plus greedy steps)
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
        lpsList[i][words[i].length + unmatchedPrefix],
      );
    }

    if (maxMatchSuffix === 0) return -1;
    ans++;
    unmatchedPrefix -= maxMatchSuffix;
  }

  return ans;
};
