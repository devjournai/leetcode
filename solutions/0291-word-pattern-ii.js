/**
 * Word Pattern II
 * Time Complexity: O(pattern.length * s.length * s.length^pattern.length)
 * Space Complexity: O(pattern.length * s.length)
 */
var wordPatternMatch = function (pattern, s) {
  const charToStringMap = new Map();
  const mappedSubstringsSet = new Set();
  const patternLength = pattern.length;
  const stringLength = s.length;

  function backtrackMatch(patternCurrentIndex, stringCurrentIndex) {
    if (
      patternCurrentIndex === patternLength &&
      stringCurrentIndex === stringLength
    ) {
      return true;
    }
    if (
      patternCurrentIndex === patternLength ||
      stringCurrentIndex === stringLength
    ) {
      return false;
    }

    const currentPatternChar = pattern[patternCurrentIndex];

    if (charToStringMap.has(currentPatternChar)) {
      const assignedString = charToStringMap.get(currentPatternChar);
      if (!s.startsWith(assignedString, stringCurrentIndex)) {
        return false;
      }
      return backtrackMatch(
        patternCurrentIndex + 1,
        stringCurrentIndex + assignedString.length,
      );
    }

    for (
      let substringEndIndex = stringCurrentIndex + 1;
      substringEndIndex <= stringLength;
      substringEndIndex++
    ) {
      const potentialSubstring = s.substring(
        stringCurrentIndex,
        substringEndIndex,
      );

      if (mappedSubstringsSet.has(potentialSubstring)) {
        continue;
      }

      charToStringMap.set(currentPatternChar, potentialSubstring);
      mappedSubstringsSet.add(potentialSubstring);

      const matchFound = backtrackMatch(
        patternCurrentIndex + 1,
        stringCurrentIndex + potentialSubstring.length,
      );
      if (matchFound) {
        return true;
      }

      charToStringMap.delete(currentPatternChar);
      mappedSubstringsSet.delete(potentialSubstring);
    }

    return false;
  }

  return backtrackMatch(0, 0);
};
