/**
 * Minimum Operations To Maximize Last Elements In Arrays
 * Intuition: The problem requires `nums1[n-1]` and `nums2[n-1]` to be the maximums of their respective arrays. This implies that for any index `i < n-1`, `nums1[i]` must be less than or equal to the final `nums1[n-1]` and `nums2[i]` must be less than or equal to the final `nums2[n-1]`. There are only two possibilities for the values at the last index `n-1`: either they remain as `nums1[n-1], nums2[n-1]` (original values), or they are swapped to `nums2[n-1], nums1[n-1]`. We can calculate the minimum operations for each of these two scenarios independently by checking all preceding elements, and then choose the better one. If a scenario is impossible, its operation count will effectively be infinity.
 * Approach:
 * 1. Define a helper function `calculateMinimumSwaps(targetMaxOne, targetMaxTwo)` that determines the minimum swaps required for indices `0` to `n-2` given the required maximum values `targetMaxOne` and `targetMaxTwo` for `nums1` and `nums2` respectively.
 * 2. Inside `calculateMinimumSwaps`: Initialize a `currentOperationsCount` to 0. Iterate from `currentIndex = 0` to `arrayLength - 2`. For each `currentIndex`:
 *    a. Check if the current elements `nums1[currentIndex]` and `nums2[currentIndex]` already satisfy the conditions (`nums1[currentIndex] <= targetMaxOne` and `nums2[currentIndex] <= targetMaxTwo`). If so, no operation is needed for this index; continue to the next.
 *    b. If not satisfied, check if swapping `nums1[currentIndex]` and `nums2[currentIndex]` would satisfy the conditions (`nums2[currentIndex] <= targetMaxOne` and `nums1[currentIndex] <= targetMaxTwo`). If a swap makes it satisfy, increment `currentOperationsCount`.
 *    c. If neither the original pair nor the swapped pair satisfies the conditions for the given `targetMaxOne` and `targetMaxTwo`, then this scenario is impossible. Return `Infinity` from the helper function.
 *    d. If the loop completes without returning `Infinity`, return the accumulated `currentOperationsCount`.
 * 3. In the main `minOperations` function:
 *    a. Retrieve the original values `nums1[arrayLength - 1]` and `nums2[arrayLength - 1]`, storing them as `lastElementOneOriginal` and `lastElementTwoOriginal`.
 *    b. Calculate operations for the first scenario (no swap at `arrayLength - 1`): `costIfLastNotSwapped = calculateMinimumSwaps(lastElementOneOriginal, lastElementTwoOriginal)`.
 *    c. Calculate operations for the second scenario (swap at `arrayLength - 1`): `costIfLastSwapped = calculateMinimumSwaps(lastElementTwoOriginal, lastElementOneOriginal)`. If `costIfLastSwapped` is not `Infinity`, increment it by 1 to account for the actual swap at index `arrayLength - 1`.
 *    d. Determine the overall minimum operations: `minimumTotalOperations = Math.min(costIfLastNotSwapped, costIfLastSwapped)`.
 * 4. Finally, if `minimumTotalOperations` is `Infinity`, return `-1` (impossible). Otherwise, return `minimumTotalOperations`.
 * Dry Run:
 * nums1 = [1, 2, 7], nums2 = [4, 5, 3]
 * arrayLength = 3
 *
 * lastElementOneOriginal = nums1[2] = 7
 * lastElementTwoOriginal = nums2[2] = 3
 *
 * Helper function: calculateMinimumSwaps(maxTargetOne, maxTargetTwo)
 *
 * Scenario 1: No swap at last index (nums1[2]=7, nums2[2]=3).
 *   maxTargetOne = lastElementOneOriginal = 7
 *   maxTargetTwo = lastElementTwoOriginal = 3
 *   costIfLastNotSwapped = calculateMinimumSwaps(7, 3):
 *     currentOperationsCount = 0
 *     currentIndex = 0: nums1[0]=1, nums2[0]=4
 *       (1 <= 7 AND 4 <= 3) is FALSE.
 *       Try swap: (4 <= 7 AND 1 <= 3) is TRUE.
 *       currentOperationsCount becomes 1.
 *     currentIndex = 1: nums1[1]=2, nums2[1]=5
 *       (2 <= 7 AND 5 <= 3) is FALSE.
 *       Try swap: (5 <= 7 AND 2 <= 3) is TRUE.
 *       currentOperationsCount becomes 2.
 *     Loop ends. Return 2.
 *   costIfLastNotSwapped = 2.
 *
 * Scenario 2: Swap at last index (nums1[2] becomes 3, nums2[2] becomes 7).
 *   maxTargetOne = lastElementTwoOriginal = 3
 *   maxTargetTwo = lastElementOneOriginal = 7
 *   costIfLastSwapped = calculateMinimumSwaps(3, 7):
 *     currentOperationsCount = 0
 *     currentIndex = 0: nums1[0]=1, nums2[0]=4
 *       (1 <= 3 AND 4 <= 7) is TRUE.
 *       No operation needed.
 *     currentIndex = 1: nums1[1]=2, nums2[1]=5
 *       (2 <= 3 AND 5 <= 7) is TRUE.
 *       No operation needed.
 *     Loop ends. Return 0.
 *   costIfLastSwapped = 0.
 *   Since costIfLastSwapped (0) is not Infinity, increment it by 1 for the swap at the last index: costIfLastSwapped = 1.
 *
 * minimumTotalOperations = Math.min(costIfLastNotSwapped, costIfLastSwapped) = Math.min(2, 1) = 1.
 * minimumTotalOperations (1) is not Infinity, so return 1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOperations = function (nums1, nums2) {
  const arrayLength = nums1.length;

  const calculateMinimumSwaps = (maxTargetOne, maxTargetTwo) => {
    let currentOperationsCount = 0;
    for (let currentIndex = 0; currentIndex < arrayLength - 1; currentIndex++) {
      const indexElementOne = nums1[currentIndex];
      const indexElementTwo = nums2[currentIndex];

      const conditionMetDirectly =
        indexElementOne <= maxTargetOne && indexElementTwo <= maxTargetTwo;
      const conditionMetBySwap =
        indexElementTwo <= maxTargetOne && indexElementOne <= maxTargetTwo;

      if (conditionMetDirectly) {
      } else if (conditionMetBySwap) {
        currentOperationsCount++;
      } else {
        return Infinity;
      }
    }
    return currentOperationsCount;
  };

  const lastElementOneOriginal = nums1[arrayLength - 1];
  const lastElementTwoOriginal = nums2[arrayLength - 1];

  let costIfLastNotSwapped = calculateMinimumSwaps(
    lastElementOneOriginal,
    lastElementTwoOriginal
  );

  let costIfLastSwapped = calculateMinimumSwaps(
    lastElementTwoOriginal,
    lastElementOneOriginal
  );
  if (costIfLastSwapped !== Infinity) {
    costIfLastSwapped++;
  }

  const minimumTotalOperations = Math.min(
    costIfLastNotSwapped,
    costIfLastSwapped
  );

  if (minimumTotalOperations === Infinity) {
    return -1;
  } else {
    return minimumTotalOperations;
  }
};
