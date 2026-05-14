/**
 * Minimum Number Of Operations To Make Array Continuous
 * Intuition: To make an array continuous, it must contain `N` unique elements that form a sequence `x, x+1, ..., x+N-1`. We want to maximize the number of elements from the original array that can be part of such a sequence, as only the non-matching elements need to be replaced.
 * Approach: 1. Remove duplicate elements and sort them to get `distinctSortedElements`. 2. Initialize `minimumOperations` to `arrayLength`, which is the worst-case scenario. 3. Use a two-pointer sliding window (`leftPointer` and `rightPointer`) on `distinctSortedElements`. 4. For each `distinctSortedElements[leftPointer]`, which serves as a potential starting value for a continuous sequence of length `arrayLength`, expand `rightPointer` to include all `distinctSortedElements` that fall within the target range `[distinctSortedElements[leftPointer], distinctSortedElements[leftPointer] + arrayLength - 1]`. 5. The number of unique elements already present in this window is `rightPointer - leftPointer`. The operations needed for this specific window is `arrayLength - (rightPointer - leftPointer)`. 6. Update `minimumOperations` with the smallest value found. 7. Return `minimumOperations`.
 * Dry Run: nums = [4, 2, 5, 3]
 * arrayLength = 4
 * distinctSortedElements = [2, 3, 4, 5]
 * minimumOperations = 4
 * distinctCount = 4
 *
 * leftPointer = 0, distinctSortedElements[0] = 2. Target end: 2 + 4 - 1 = 5.
 *   rightPointer = 0: distinctSortedElements[0] = 2. 2 <= 5 (T). rightPointer becomes 1.
 *   rightPointer = 1: distinctSortedElements[1] = 3. 3 <= 5 (T). rightPointer becomes 2.
 *   rightPointer = 2: distinctSortedElements[2] = 4. 4 <= 5 (T). rightPointer becomes 3.
 *   rightPointer = 3: distinctSortedElements[3] = 5. 5 <= 5 (T). rightPointer becomes 4.
 *   rightPointer = 4: rightPointer < distinctCount (F). Loop ends.
 *   Elements in window: [2, 3, 4, 5]. Count = 4 - 0 = 4.
 *   minimumOperations = Math.min(4, 4 - 4) = 0.
 *
 * leftPointer = 1, distinctSortedElements[1] = 3. Target end: 3 + 4 - 1 = 6.
 *   rightPointer is 4. distinctSortedElements[4] (out of bounds for distinctSortedElements, so condition fails naturally). Loop does not run further.
 *   Count in window: 4 - 1 = 3.
 *   minimumOperations = Math.min(0, 4 - 3) = 0.
 *
 * (Subsequent leftPointer iterations will also result in minimumOperations >= 0, so 0 remains.)
 * Result: 0
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minOperations = function (nums) {
  const arrayLength = nums.length;
  const distinctSortedElements = [...new Set(nums)].sort(
    (firstValue, secondValue) => firstValue - secondValue,
  );
  let minimumOperations = arrayLength;
  const distinctCount = distinctSortedElements.length;

  let leftPointer = 0;
  let rightPointer = 0;

  for (leftPointer = 0; leftPointer < distinctCount; leftPointer++) {
    const windowUpperBound =
      distinctSortedElements[leftPointer] + arrayLength - 1;
    while (
      rightPointer < distinctCount &&
      distinctSortedElements[rightPointer] <= windowUpperBound
    ) {
      rightPointer++;
    }
    const currentWindowElements = rightPointer - leftPointer;
    minimumOperations = Math.min(
      minimumOperations,
      arrayLength - currentWindowElements,
    );
  }

  return minimumOperations;
};
