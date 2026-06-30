/**
 * Count The Digits That Divide A Number
 * Intuition: To check each digit, we need to extract them one by one. The last digit can be obtained using the modulo operator, and the number can be truncated using integer division. We must preserve the original number to perform the division check.
 * Approach: 1. Initialize a counter for digits that satisfy the condition. 2. Store the original number in a separate variable to be used for modulo checks. 3. Iterate through the digits of the number using a for loop, extracting the last digit in each step. 4. For each extracted digit, check if the original number is perfectly divisible by it (and that the digit is not zero to avoid division by zero, though problem constraints typically prevent this for digits of a number). 5. If divisible, increment the counter. 6. Return the final count.
 * Dry Run: num = 121
 *   digitCount = 0
 *   originalNumber = 121
 *   Iteration 1: currentValue = 121
 *     extractedDigit = 121 % 10 = 1
 *     originalNumber % extractedDigit (121 % 1) === 0 is true.
 *     digitCount becomes 1.
 *     currentValue becomes Math.floor(121 / 10) = 12.
 *   Iteration 2: currentValue = 12
 *     extractedDigit = 12 % 10 = 2
 *     originalNumber % extractedDigit (121 % 2) === 0 is false.
 *     digitCount remains 1.
 *     currentValue becomes Math.floor(12 / 10) = 1.
 *   Iteration 3: currentValue = 1
 *     extractedDigit = 1 % 10 = 1
 *     originalNumber % extractedDigit (121 % 1) === 0 is true.
 *     digitCount becomes 2.
 *     currentValue becomes Math.floor(1 / 10) = 0.
 *   Loop terminates as currentValue is 0.
 *   Return digitCount = 2.
 * Time Complexity: O(log10(num))
 * Space Complexity: O(1)
 */
var countDigits = function (num) {
  let digitCount = 0;
  let originalNumber = num;

  for (
    let currentValue = num;
    currentValue > 0;
    currentValue = Math.floor(currentValue / 10)
  ) {
    let extractedDigit = currentValue % 10;
    if (originalNumber % extractedDigit === 0) {
      digitCount++;
    }
  }

  return digitCount;
};
