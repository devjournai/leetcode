/**
 * Index Pairs Of A String
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
