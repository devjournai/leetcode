/**
 * Check If Number Has Equal Digit Count And Digit Value
 * Intuition: The problem requires checking two conditions simultaneously for each index 'i': the digit 'i' must appear in the string 'num' exactly 'num[i]' times. This suggests a two-step process: first, count the occurrences of each digit (0-9) within 'num', and second, iterate through 'num' to verify if the actual count of digit 'i' matches the numeric value of the character at 'num[i]'.
 * Approach: 1. Initialize an array, `digitFrequencyCounts`, of size 10 with all elements set to zero, to store the frequencies of digits 0 through 9. 2. Iterate through each `characterFromNum` in the input string `num`. Convert `characterFromNum` to its numeric `digitValueFromChar` and increment the count at `digitFrequencyCounts[digitValueFromChar]`. 3. Initialize a second loop with a counter `checkPosition` from 0 up to, but not including, the length of `num`. 4. Inside this loop, get the character `expectedDigitCountCharacter` from `num[checkPosition]` and convert it to its numeric `requiredDigitCountNumber`. 5. Retrieve the `actualDigitOccurrences` of the digit `checkPosition` from `digitFrequencyCounts[checkPosition]`. 6. Compare `actualDigitOccurrences` with `requiredDigitCountNumber`. If they are not equal, immediately return `false`. 7. If the second loop completes without returning `false`, it means all conditions are met, so return `true`.
 * Dry Run: num = "1210"
 * 1. `digitFrequencyCounts` is initialized to `[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`.
 * 2. First loop (counting frequencies):
 *    - `characterFromNum = '1'`, `digitValueFromChar = 1`. `digitFrequencyCounts` becomes `[0, 1, 0, 0, 0, 0, 0, 0, 0, 0]`.
 *    - `characterFromNum = '2'`, `digitValueFromChar = 2`. `digitFrequencyCounts` becomes `[0, 1, 1, 0, 0, 0, 0, 0, 0, 0]`.
 *    - `characterFromNum = '1'`, `digitValueFromChar = 1`. `digitFrequencyCounts` becomes `[0, 2, 1, 0, 0, 0, 0, 0, 0, 0]`.
 *    - `characterFromNum = '0'`, `digitValueFromChar = 0`. `digitFrequencyCounts` becomes `[1, 2, 1, 0, 0, 0, 0, 0, 0, 0]`.
 *    After this loop, `digitFrequencyCounts` is `[1, 2, 1, 0, 0, 0, 0, 0, 0, 0]`.
 * 3. Second loop (checking conditions):
 *    - `checkPosition = 0`:
 *      - `expectedDigitCountCharacter = num[0] = '1'`. `requiredDigitCountNumber = 1`.
 *      - `actualDigitOccurrences = digitFrequencyCounts[0] = 1`.
 *      - `actualDigitOccurrences (1) === requiredDigitCountNumber (1)`. Condition holds.
 *    - `checkPosition = 1`:
 *      - `expectedDigitCountCharacter = num[1] = '2'`. `requiredDigitCountNumber = 2`.
 *      - `actualDigitOccurrences = digitFrequencyCounts[1] = 2`.
 *      - `actualDigitOccurrences (2) === requiredDigitCountNumber (2)`. Condition holds.
 *    - `checkPosition = 2`:
 *      - `expectedDigitCountCharacter = num[2] = '1'`. `requiredDigitCountNumber = 1`.
 *      - `actualDigitOccurrences = digitFrequencyCounts[2] = 1`.
 *      - `actualDigitOccurrences (1) === requiredDigitCountNumber (1)`. Condition holds.
 *    - `checkPosition = 3`:
 *      - `expectedDigitCountCharacter = num[3] = '0'`. `requiredDigitCountNumber = 0`.
 *      - `actualDigitOccurrences = digitFrequencyCounts[3] = 0`.
 *      - `actualDigitOccurrences (0) === requiredDigitCountNumber (0)`. Condition holds.
 * 4. The second loop completes. Return `true`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var digitCount = function (num) {
  const digitFrequencyCounts = new Array(10).fill(0);

  for (const characterFromNum of num) {
    const digitValueFromChar = Number(characterFromNum);
    digitFrequencyCounts[digitValueFromChar]++;
  }

  for (let checkPosition = 0; checkPosition < num.length; checkPosition++) {
    const expectedDigitCountCharacter = num[checkPosition];
    const requiredDigitCountNumber = Number(expectedDigitCountCharacter);
    const actualDigitOccurrences = digitFrequencyCounts[checkPosition];

    if (actualDigitOccurrences !== requiredDigitCountNumber) {
      return false;
    }
  }

  return true;
};
