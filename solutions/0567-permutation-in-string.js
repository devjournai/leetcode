/**
 * Permutation In String
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var checkInclusion = function (s1, s2) {
  const getCharacterOffset = (charValue) =>
    charValue.charCodeAt(0) - "a".charCodeAt(0);

  const compareFrequencyMaps = (mapA, mapB) => {
    for (let charIndex = 0; charIndex < 26; charIndex++) {
      if (mapA[charIndex] !== mapB[charIndex]) {
        return false;
      }
    }
    return true;
  };

  const stringOneLength = s1.length;
  const stringTwoLength = s2.length;

  if (stringOneLength > stringTwoLength) {
    return false;
  }

  const firstStringCounts = new Array(26).fill(0);
  const currentWindowCounts = new Array(26).fill(0);

  for (
    let initialPopulateIndex = 0;
    initialPopulateIndex < stringOneLength;
    initialPopulateIndex++
  ) {
    firstStringCounts[getCharacterOffset(s1[initialPopulateIndex])]++;
    currentWindowCounts[getCharacterOffset(s2[initialPopulateIndex])]++;
  }

  for (
    let windowMoveIndex = 0;
    windowMoveIndex < stringTwoLength - stringOneLength;
    windowMoveIndex++
  ) {
    if (compareFrequencyMaps(firstStringCounts, currentWindowCounts)) {
      return true;
    }
    const charLeavingWindow = s2[windowMoveIndex];
    const charEnteringWindow = s2[windowMoveIndex + stringOneLength];

    currentWindowCounts[getCharacterOffset(charLeavingWindow)]--;
    currentWindowCounts[getCharacterOffset(charEnteringWindow)]++;
  }

  return compareFrequencyMaps(firstStringCounts, currentWindowCounts);
};
