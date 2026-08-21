/**
 * Index Pairs Of A String
 * Intuition: Every word occurrence is some text substring. Enumerating all [i, j] slices and testing set membership lists every match in the required increasing-index order.
 * Approach: 1. Put words in a set. 2. For each start i and end j≥i, slice text[i..j]. 3. If the slice is in the set, append [i, j]. 4. Nested loops already emit pairs sorted by start then end.
 * Dry Run: text=ababa, words=[aba, ab]. Matches [0,1] ab, [0,2] aba, [2,3] ab, [2,4] aba.
 * Time Complexity: O(N^3 + W * L_max)
 * Space Complexity: O(N^2 + W * L_max)
 */
var indexPairs = function (text, words) {
  const collectedPairs = [];
  const wordDictionary = new Set(words);

  for (let outerIndex = 0; outerIndex < text.length; outerIndex++) {
    for (let innerIndex = outerIndex; innerIndex < text.length; innerIndex++) {
      const currentSubstr = text.slice(outerIndex, innerIndex + 1);
      if (wordDictionary.has(currentSubstr)) {
        collectedPairs.push([outerIndex, innerIndex]);
      }
    }
  }

  return collectedPairs;
};
