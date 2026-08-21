/**
 * Minimum Operations To Make Numbers Non Positive
 * Intuition: This problem asks for the minimum number of operations, which often suggests a binary search on the answer. If a certain number of operations `k` can make all numbers non-positive, then any `k' > k` operations can also achieve the goal. This monotonic property allows us to efficiently search for the minimum `k`. The core challenge is to design an efficient `canPerform` function that checks if `k` operations are sufficient.
 * Approach: 1. The solution employs binary search on the number of operations. Initialize `lowPointer` to 0 and `highPointer` to `Math.max(...nums)` (or a sufficiently large constant like `10^9` to cover all cases, `Math.max(...nums)` works here because at least `max(nums)` operations with `x=1, y=0` would reduce the largest element).
 *           2. In each iteration of the binary search, calculate `midPoint = floor((lowPointer + highPointer) / 2)`.
 *           3. Call a helper function `checkPossible(nums, x, y, midPoint)` to determine if `midPoint` operations are sufficient.
 *           4. If `checkPossible` returns `true`, it means `midPoint` operations might be the minimum, so we try to find a smaller number of operations by setting `highPointer = midPoint`.
 *           5. If `checkPossible` returns `false`, `midPoint` operations are not enough, so we need more operations, setting `lowPointer = midPoint + 1`.
 *           6. The binary search terminates when `lowPointer == highPointer`, and this value is the minimum operations required.
 *           7. The `checkPossible` helper function first considers the total reduction from `y` over `currentIterationCount` operations for all numbers (`nums[i] - currentIterationCount * y`).
 *           8. If `x <= y`, then applying the `x` reduction specifically to an element is never better (or is worse) than the general `y` reduction. In this specific case, `currentIterationCount * y` must be sufficient to make every number non-positive; otherwise, it's impossible.
 *           9. If `x > y`, for any number `nums[i]` that is still positive after the `y` reductions, we need to apply additional 'specific picks' to it. Each specific pick provides an extra `x - y` reduction. Calculate how many such picks `specificPicks` are needed for each positive `nums[i]` (using `Math.ceil`) and sum them up to `totalExtraCount`.
 *           10. Finally, `checkPossible` returns `true` if `totalExtraCount` is less than or equal to `currentIterationCount`, meaning we have enough specific pick operations available.
 * Dry Run: nums = [5, 6], x = 4, y = 1
 * 1. Initialize: `lowPointer = 0`, `highPointer = 6` (max of nums). `answerResult = 6` (stores potential minimum).
 * 2. Iteration 1: `lowPointer = 0`, `highPointer = 6`. `midPoint = floor((0 + 6) / 2) = 3`.
 *    Call `checkPossible([5, 6], 4, 1, 3)`:
 *    `operationX = 4`, `operationY = 1`, `currentIterationCount = 3`. `operationX > operationY` (4 > 1).
 *    `temporaryValues` after `y` reduction: `[5 - 3*1, 6 - 3*1] = [2, 3]`.
 *    `totalExtraCount = 0`. `effectiveDecrease = operationX - operationY = 3`.
 *    For `temporaryValues[0] = 2`: `2 > 0`. `specificPicks = Math.ceil(2 / 3) = 1`. `totalExtraCount = 1`.
 *    For `temporaryValues[1] = 3`: `3 > 0`. `specificPicks = Math.ceil(3 / 3) = 1`. `totalExtraCount = 1 + 1 = 2`.
 *    Return `totalExtraCount <= currentIterationCount` (`2 <= 3`) which is `true`.
 *    Since `checkPossible` is `true`, `answerResult = 3`, `highPointer = 3`.
 * 3. Iteration 2: `lowPointer = 0`, `highPointer = 3`. `midPoint = floor((0 + 3) / 2) = 1`.
 *    Call `checkPossible([5, 6], 4, 1, 1)`:
 *    `currentIterationCount = 1`.
 *    `temporaryValues` after `y` reduction: `[5 - 1*1, 6 - 1*1] = [4, 5]`.
 *    `totalExtraCount = 0`. `effectiveDecrease = 3`.
 *    For `temporaryValues[0] = 4`: `4 > 0`. `specificPicks = Math.ceil(4 / 3) = 2`. `totalExtraCount = 2`.
 *    For `temporaryValues[1] = 5`: `5 > 0`. `specificPicks = Math.ceil(5 / 3) = 2`. `totalExtraCount = 2 + 2 = 4`.
 *    Return `totalExtraCount <= currentIterationCount` (`4 <= 1`) which is `false`.
 *    Since `checkPossible` is `false`, `lowPointer = midPoint + 1 = 1 + 1 = 2`.
 * 4. Iteration 3: `lowPointer = 2`, `highPointer = 3`. `midPoint = floor((2 + 3) / 2) = 2`.
 *    Call `checkPossible([5, 6], 4, 1, 2)`:
 *    `currentIterationCount = 2`.
 *    `temporaryValues` after `y` reduction: `[5 - 2*1, 6 - 2*1] = [3, 4]`.
 *    `totalExtraCount = 0`. `effectiveDecrease = 3`.
 *    For `temporaryValues[0] = 3`: `3 > 0`. `specificPicks = Math.ceil(3 / 3) = 1`. `totalExtraCount = 1`.
 *    For `temporaryValues[1] = 4`: `4 > 0`. `specificPicks = Math.ceil(4 / 3) = 2`. `totalExtraCount = 1 + 2 = 3`.
 *    Return `totalExtraCount <= currentIterationCount` (`3 <= 2`) which is `false`.
 *    Since `checkPossible` is `false`, `lowPointer = midPoint + 1 = 2 + 1 = 3`.
 * 5. Iteration 4: `lowPointer = 3`, `highPointer = 3`. Loop condition `lowPointer < highPointer` is false.
 * Final result: `lowPointer = 3`.
 * Time Complexity: O(N * log(MAX_VALUE))
 * Space Complexity: O(N)
 */
