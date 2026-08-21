/**
 * Longest Substring Of All Vowels In Order
 * Intuition: A beautiful substring is a nondecreasing run of vowels that contains all five letters a..u. Reset when a letter decreases; count distinct increases; when the count hits 5 the current run is beautiful.
 * Approach: 1. Track `currentSegmentStartIndex` and `distinctOrderedVowelCount`. 2. On a decrease, restart the segment. 3. On a strict increase, increment the distinct count. 4. When count is 5, update `maximumLengthFound`.
 * Dry Run: word = "aeiaaioaaaaeiiiiouuuuuaaeeiou".
 *   - A later "aaaaeiiiiouuuuu" has all five in order length 13. Return 13.
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
