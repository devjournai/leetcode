/**
 * Find Words That Can Be Formed By Characters
 * Time Complexity: O(L + N * M)
 * Space Complexity: O(1)
 */
var countCharacters = function (words, chars) {
  const sourceCharacterCounts = new Map();
  for (
    let charIndexInSource = 0;
    charIndexInSource < chars.length;
    charIndexInSource++
  ) {
    const singleSourceChar = chars[charIndexInSource];
    sourceCharacterCounts.set(
      singleSourceChar,
      (sourceCharacterCounts.get(singleSourceChar) || 0) + 1,
    );
  }

  const finalSumOfLengths = words.reduce(
    (accumulatedGoodLength, nextWordCandidate) => {
      const currentWordCharacterMap = new Map(sourceCharacterCounts);
      let validFormationFlag = true;

      let wordCharPosition = 0;
      while (wordCharPosition < nextWordCandidate.length) {
        const letterForValidation = nextWordCandidate[wordCharPosition];
        if (
          !currentWordCharacterMap.has(letterForValidation) ||
          currentWordCharacterMap.get(letterForValidation) === 0
        ) {
          validFormationFlag = false;
          break;
        }
        currentWordCharacterMap.set(
          letterForValidation,
          currentWordCharacterMap.get(letterForValidation) - 1,
        );
        wordCharPosition++;
      }

      return validFormationFlag
        ? accumulatedGoodLength + nextWordCandidate.length
        : accumulatedGoodLength;
    },
    0,
  );

  return finalSumOfLengths;
};
