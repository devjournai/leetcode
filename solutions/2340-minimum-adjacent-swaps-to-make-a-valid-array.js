/**
 * Minimum Adjacent Swaps To Make A Valid Array
 * Intuition: To minimize adjacent swaps, move the leftmost minimum value to position 0 and the rightmost maximum value to position N-1. If the chosen minimum value is initially to the right of the chosen maximum value, their movements "cross paths" which effectively saves one swap.
 * Approach: 1. Handle base cases where array length is 0 or 1. 2. Initialize variables to track the minimum value, maximum value, and their respective indices (first occurrence for min, last for max) by considering the first element. 3. Iterate through the array from the second element: if a value is less than the current minimum, update the minimum value and its index. If a value is greater than or equal to the current maximum, update the maximum value and its index (using `>=` ensures we capture the *last* occurrence for the maximum). 4. Calculate the number of swaps needed for the minimum value (its index). 5. Calculate the number of swaps needed for the maximum value (arrayLength - 1 - its index). 6. Sum these individual swap counts. 7. If the initial index of the minimum value was greater than the initial index of the maximum value, decrement the total swap count by 1 due to their crossing paths. 8. Return the final swap count.
 * Dry Run: nums = [2, 1, 5, 4, 3]
 * arrayLength = 5
 *
 * Initial:
 * currentMinimumValue = 2, currentMaximumValue = 2
 * firstMinValIndex = 0, lastMaxValIndex = 0
 *
 * Loop (currentPosition from 1 to 4):
 * - currentPosition = 1, currentValue = 1
 *   - 1 < 2 (true): currentMinimumValue = 1, firstMinValIndex = 1
 *   - State: min=1, max=2, firstMinIdx=1, lastMaxIdx=0
 * - currentPosition = 2, currentValue = 5
 *   - 5 < 1 (false)
 *   - 5 >= 2 (true): currentMaximumValue = 5, lastMaxValIndex = 2
 *   - State: min=1, max=5, firstMinIdx=1, lastMaxIdx=2
 * - currentPosition = 3, currentValue = 4
 *   - 4 < 1 (false)
 *   - 4 >= 5 (false)
 *   - State: min=1, max=5, firstMinIdx=1, lastMaxIdx=2
 * - currentPosition = 4, currentValue = 3
 *   - 3 < 1 (false)
 *   - 3 >= 5 (false)
 *   - State: min=1, max=5, firstMinIdx=1, lastMaxIdx=2
 *
 * After loop:
 * firstMinValIndex = 1, lastMaxValIndex = 2
 *
 * Calculate swaps:
 * swapsToMoveMin = firstMinValIndex = 1
 * swapsToMoveMax = (arrayLength - 1) - lastMaxValIndex = (5 - 1) - 2 = 2
 *
 * totalRequiredSwaps = swapsToMoveMin + swapsToMoveMax = 1 + 2 = 3
 *
 * Check collision:
 * firstMinValIndex (1) > lastMaxValIndex (2) is false.
 *
 * Return totalRequiredSwaps = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumSwaps = function (nums) {
  const arrayLength = nums.length;
  if (arrayLength <= 1) {
    return 0;
  }

  let currentMinimumValue = nums[0];
  let currentMaximumValue = nums[0];
  let firstMinValIndex = 0;
  let lastMaxValIndex = 0;

  for (
    let currentPosition = 1;
    currentPosition < arrayLength;
    currentPosition++
  ) {
    const currentValue = nums[currentPosition];

    if (currentValue < currentMinimumValue) {
      currentMinimumValue = currentValue;
      firstMinValIndex = currentPosition;
    } else if (currentValue >= currentMaximumValue) {
      currentMaximumValue = currentValue;
      lastMaxValIndex = currentPosition;
    }
  }

  let swapsToMoveMin = firstMinValIndex;
  let swapsToMoveMax = arrayLength - 1 - lastMaxValIndex;

  let totalRequiredSwaps = swapsToMoveMin + swapsToMoveMax;

  if (firstMinValIndex > lastMaxValIndex) {
    totalRequiredSwaps -= 1;
  }

  return totalRequiredSwaps;
};
