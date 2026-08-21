/**
 * Replace All Digits With Characters
 * Intuition: Odd indices are digits that shift the previous letter. Walk every other character and replace it with the shifted letter.
 * Approach: 1. Split `s` into `transformedCharacters`. 2. For `currentIterationIndex` = 1, 3, 5, … call `deriveShiftedCharacter` with the previous letter and the digit. 3. Join and return.
 * Dry Run: s = "a1c1d1".
 *   - index 1: 'a'+1 → 'b'; index 3: 'c'+1 → 'd'; index 5: 'd'+1 → 'e'. Return "abcdef".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var replaceDigits = function (s) {
  const transformedCharacters = s.split("");

  for (
    let currentIterationIndex = 1;
    currentIterationIndex < s.length;
    currentIterationIndex += 2
  ) {
    transformedCharacters[currentIterationIndex] = deriveShiftedCharacter(
      s[currentIterationIndex - 1],
      s[currentIterationIndex]
    );
  }

  const finalOutput = transformedCharacters.join("");
  return finalOutput;

  function deriveShiftedCharacter(baseCharacter, shiftAmountChar) {
    const parsedShiftValue = parseInt(shiftAmountChar);
    const initialCharCode = baseCharacter.charCodeAt(0);
    const finalCharCode = initialCharCode + parsedShiftValue;
    const shiftedLetter = String.fromCharCode(finalCharCode);
    return shiftedLetter;
  }
};
