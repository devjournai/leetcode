/**
 * Longest Substring Of All Vowels In Order
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestBeautifulSubstring = function (word) {
  let maximumLengthFound = 0;
  let currentSegmentStartIndex = 0;
  let distinctOrderedVowelCount = 1;

  for (let scanIndex = 1; scanIndex < word.length; ++scanIndex) {
    let charBefore = word[scanIndex - 1];
    let charAtCurrent = word[scanIndex];

    if (charAtCurrent < charBefore) {
      currentSegmentStartIndex = scanIndex;
      distinctOrderedVowelCount = 1;
    } else if (charAtCurrent > charBefore) {
      distinctOrderedVowelCount++;
    }

    if (distinctOrderedVowelCount === 5) {
      let currentLength = scanIndex - currentSegmentStartIndex + 1;
      maximumLengthFound = Math.max(maximumLengthFound, currentLength);
    }
  }

  return maximumLengthFound;
};
