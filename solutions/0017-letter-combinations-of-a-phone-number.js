/**
 * Letter Combinations Of A Phone Number
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
        currentStringAccumulator + selectedChar,
      );
    }
  };

  buildCombination(0, "");

  return collectedCombinations;
};
