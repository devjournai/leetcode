/**
 * Sum Of Digits Of String After Convert
 * Intuition: Map letters to their 1-based alphabet positions (`a`→1 … `z`→26), concatenate, then `k` times replace the number by the sum of its digits.
 * Approach: 1. Build `assembledNumberString` from `charCodeAt(0)-96`. 2. Repeat `k` times: sum the digits of the current decimal string, then stringify that sum. 3. Return the last numeric sum.
 * Dry Run: s = "iiii", k = 1.
 *   - i→9 four times → "9999"
 *   - one transform: 9+9+9+9=36. Return 36.
 * Time Complexity: O(N + k)
 * Space Complexity: O(N)
 */
var getLucky = function (s, k) {
  let assembledNumberString = "";
  for (const characterOfS of s) {
    let charCodeValue = characterOfS.charCodeAt(0);
    let charPosition = (charCodeValue - 96).toString();
    assembledNumberString += charPosition;
  }

  let currentWorkingString = assembledNumberString;
  let finalOutcome = 0;
  let transformCounter = 0;

  while (transformCounter < k) {
    let currentSummingValue = 0;
    for (
      let digitIndex = 0;
      digitIndex < currentWorkingString.length;
      digitIndex++
    ) {
      let digitCharacter = currentWorkingString[digitIndex];
      let parsedDigit = parseInt(digitCharacter);
      currentSummingValue += parsedDigit;
    }

    currentWorkingString = currentSummingValue.toString();
    finalOutcome = currentSummingValue;
    transformCounter++;
  }

  return finalOutcome;
};
