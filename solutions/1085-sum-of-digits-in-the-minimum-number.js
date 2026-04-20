/**
 * Sum Of Digits In The Minimum Number
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