var minOperations = function (nums, x, y) {
  let lowerBound = 0;
  let upperBound = 0;
  for (let numberValue of nums) {
    if (numberValue > upperBound) {
      upperBound = numberValue;
    }
  }

  let minimumOperations = upperBound;

  while (lowerBound <= upperBound) {
    const currentMid = Math.floor(lowerBound + (upperBound - lowerBound) / 2);
    if (checkPossible(nums, x, y, currentMid)) {
      minimumOperations = currentMid;
      upperBound = currentMid - 1;
    } else {
      lowerBound = currentMid + 1;
    }
  }

  return minimumOperations;

  function checkPossible(
    allNumbersArray,
    xDecrement,
    yDecrement,
    currentIterationCount
  ) {
    if (xDecrement <= yDecrement) {
      for (
        let arrayIndex = 0;
        arrayIndex < allNumbersArray.length;
        arrayIndex++
      ) {
        if (allNumbersArray[arrayIndex] > currentIterationCount * yDecrement) {
          return false;
        }
      }
      return true;
    }

    const lengthOfArray = allNumbersArray.length;
    const temporaryValues = new Array(lengthOfArray);
    for (let arrayIndex = 0; arrayIndex < lengthOfArray; arrayIndex++) {
      temporaryValues[arrayIndex] =
        allNumbersArray[arrayIndex] - currentIterationCount * yDecrement;
    }

    let totalExtraCount = 0;
    const effectiveDecrease = xDecrement - yDecrement;

    for (let arrayIndex = 0; arrayIndex < lengthOfArray; arrayIndex++) {
      if (temporaryValues[arrayIndex] > 0) {
        const specificPicks = Math.ceil(
          temporaryValues[arrayIndex] / effectiveDecrease
        );
        totalExtraCount += specificPicks;
      }
    }

    return totalExtraCount <= currentIterationCount;
  }
};
