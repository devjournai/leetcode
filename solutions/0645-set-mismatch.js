/**
 * Set Mismatch
 * Intuition: If duplicate is d and missing is m, then Σnums − Σ[1..n] = d−m and Σsquares − expectedSquares = d²−m² = (d−m)(d+m). Solve the 2×2 system.
 * Approach: 1. Accumulate `calculatedSum` and `calculatedSumOfSquares`. 2. Expected sum n(n+1)/2 and squares n(n+1)(2n+1)/6. 3. `differenceBetweenSums` = d−m; `sumOfNumbersAandB` = d+m. 4. d = (diff+sum)/2, m = (sum−diff)/2.
 * Dry Run: nums=[1,2,2,4], n=4.
 *   - Sum 9 vs 10 → diff −1. Squares 1+4+4+16=25 vs 30 → (25-30)/(-1)=5 = d+m. d=2, m=3. Return [2,3].
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
