/**
 * Shifting Letters
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var shiftingLetters = function (s, shifts) {
  const inputStringLength = s.length;
  const alphabetStartCode = "a".charCodeAt(0);

  const totalShiftPerPosition = new Array(inputStringLength);

  totalShiftPerPosition[inputStringLength - 1] =
    shifts[inputStringLength - 1] % 26;

  for (
    let reverseIndex = inputStringLength - 2;
    reverseIndex >= 0;
    reverseIndex--
  ) {
    const currentShiftDelta = shifts[reverseIndex];
    const nextPositionTotalShift = totalShiftPerPosition[reverseIndex + 1];
    totalShiftPerPosition[reverseIndex] =
      (currentShiftDelta + nextPositionTotalShift) % 26;
  }

  const outputCharacters = [];
  for (let forwardIndex = 0; forwardIndex < inputStringLength; forwardIndex++) {
    const originalCharacter = s.charCodeAt(forwardIndex);
    const zeroIndexedOriginal = originalCharacter - alphabetStartCode;
    const effectiveShift = totalShiftPerPosition[forwardIndex];

    const shiftedZeroIndexed = (zeroIndexedOriginal + effectiveShift) % 26;
    const finalCharacterCode = shiftedZeroIndexed + alphabetStartCode;
    outputCharacters.push(String.fromCharCode(finalCharacterCode));
  }

  return outputCharacters.join("");
};
