/**
 * Find Greatest Common Divisor Of Array
 * Intuition: The problem requires finding the greatest common divisor (GCD) of the smallest and largest numbers within a given array. The Euclidean algorithm provides an efficient method to calculate the GCD of two integers.
 * Approach: 1. Iterate through the input array to determine the minimum and maximum elements present. 2. Define a helper function that implements the recursive Euclidean algorithm. 3. Call this helper function with the identified minimum and maximum values to compute and return their GCD.
 * Dry Run:
 * Input: nums = [2,5,6,9,10]
 * 1. Initialize `currentMinValue = Infinity`, `currentMaxValue = -Infinity`.
 * 2. Loop through `nums` using `arrayCounter`:
 *    - `arrayCounter = 0, valueAtIndex = 2`: `currentMinValue` becomes `2`, `currentMaxValue` becomes `2`.
 *    - `arrayCounter = 1, valueAtIndex = 5`: `currentMinValue` remains `2`, `currentMaxValue` becomes `5`.
 *    - `arrayCounter = 2, valueAtIndex = 6`: `currentMinValue` remains `2`, `currentMaxValue` becomes `6`.
 *    - `arrayCounter = 3, valueAtIndex = 9`: `currentMinValue` remains `2`, `currentMaxValue` becomes `9`.
 *    - `arrayCounter = 4, valueAtIndex = 10`: `currentMinValue` remains `2`, `currentMaxValue` becomes `10`.
 * 3. After the loop, `currentMinValue = 2`, `currentMaxValue = 10`.
 * 4. Call `computeGreatestCommonDivisor(2, 10)`:
 *    - `computeGreatestCommonDivisor(2, 10)`: `secondNumber` (10) is not 0. Recursively calls `computeGreatestCommonDivisor(10, 2 % 10)` which is `computeGreatestCommonDivisor(10, 2)`.
 *    - `computeGreatestCommonDivisor(10, 2)`: `secondNumber` (2) is not 0. Recursively calls `computeGreatestCommonDivisor(2, 10 % 2)` which is `computeGreatestCommonDivisor(2, 0)`.
 *    - `computeGreatestCommonDivisor(2, 0)`: `secondNumber` (0) is 0. Returns `firstNumber` (2).
 * 5. The final result returned by `findGCD` is `2`.
 * Time Complexity: O(N + log(max_val))
 * Space Complexity: O(log(max_val))
 */
var findGCD = function (nums) {
  function computeGreatestCommonDivisor(firstNumber, secondNumber) {
    if (secondNumber === 0) {
      return firstNumber;
    }
    return computeGreatestCommonDivisor(
      secondNumber,
      firstNumber % secondNumber
    );
  }

  let currentMinimumValue = Number.POSITIVE_INFINITY;
  let currentMaximumValue = Number.NEGATIVE_INFINITY;
  let elementPointer = 0;
  const totalElements = nums.length;

  while (elementPointer < totalElements) {
    const currentElement = nums[elementPointer];
    if (currentElement < currentMinimumValue) {
      currentMinimumValue = currentElement;
    }
    if (currentElement > currentMaximumValue) {
      currentMaximumValue = currentElement;
    }
    elementPointer++;
  }

  return computeGreatestCommonDivisor(currentMinimumValue, currentMaximumValue);
};
