/**
 * Maximum Count Of Positive Integer And Negative Integer
 * Intuition: The given array is sorted. This implies all negative numbers appear first, followed by zeros, and then positive numbers. We can count negative numbers by iterating from the start until a non-negative number is found, and count positive numbers by iterating from the end backwards until a non-positive number is found.
 * Approach: 1. Initialize a counter for negative numbers and another for positive numbers, both to zero. 2. Use a forward iteration (e.g., a while loop) to count all negative integers from the beginning of the array. Stop when a zero or positive integer is encountered. 3. Use a backward iteration (e.g., another while loop) to count all positive integers from the end of the array. Stop when a zero or negative integer is encountered. 4. Return the maximum of these two counts.
 * Dry Run: nums = [-2, -1, 0, 1, 2]
 *   - Initialize `negativeNumberCount = 0`, `positiveNumberCount = 0`.
 *   - First loop (for negatives):
 *     - `leftIndex = 0`: `nums[0] = -2`. Since -2 < 0, `negativeNumberCount` becomes 1. `leftIndex` becomes 1.
 *     - `leftIndex = 1`: `nums[1] = -1`. Since -1 < 0, `negativeNumberCount` becomes 2. `leftIndex` becomes 2.
 *     - `leftIndex = 2`: `nums[2] = 0`. Since 0 is not < 0, loop terminates.
 *   - `negativeNumberCount` is 2.
 *   - Second loop (for positives):
 *     - `rightIndex = 4`: `nums[4] = 2`. Since 2 > 0, `positiveNumberCount` becomes 1. `rightIndex` becomes 3.
 *     - `rightIndex = 3`: `nums[3] = 1`. Since 1 > 0, `positiveNumberCount` becomes 2. `rightIndex` becomes 2.
 *     - `rightIndex = 2`: `nums[2] = 0`. Since 0 is not > 0, loop terminates.
 *   - `positiveNumberCount` is 2.
 *   - `finalMaximum = Math.max(negativeNumberCount, positiveNumberCount) = Math.max(2, 2) = 2`.
 *   - Return 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maximumCount = function (nums) {
  let negativeNumberCount = 0;
  let positiveNumberCount = 0;

  let leftIndex = 0;
  const arrayLength = nums.length;

  while (leftIndex < arrayLength && nums[leftIndex] < 0) {
    negativeNumberCount++;
    leftIndex++;
  }

  let rightIndex = arrayLength - 1;

  while (rightIndex >= 0 && nums[rightIndex] > 0) {
    positiveNumberCount++;
    rightIndex--;
  }

  const finalMaximum = Math.max(negativeNumberCount, positiveNumberCount);
  return finalMaximum;
};
