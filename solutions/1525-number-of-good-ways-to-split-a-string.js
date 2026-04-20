/**
 * Number Of Good Ways To Split A String
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
