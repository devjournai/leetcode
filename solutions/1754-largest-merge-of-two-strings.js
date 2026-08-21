/**
 * Largest Merge Of Two Strings
 * Intuition: Merge like a greedy merge of two strings: always take the lexicographically larger remaining suffix's first character so the result is largest possible.
 * Approach: 1. While both remain, compare `word1.slice(pointerFirst)` vs `word2.slice(pointerSecond)` and take from the larger. 2. Append leftovers. 3. Return `mergedString`.
 * Dry Run: word1 = "cabaa", word2 = "bcaaa"
 * 'c'>='b' take c; "abaa" vs "bcaaa" take b; continue → "cbcabaaaaa".
 * Time Complexity: O((N + M)^2)
 * Space Complexity: O(N + M)
 */
var largestMerge = function (word1, word2) {
  let mergedString = "";
  let pointerFirst = 0;
  let pointerSecond = 0;

  while (pointerFirst < word1.length && pointerSecond < word2.length) {
    if (word1.slice(pointerFirst) >= word2.slice(pointerSecond)) {
      mergedString += word1[pointerFirst];
      pointerFirst++;
    } else {
      mergedString += word2[pointerSecond];
      pointerSecond++;
    }
  }

  mergedString += word1.slice(pointerFirst);
  mergedString += word2.slice(pointerSecond);

  return mergedString;
};
