/**
 * Difference Between Element Sum And Digit Sum Of An Array
 * Intuition: The problem requires calculating two distinct sums: one from the numbers themselves and another from their individual digits. The core idea is to implement separate logic for computing each sum and then find their absolute difference, with the primary challenge being the robust extraction of digits from multi-digit numbers.
 * Approach: 1. Initialize two variables, `elementSumResult` and `digitSumResult`, both to zero. 2. Iterate through the input `nums` array using a `for` loop. 3. In each iteration, add the current number directly to `elementSumResult`. 4. For the same current number, use a nested `while` loop to extract and sum its individual digits: a. Create a temporary variable, `numberToProcess`, initialized with the current array element. b. While `numberToProcess` is greater than zero, extract the last digit using the modulo operator (`% 10`), add it to `digitSumResult`, and then update `numberToProcess` by integer division (`Math.floor(numberToProcess / 10)`) to remove the last digit. 5. After iterating through all numbers, return the absolute difference between `elementSumResult` and `digitSumResult` using `Math.abs()`.
 * Dry Run: nums = [1, 15, 6, 3]
 *   Initial: elementSumResult = 0, digitSumResult = 0
 *   currentArrayLength = 4
 *
 *   arrayElementIndex = 0, currentNumberValue = 1
 *     elementSumResult = 0 + 1 = 1
 *     numberToProcess = 1
 *       While 1 > 0:
 *         extractedDigit = 1 % 10 = 1
 *         digitSumResult = 0 + 1 = 1
 *         numberToProcess = Math.floor(1 / 10) = 0
 *     (Inner while loop ends)
 *
 *   arrayElementIndex = 1, currentNumberValue = 15
 *     elementSumResult = 1 + 15 = 16
 *     numberToProcess = 15
 *       While 15 > 0:
 *         extractedDigit = 15 % 10 = 5
 *         digitSumResult = 1 + 5 = 6
 *         numberToProcess = Math.floor(15 / 10) = 1
 *       While 1 > 0:
 *         extractedDigit = 1 % 10 = 1
 *         digitSumResult = 6 + 1 = 7
 *         numberToProcess = Math.floor(1 / 10) = 0
 *     (Inner while loop ends)
 *
 *   arrayElementIndex = 2, currentNumberValue = 6
 *     elementSumResult = 16 + 6 = 22
 *     numberToProcess = 6
 *       While 6 > 0:
 *         extractedDigit = 6 % 10 = 6
 *         digitSumResult = 7 + 6 = 13
 *         numberToProcess = Math.floor(6 / 10) = 0
 *     (Inner while loop ends)
 *
 *   arrayElementIndex = 3, currentNumberValue = 3
 *     elementSumResult = 22 + 3 = 25
 *     numberToProcess = 3
 *       While 3 > 0:
 *         extractedDigit = 3 % 10 = 3
 *         digitSumResult = 13 + 3 = 16
 *         numberToProcess = Math.floor(3 / 10) = 0
 *     (Inner while loop ends)
 *
 *   Outer for loop ends.
 *   Return Math.abs(elementSumResult - digitSumResult) = Math.abs(25 - 16) = Math.abs(9) = 9.
 * Time Complexity: O(N * log(MaxNum))
 * Space Complexity: O(1)
 */
var differenceOfSum = function (nums) {
  let elementSumResult = 0;
  let digitSumResult = 0;

  const currentArrayLength = nums.length;

  for (
    let arrayElementIndex = 0;
    arrayElementIndex < currentArrayLength;
    arrayElementIndex++
  ) {
    let currentNumberValue = nums[arrayElementIndex];
    elementSumResult += currentNumberValue;

    let numberToProcess = currentNumberValue;
    while (numberToProcess > 0) {
      let extractedDigit = numberToProcess % 10;
      digitSumResult += extractedDigit;
      numberToProcess = Math.floor(numberToProcess / 10);
    }
  }

  return Math.abs(elementSumResult - digitSumResult);
};
