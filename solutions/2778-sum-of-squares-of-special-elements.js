/**
 * Sum Of Squares Of Special Elements
 * Intuition: The problem requires identifying "special" elements based on their 1-indexed position dividing the array's total length. Once identified, these elements are squared and summed.
 * Approach: 1. Determine the length of the input array. 2. Initialize a running sum for the squares. 3. Iterate through the array using a 0-indexed loop. 4. For each element's 0-indexed position, calculate its corresponding 1-indexed position. 5. Check if the array's total length is perfectly divisible by this 1-indexed position. 6. If divisible, square the current element's value and add it to the running sum. 7. After iterating through all elements, return the final sum.
 * Dry Run: nums = [1, 2, 3, 4]
 *   arrayTotalLength = 4
 *   calculatedSum = 0
 *   currentElementIndex = 0:
 *     oneBasedPosition = 0 + 1 = 1
 *     4 % 1 === 0 (true)
 *     calculatedSum += nums[0] * nums[0] = 1 * 1 = 1. calculatedSum is now 1.
 *   currentElementIndex = 1:
 *     oneBasedPosition = 1 + 1 = 2
 *     4 % 2 === 0 (true)
 *     calculatedSum += nums[1] * nums[1] = 2 * 2 = 4. calculatedSum is now 1 + 4 = 5.
 *   currentElementIndex = 2:
 *     oneBasedPosition = 2 + 1 = 3
 *     4 % 3 === 0 (false)
 *     calculatedSum remains 5.
 *   currentElementIndex = 3:
 *     oneBasedPosition = 3 + 1 = 4
 *     4 % 4 === 0 (true)
 *     calculatedSum += nums[3] * nums[3] = 4 * 4 = 16. calculatedSum is now 5 + 16 = 21.
 *   Loop finishes.
 *   Return 21.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var sumOfSquares = function (nums) {
  const arrayTotalLength = nums.length;
  let calculatedSum = 0;

  for (
    let currentElementIndex = 0;
    currentElementIndex < arrayTotalLength;
    currentElementIndex++
  ) {
    const oneBasedPosition = currentElementIndex + 1;
    if (arrayTotalLength % oneBasedPosition === 0) {
      calculatedSum += nums[currentElementIndex] * nums[currentElementIndex];
    }
  }

  return calculatedSum;
};
