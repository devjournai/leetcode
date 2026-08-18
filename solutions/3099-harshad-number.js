/**
 * Harshad Number
 * Intuition: To determine if a number is a Harshad number, we first need to compute the sum of its digits. Once we have the sum, we can check if the original number is perfectly divisible by this sum.
 * Approach: 1. Initialize a variable to accumulate the sum of digits. 2. Create a temporary copy of the input number to extract digits without altering the original value. 3. Repeatedly extract the last digit of the temporary number using the modulo operator and add it to the sum. 4. Remove the last digit from the temporary number using integer division until the temporary number becomes zero. 5. After summing all digits, check if the original number is divisible by the calculated sum. 6. Return the sum if it's divisible, otherwise return -1.
 * Dry Run: For x = 18
 *   totalDigitSum = 0
 *   currentNumber = 18
 *   Loop 1: currentNumber (18) > 0. lastDigit = 18 % 10 = 8. totalDigitSum = 0 + 8 = 8. currentNumber = Math.floor(18 / 10) = 1.
 *   Loop 2: currentNumber (1) > 0. lastDigit = 1 % 10 = 1. totalDigitSum = 8 + 1 = 9. currentNumber = Math.floor(1 / 10) = 0.
 *   Loop ends as currentNumber (0) is not > 0.
 *   Check: x (18) % totalDigitSum (9) === 0. This is true (18 % 9 = 0).
 *   Return totalDigitSum (9).
 * Time Complexity: O(log x)
 * Space Complexity: O(1)
 */
var sumOfTheDigitsOfHarshadNumber = function (x) {
  let totalDigitSum = 0;
  let currentNumber = x;

  while (currentNumber > 0) {
    let lastDigit = currentNumber % 10;
    totalDigitSum += lastDigit;
    currentNumber = Math.floor(currentNumber / 10);
  }

  if (x % totalDigitSum === 0) {
    return totalDigitSum;
  } else {
    return -1;
  }
};
