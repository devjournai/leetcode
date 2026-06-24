/**
 * Largest Positive Integer That Exists With Its Negative
 * Intuition: If we sort the array, negative numbers will be at the beginning and positive numbers at the end. We can use two pointers, one from each end, to efficiently search for a positive number and its negative counterpart. By moving the pointers inwards based on the comparison of the absolute negative value and the positive value, we can converge on the largest possible `k` or determine if no such `k` exists.
 * Approach: 1. Create a mutable copy of the input array and sort it in non-decreasing order. 2. Initialize a `startIdx` pointer to the beginning (index 0) and an `endIdx` pointer to the end (last index) of the sorted array. 3. Initialize `maxKValue` to `-1` to store the largest positive integer found. 4. Iterate while `startIdx` is less than `endIdx`: a. Get the number at `startIdx` (`currentNegative`) and the number at `endIdx` (`currentPositive`). b. If `currentNegative` is non-negative, or `currentPositive` is non-positive, it means we have crossed the boundary of potential negative-positive pairs, so break the loop. c. Calculate `absoluteCurrentNegative = Math.abs(currentNegative)`. d. If `absoluteCurrentNegative` equals `currentPositive`, a valid `k` is found. Update `maxKValue` with `Math.max(maxKValue, currentPositive)`. Then, move `startIdx` one step right and `endIdx` one step left to search for other pairs. e. If `absoluteCurrentNegative` is less than `currentPositive`, the positive number is too large for the current negative. Move `endIdx` one step left to try a smaller positive number. f. If `absoluteCurrentNegative` is greater than `currentPositive`, the negative number (in absolute value) is too large. Move `startIdx` one step right to try a less negative number. 5. Return `maxKValue`.
 * Dry Run: nums = [-1, 2, -3, 3]
 * 1. numsArray becomes `[-3, -1, 2, 3]` after sorting.
 * 2. `startIdx = 0`, `endIdx = 3`, `maxKValue = -1`.
 * 3. Loop `while (startIdx < endIdx)`:
 *    - **Iteration 1**: `startIdx = 0`, `endIdx = 3`.
 *      `currentNegative = numsArray[0] = -3`.
 *      `currentPositive = numsArray[3] = 3`.
 *      Neither `currentNegative >= 0` nor `currentPositive <= 0` is true.
 *      `absoluteCurrentNegative = Math.abs(-3) = 3`.
 *      `absoluteCurrentNegative === currentPositive` (3 === 3) is true.
 *      `maxKValue = Math.max(-1, 3) = 3`.
 *      `startIdx` increments to `1`.
 *      `endIdx` decrements to `2`.
 *    - **Iteration 2**: `startIdx = 1`, `endIdx = 2`.
 *      `currentNegative = numsArray[1] = -1`.
 *      `currentPositive = numsArray[2] = 2`.
 *      Neither `currentNegative >= 0` nor `currentPositive <= 0` is true.
 *      `absoluteCurrentNegative = Math.abs(-1) = 1`.
 *      `absoluteCurrentNegative < currentPositive` (1 < 2) is true.
 *      `endIdx` decrements to `1`.
 *    - **Iteration 3**: `startIdx = 1`, `endIdx = 1`.
 *      Condition `startIdx < endIdx` (1 < 1) is false. Loop terminates.
 * 4. Return `maxKValue` which is `3`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var findMaxK = function (nums) {
  const numsArray = [...nums];
  numsArray.sort((valA, valB) => valA - valB);

  let startIdx = 0;
  let endIdx = numsArray.length - 1;
  let maxKValue = -1;

  while (startIdx < endIdx) {
    let currentNegative = numsArray[startIdx];
    let currentPositive = numsArray[endIdx];

    if (currentNegative >= 0 || currentPositive <= 0) {
      break;
    }

    let absoluteCurrentNegative = Math.abs(currentNegative);

    if (absoluteCurrentNegative === currentPositive) {
      maxKValue = Math.max(maxKValue, currentPositive);
      startIdx++;
      endIdx--;
    } else if (absoluteCurrentNegative < currentPositive) {
      endIdx--;
    } else {
      startIdx++;
    }
  }

  return maxKValue;
};
