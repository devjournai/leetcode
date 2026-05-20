/**
 * Smallest Index With Equal Value
 * Intuition: The problem asks for the smallest index where the index's last digit matches the value at that index. To find the *smallest* such index, we must check from the beginning of the array sequentially.
 * Approach: 1. Initialize a counter variable to represent the current index, starting from zero. 2. Iterate through the array using a while loop, continuing as long as the current index is less than the array's total length. 3. Inside the loop, calculate the remainder of the current index when divided by 10. 4. Compare this calculated remainder with the numerical value stored at the current index in the input array. 5. If these two values are equal, the current index satisfies the condition, and since we are iterating from smallest to largest index, this is the smallest possible answer, so return it immediately. 6. If the values are not equal, increment the current index and proceed to the next iteration. 7. If the loop completes without finding any such index, it means no index satisfies the condition, so return -1.
 * Dry Run: nums = [4, 3, 0, 1]
 *   1. Initialize `currentIdx` = 0.
 *   2. `currentIdx` (0) < `nums.length` (4). True.
 *      `digitRemainder` = 0 % 10 = 0.
 *      `indexedValue` = nums[0] = 4.
 *      `digitRemainder` (0) === `indexedValue` (4). False.
 *      Increment `currentIdx` to 1.
 *   3. `currentIdx` (1) < `nums.length` (4). True.
 *      `digitRemainder` = 1 % 10 = 1.
 *      `indexedValue` = nums[1] = 3.
 *      `digitRemainder` (1) === `indexedValue` (3). False.
 *      Increment `currentIdx` to 2.
 *   4. `currentIdx` (2) < `nums.length` (4). True.
 *      `digitRemainder` = 2 % 10 = 2.
 *      `indexedValue` = nums[2] = 0.
 *      `digitRemainder` (2) === `indexedValue` (0). False.
 *      Increment `currentIdx` to 3.
 *   5. `currentIdx` (3) < `nums.length` (4). True.
 *      `digitRemainder` = 3 % 10 = 3.
 *      `indexedValue` = nums[3] = 1.
 *      `digitRemainder` (3) === `indexedValue` (1). False.
 *      Increment `currentIdx` to 4.
 *   6. `currentIdx` (4) < `nums.length` (4). False. Loop terminates.
 *   7. Return -1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var smallestEqual = function (nums) {
  let currentIdx = 0;
  const arraySize = nums.length;

  while (currentIdx < arraySize) {
    const digitRemainder = currentIdx % 10;
    const indexedValue = nums[currentIdx];

    if (digitRemainder === indexedValue) {
      return currentIdx;
    }
    currentIdx++;
  }

  return -1;
};
