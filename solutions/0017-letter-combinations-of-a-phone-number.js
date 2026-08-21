/**
 * Letter Combinations Of A Phone Number
 * Intuition: Backtracking builds one character per digit from `digitToLettersMap`, appending every letter choice and collecting the string when `currentPosition` reaches the end.
 * Approach: 1. Return [] if `digits` is empty. 2. Recurse `buildCombination(currentPosition, currentStringAccumulator)`. 3. At `digits.length`, push the accumulator. 4. Otherwise loop letters of the current digit and recurse with position+1. 5. Start from (0, "") and return `collectedCombinations`.
 * Dry Run: digits = "23".
 *   - '2'→a then '3'→d,e,f → "ad","ae","af"; same for b and c. Return ["ad","ae","af","bd","be","bf","cd","ce","cf"].
 * Time Complexity: O(4^N * N)
 * Space Complexity: O(4^N * N)
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) {
    return [];
  }

  const digitToLettersMap = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const collectedCombinations = [];

  const buildCombination = (currentPosition, currentStringAccumulator) => {
    if (currentPosition === digits.length) {
      collectedCombinations.push(currentStringAccumulator);
      return;
    }

    const digitChar = digits[currentPosition];
    const availableCharacters = digitToLettersMap[digitChar];

    for (
      let charIndex = 0;
      charIndex < availableCharacters.length;
      charIndex++
    ) {
      const selectedChar = availableCharacters[charIndex];
      buildCombination(
        currentPosition + 1,
        currentStringAccumulator + selectedChar
      );
    }
  };

  buildCombination(0, "");

  return collectedCombinations;
};
