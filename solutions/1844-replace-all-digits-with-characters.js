/**
 * Replace All Digits With Characters
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
      s[currentIterationIndex],
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
