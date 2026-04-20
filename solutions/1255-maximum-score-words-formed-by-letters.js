/**
 * Maximum Score Words Formed By Letters
 * Time Complexity: O(2^N * L + M)
 * Space Complexity: O(N + Alpha)
 */
var maxScoreWords = function (words, letters, score) {
  const initialLettersFrequency = new Array(26).fill(0);
  let letterCharacterElement;
  let charCodeAlphabetIndex;

  for (letterCharacterElement of letters) {
    charCodeAlphabetIndex = letterCharacterElement.charCodeAt(0) - 97;
    initialLettersFrequency[charCodeAlphabetIndex]++;
  }

  const findMaximumPossibleScore = (
    currentWordPosition,
    currentLetterAvailability,
  ) => {
    if (currentWordPosition === words.length) {
      return 0;
    }

    const scoreFromSkippingCurrentWord = findMaximumPossibleScore(
      currentWordPosition + 1,
      currentLetterAvailability,
    );

    const targetWordForEvaluation = words[currentWordPosition];
    const temporaryLetterStateCopy = [...currentLetterAvailability];
    let wordConstructionPossible = true;
    let accumulatedWordScore = 0;
    let singleWordCharacter;
    let wordCharAlphaPosition;

    for (singleWordCharacter of targetWordForEvaluation) {
      wordCharAlphaPosition = singleWordCharacter.charCodeAt(0) - 97;
      if (temporaryLetterStateCopy[wordCharAlphaPosition] === 0) {
        wordConstructionPossible = false;
        break;
      }
      temporaryLetterStateCopy[wordCharAlphaPosition]--;
      accumulatedWordScore += score[wordCharAlphaPosition];
    }

    let scoreFromTakingCurrentWord = 0;
    if (wordConstructionPossible) {
      scoreFromTakingCurrentWord =
        accumulatedWordScore +
        findMaximumPossibleScore(
          currentWordPosition + 1,
          temporaryLetterStateCopy,
        );
    }

    return Math.max(scoreFromSkippingCurrentWord, scoreFromTakingCurrentWord);
  };

  const finalComputedScore = findMaximumPossibleScore(
    0,
    initialLettersFrequency,
  );
  return finalComputedScore;
};
