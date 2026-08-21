/**
 * Shifting Letters
 * Intuition: Operation i shifts s[0..i] by shifts[i], so index j gets sum(shifts[j..n-1]) mod 26. Suffix-sum the shifts from the right, then rotate each letter.
 * Approach: 1. `totalShiftPerPosition[n-1] = shifts[n-1]%26`. 2. For i from n-2 down: `(shifts[i] + next)%26`. 3. For each char, `(code-'a' + shift)%26 + 'a'`. Join.
 * Dry Run: s="abc", shifts=[3,5,9]. Suffix mods [17,14,9]. a+17=r, b+14=p, c+9=l → "rpl".
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
