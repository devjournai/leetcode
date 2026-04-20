/**
 * Set Mismatch
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findErrorNums = function (nums) {
  let arrayLength = nums.length;
  let calculatedSum = 0;
  let calculatedSumOfSquares = 0;

  for (let currentIdx = 0; currentIdx < arrayLength; currentIdx++) {
    calculatedSum += nums[currentIdx];
    calculatedSumOfSquares += nums[currentIdx] * nums[currentIdx];
  }

  let expectedTotalSum = (arrayLength * (arrayLength + 1)) / 2;
  let expectedTotalSumOfSquares =
    (arrayLength * (arrayLength + 1) * (2 * arrayLength + 1)) / 6;

  let differenceBetweenSums = calculatedSum - expectedTotalSum;
  let sumOfNumbersAandB =
    (calculatedSumOfSquares - expectedTotalSumOfSquares) /
    differenceBetweenSums;

  let duplicatedNumber = (differenceBetweenSums + sumOfNumbersAandB) / 2;
  let missingNumber = (sumOfNumbersAandB - differenceBetweenSums) / 2;

  return [duplicatedNumber, missingNumber];
};
