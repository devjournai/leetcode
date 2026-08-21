/**
 * Remove Invalid Parentheses
 * Intuition: Every parenthesis may be kept or dropped. Track open/close so ')' is only kept when it does not exceed '('. Among complete strings, keep those with the fewest drops (a Set).
 * Approach: 1. DFS index, open, close, removed, built. 2. End: if open===close, reset the set when removed is a new minimum, else add if it matches the minimum. 3. Non-paren chars always kept. 4. Parens: always try skip (removed+1); keep '(' always; keep ')' only if close<open. 5. Return Array.from(the set).
 * Dry Run: s="()())()".
 *   - Minimum removals=1. Valid strings "(())()" and "()()()".
 * Time Complexity: O(2^N * N)
 * Space Complexity: O(2^N * N)
 */
var removeInvalidParentheses = function (s) {
  const validResults = new Set();
  let minimumInvalidCount = Infinity;

  function findValidStrings(
    characterIndex,
    openParenthesesCount,
    closeParenthesesCount,
    invalidCharactersRemoved,
    currentBuiltString
  ) {
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

    if (currentCharacter !== "(" && currentCharacter !== ")") {
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

      if (currentCharacter === "(") {
        findValidStrings(
          characterIndex + 1,
          openParenthesesCount + 1,
          closeParenthesesCount,
          invalidCharactersRemoved,
          currentBuiltString + "("
        );
      } else {
        if (closeParenthesesCount < openParenthesesCount) {
          findValidStrings(
            characterIndex + 1,
            openParenthesesCount,
            closeParenthesesCount + 1,
            invalidCharactersRemoved,
            currentBuiltString + ")"
          );
        }
      }
    }
  }

  findValidStrings(0, 0, 0, 0, "");

  return Array.from(validResults);
};
