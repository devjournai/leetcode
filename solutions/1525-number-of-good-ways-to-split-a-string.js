/**
 * Number Of Good Ways To Split A String
 * Intuition: A split is good when distinct counts on left and right match. Prefix and suffix distinct arrays compare at each cut.
 * Approach: 1. Left-to-right set sizes into prefix[]. 2. Right-to-left into suffix[]. 3. Count i where prefix[i]==suffix[i+1].
 * Dry Run: s = "aacaba".
 *   - Good cuts at 2,3,4 → 3.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var numSplits = function (s) {
  const stringLength = s.length;

  const currentLeftDistinctCharacters = new Set();
  const prefixDistinctCountValues = new Array(stringLength);
  for (let iteratorLeft = 0; iteratorLeft < stringLength; iteratorLeft++) {
    const characterLeft = s[iteratorLeft];
    currentLeftDistinctCharacters.add(characterLeft);
    prefixDistinctCountValues[iteratorLeft] =
      currentLeftDistinctCharacters.size;
  }

  const currentRightDistinctCharacters = new Set();
  const suffixDistinctCountValues = new Array(stringLength);
  for (
    let iteratorRight = stringLength - 1;
    iteratorRight >= 0;
    iteratorRight--
  ) {
    const characterRight = s[iteratorRight];
    currentRightDistinctCharacters.add(characterRight);
    suffixDistinctCountValues[iteratorRight] =
      currentRightDistinctCharacters.size;
  }

  let goodSplitsTally = 0;
  for (
    let splitPosition = 0;
    splitPosition < stringLength - 1;
    splitPosition++
  ) {
    const countForLeftPart = prefixDistinctCountValues[splitPosition];
    const countForRightPart = suffixDistinctCountValues[splitPosition + 1];
    if (countForLeftPart === countForRightPart) {
      goodSplitsTally++;
    }
  }

  return goodSplitsTally;
};
