/**
 * Verbal Arithmetic Puzzle
 * Intuition: Cryptarithm is unique digit assignment. Search column by column from the ones place, assigning unused digits and matching the result digit plus carry.
 * Approach: 1. Reject addends longer than the result; record leading letters that cannot be 0. 2. Recurse on (column, wordIndex, carry): skip short words, reuse or try digits 0–9. 3. After all words in a column, the ones digit of the sum must match the result letter (assign if free). 4. Recurse with carry/10; succeed when past the last column with carry 0.
 * Dry Run: words = ["SEND","MORE"], result = "MONEY". Column search assigns unique digits (e.g. 9567+1085=10652) and returns true.
 * Time Complexity: O(P(10, C) * L * W)
 * Space Complexity: O(L * W + C)
 */
var isSolvable = function (words, result) {
  const characterToDigitMapping = new Map();
  const digitInUseSet = new Set();
  const noZeroStartCharacters = new Set();

  const maxResultLength = result.length;

  for (const wordsArrayItem of words) {
    if (wordsArrayItem.length > maxResultLength) {
      return false;
    }
    if (wordsArrayItem.length > 1) {
      noZeroStartCharacters.add(wordsArrayItem[0]);
    }
  }

  if (maxResultLength > 1) {
    noZeroStartCharacters.add(result[0]);
  }

  function exploreEquation(
    currentColumnPosition,
    currentWordArrayIndex,
    accumulatedCarrySum
  ) {
    if (currentColumnPosition === maxResultLength) {
      return accumulatedCarrySum === 0;
    }

    if (currentWordArrayIndex < words.length) {
      const processingWord = words[currentWordArrayIndex];
      const currentWordLength = processingWord.length;

      if (currentColumnPosition >= currentWordLength) {
        return exploreEquation(
          currentColumnPosition,
          currentWordArrayIndex + 1,
          accumulatedCarrySum
        );
      }

      const specificChar =
        processingWord[currentWordLength - 1 - currentColumnPosition];

      if (characterToDigitMapping.has(specificChar)) {
        const assignedNumber = characterToDigitMapping.get(specificChar);
        return exploreEquation(
          currentColumnPosition,
          currentWordArrayIndex + 1,
          accumulatedCarrySum + assignedNumber
        );
      } else {
        const startDigitValue = noZeroStartCharacters.has(specificChar) ? 1 : 0;
        for (
          let chosenDigit = startDigitValue;
          chosenDigit <= 9;
          chosenDigit++
        ) {
          if (digitInUseSet.has(chosenDigit)) {
            continue;
          }

          digitInUseSet.add(chosenDigit);
          characterToDigitMapping.set(specificChar, chosenDigit);

          if (
            exploreEquation(
              currentColumnPosition,
              currentWordArrayIndex + 1,
              accumulatedCarrySum + chosenDigit
            )
          ) {
            return true;
          }

          characterToDigitMapping.delete(specificChar);
          digitInUseSet.delete(chosenDigit);
        }
        return false;
      }
    } else {
      const targetDigit = accumulatedCarrySum % 10;
      const resultCharForPosition =
        result[maxResultLength - 1 - currentColumnPosition];

      if (characterToDigitMapping.has(resultCharForPosition)) {
        const existingDigitForChar = characterToDigitMapping.get(
          resultCharForPosition
        );
        if (existingDigitForChar !== targetDigit) {
          return false;
        }
        return exploreEquation(
          currentColumnPosition + 1,
          0,
          (accumulatedCarrySum - targetDigit) / 10
        );
      } else {
        const isLeadingZeroForbiddenHere =
          currentColumnPosition === maxResultLength - 1 &&
          maxResultLength > 1 &&
          targetDigit === 0;
        if (digitInUseSet.has(targetDigit) || isLeadingZeroForbiddenHere) {
          return false;
        }

        characterToDigitMapping.set(resultCharForPosition, targetDigit);
        digitInUseSet.add(targetDigit);

        const successfulAdvance = exploreEquation(
          currentColumnPosition + 1,
          0,
          (accumulatedCarrySum - targetDigit) / 10
        );

        characterToDigitMapping.delete(resultCharForPosition);
        digitInUseSet.delete(targetDigit);

        return successfulAdvance;
      }
    }
  }

  return exploreEquation(0, 0, 0);
};
