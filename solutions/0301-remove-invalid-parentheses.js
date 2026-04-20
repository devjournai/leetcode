/**
 * Remove Invalid Parentheses
 * Time Complexity: O(2^N * N)
 * Space Complexity: O(2^N * N)
 */
var removeInvalidParentheses = function (s) {
  const validResults = new Set();
  let minimumInvalidCount = Infinity;

  function findValidStrings(characterIndex, openParenthesesCount, closeParenthesesCount, invalidCharactersRemoved, currentBuiltString) {
    if (characterIndex === s.length) {
      if (openParenthesesCount === closeParenthesesCount) {
        if (invalidCharactersRemoved < minimumInvalidCount) {
          validResults.clear();
          minimumInvalidCount = invalidCharactersRemoved;
          validResults.add(currentBuiltString);
        } else if (invalidCharactersRemoved === minimumInvalidCount) {
          validResults.add(currentBuiltString);
        }
      }
      return;
    }

    const currentCharacter = s[characterIndex];

    if (currentCharacter !== '(' && currentCharacter !== ')') {
      findValidStrings(
        characterIndex + 1,
        openParenthesesCount,
        closeParenthesesCount,
        invalidCharactersRemoved,
        currentBuiltString + currentCharacter
      );
    } else {
      findValidStrings(
        characterIndex + 1,
        openParenthesesCount,
        closeParenthesesCount,
        invalidCharactersRemoved + 1,
        currentBuiltString
      );

      if (currentCharacter === '(') {
        findValidStrings(
          characterIndex + 1,
          openParenthesesCount + 1,
          closeParenthesesCount,
          invalidCharactersRemoved,
          currentBuiltString + '('
        );
      } else {
        if (closeParenthesesCount < openParenthesesCount) {
          findValidStrings(
            characterIndex + 1,
            openParenthesesCount,
            closeParenthesesCount + 1,
            invalidCharactersRemoved,
            currentBuiltString + ')'
          );
        }
      }
    }
  }

  findValidStrings(0, 0, 0, 0, '');

  return Array.from(validResults);
};