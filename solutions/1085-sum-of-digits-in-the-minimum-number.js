/**
 * Sum Of Digits In The Minimum Number
 * Intuition: Only the minimum array value matters. Its digit sum’s parity decides the answer: even → 1, odd → 0.
 * Approach: 1. Find min(nums). 2. Repeatedly add n%10 and divide by 10. 3. Return 1 if the sum is even, else 0.
 * Dry Run: nums=[34,23,1,24,75,33,54,8]. Min 1, digit sum 1 (odd) → 0.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var sumOfDigits = function (nums) {
  let smallestNumber = Math.min(...nums);

  let totalDigitSum = 0;
  let currentNumberProcessor = smallestNumber;

  while (currentNumberProcessor > 0) {
    let lastDigit = currentNumberProcessor % 10;
    totalDigitSum += lastDigit;
    currentNumberProcessor = Math.floor(currentNumberProcessor / 10);
  }

  let finalResult;
  if (totalDigitSum % 2 === 0) {
    finalResult = 1;
  } else {
    finalResult = 0;
  }

  return finalResult;
};
