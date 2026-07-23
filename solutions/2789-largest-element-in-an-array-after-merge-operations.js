/**
 * Largest Element In An Array After Merge Operations
 * Intuition: To maximize the largest element, we should greedily merge elements from right to left whenever possible. If an element `nums[i]` is less than or equal to the element immediately to its right (`nums[i+1]`, or a sum accumulated from `nums[i+1]` onwards), merging them creates a larger number. By iterating backward, we ensure `nums[i+1]` already holds the maximum possible sum it can form with elements to its right, allowing for optimal merging with `nums[i]`. If `nums[i]` is greater than this right-side sum, it cannot be merged and must start a new potential maximum sum.
 * Approach: 1. Initialize `maximumAchievedValue` and `runningTotal` with the last element of the input array. 2. Iterate backward from the second-to-last element down to the first element using a `while` loop. 3. In each step, if the current element is less than or equal to `runningTotal`, merge it by adding it to `runningTotal`. 4. Otherwise, the current element cannot be merged, so reset `runningTotal` to the current element's value. 5. After updating `runningTotal`, update `maximumAchievedValue` with the maximum between its current value and `runningTotal`. 6. Return `maximumAchievedValue` after the loop.
 * Dry Run: nums = [2, 3, 7, 9, 3]
 *   - inputArray = [2, 3, 7, 9, 3]
 *   - maximumAchievedValue = 3 (from inputArray[4])
 *   - runningTotal = 3
 *   - loopIndex = 3 (index of value 9)
 *   - Iteration 1 (loopIndex = 3, value 9):
 *     - inputArray[3] (9) > runningTotal (3) -> cannot merge.
 *     - runningTotal = 9
 *     - maximumAchievedValue = Math.max(3, 9) = 9
 *     - loopIndex = 2
 *   - Iteration 2 (loopIndex = 2, value 7):
 *     - inputArray[2] (7) <= runningTotal (9) -> can merge.
 *     - runningTotal = 9 + 7 = 16
 *     - maximumAchievedValue = Math.max(9, 16) = 16
 *     - loopIndex = 1
 *   - Iteration 3 (loopIndex = 1, value 3):
 *     - inputArray[1] (3) <= runningTotal (16) -> can merge.
 *     - runningTotal = 16 + 3 = 19
 *     - maximumAchievedValue = Math.max(16, 19) = 19
 *     - loopIndex = 0
 *   - Iteration 4 (loopIndex = 0, value 2):
 *     - inputArray[0] (2) <= runningTotal (19) -> can merge.
 *     - runningTotal = 19 + 2 = 21
 *     - maximumAchievedValue = Math.max(19, 21) = 21
 *     - loopIndex = -1
 *   - Loop ends.
 *   - Return 21.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxArrayValue = function (inputArray) {
  if (inputArray.length === 0) {
    return 0;
  }

  let maximumAchievedValue = inputArray[inputArray.length - 1];
  let runningTotal = inputArray[inputArray.length - 1];
  let loopIndex = inputArray.length - 2;

  while (loopIndex >= 0) {
    let currentValue = inputArray[loopIndex];
    if (currentValue <= runningTotal) {
      runningTotal += currentValue;
    } else {
      runningTotal = currentValue;
    }
    maximumAchievedValue = Math.max(maximumAchievedValue, runningTotal);
    loopIndex--;
  }

  return maximumAchievedValue;
};
