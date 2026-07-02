/**
 * Alternating Digit Sum
 * Intuition: The problem requires processing digits from most significant to least significant, applying alternating signs starting with positive. Converting the number to a string allows direct iteration from left to right, simplifying sign application.
 * Approach: 1. Convert the input number `n` into its string representation. 2. Initialize a running sum `totalSummation` to zero and a sign multiplier `signFactor` to 1. 3. Iterate through each character of the string. For each character, convert it back to a number. 4. Add `(numerical digit * signFactor)` to `totalSummation`. 5. Flip `signFactor` (multiply by -1) for the next digit. 6. After iterating through all digits, return `totalSummation`.
 * Dry Run: n = 521
 * 1. numString = "521"
 * 2. totalSummation = 0, signFactor = 1
 * 3. Loop:
 *    - index = 0: charDigit = '5', digitValue = 5. totalSummation = 0 + (5 * 1) = 5. signFactor = -1.
 *    - index = 1: charDigit = '2', digitValue = 2. totalSummation = 5 + (2 * -1) = 3. signFactor = 1.
 *    - index = 2: charDigit = '1', digitValue = 1. totalSummation = 3 + (1 * 1) = 4. signFactor = -1.
 * 4. Loop ends.
 * 5. Return 4.
 * Time Complexity: O(log10(n))
 * Space Complexity: O(log10(n))
 */
var alternateDigitSum = function (n) {
  const numString = n.toString();
  let totalSummation = 0;
  let signFactor = 1;

  for (
    let currentDigitIndex = 0;
    currentDigitIndex < numString.length;
    currentDigitIndex++
  ) {
    const charRepresentation = numString[currentDigitIndex];
    const digitValue = parseInt(charRepresentation);
    totalSummation += digitValue * signFactor;
    signFactor *= -1;
  }

  return totalSummation;
};
