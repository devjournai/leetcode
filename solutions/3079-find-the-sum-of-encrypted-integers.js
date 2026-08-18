/**
 * Find The Sum Of Encrypted Integers
 * Intuition: The core idea is to process each number individually by first identifying its largest digit and its total digit count. Then, construct the encrypted number by repeating the largest digit for the determined count. The final step is to accumulate these encrypted values.
 * Approach: 1. Initialize a variable `totalSum` to accumulate encrypted values. 2. Iterate through each `currentNumber` in the input array `nums`. 3. For each `currentNumber`, determine `highestDigitFound` and `digitCounter`. This is done by repeatedly extracting the last digit, updating `highestDigitFound`, and incrementing `digitCounter` until the `currentNumber` becomes zero, using a temporary variable `temporaryValue`. 4. Construct the `calculatedEncryptedResult` using the `highestDigitFound` and `digitCounter` with a mathematical formula: `highestDigitFound * (10^digitCounter - 1) / 9`. This efficiently creates a number like 555 from max digit 5 and count 3. 5. Add `calculatedEncryptedResult` to `totalSum`. 6. Return `totalSum`.
 * Dry Run: nums = [10, 25]
 * 1. totalSum = 0
 * 2. Process currentNumber = 10:
 *    a. temporaryValue = 10, highestDigitFound = 0, digitCounter = 0
 *    b. Loop 1: extractedDigit = 0, highestDigitFound = max(0,0)=0, temporaryValue = 1, digitCounter = 1
 *    c. Loop 2: extractedDigit = 1, highestDigitFound = max(0,1)=1, temporaryValue = 0, digitCounter = 2
 *    d. calculatedEncryptedResult = 1 * (Math.pow(10, 2) - 1) / 9 = 1 * (100 - 1) / 9 = 1 * 99 / 9 = 11
 *    e. totalSum = 0 + 11 = 11
 * 3. Process currentNumber = 25:
 *    a. temporaryValue = 25, highestDigitFound = 0, digitCounter = 0
 *    b. Loop 1: extractedDigit = 5, highestDigitFound = max(0,5)=5, temporaryValue = 2, digitCounter = 1
 *    c. Loop 2: extractedDigit = 2, highestDigitFound = max(5,2)=5, temporaryValue = 0, digitCounter = 2
 *    d. calculatedEncryptedResult = 5 * (Math.pow(10, 2) - 1) / 9 = 5 * (100 - 1) / 9 = 5 * 99 / 9 = 55
 *    e. totalSum = 11 + 55 = 66
 * 4. Return 66.
 * Time Complexity: O(N * D)
 * Space Complexity: O(1)
 */
var sumOfEncryptedInt = function (nums) {
  let totalSum = 0;

  for (const currentNumber of nums) {
    let highestDigitFound = 0;
    let digitCounter = 0;
    let temporaryValue = currentNumber;

    while (temporaryValue > 0) {
      let extractedDigit = temporaryValue % 10;
      highestDigitFound = Math.max(highestDigitFound, extractedDigit);
      temporaryValue = Math.floor(temporaryValue / 10);
      digitCounter++;
    }

    let calculatedEncryptedResult =
      (highestDigitFound * (Math.pow(10, digitCounter) - 1)) / 9;
    totalSum += calculatedEncryptedResult;
  }

  return totalSum;
};
