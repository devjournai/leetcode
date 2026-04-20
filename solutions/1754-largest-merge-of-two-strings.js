/**
 * Largest Merge Of Two Strings
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
