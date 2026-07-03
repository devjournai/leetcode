/**
 * Count The Number Of Fair Pairs
 * Intuition: Sorting the array allows for efficient range queries for the second element. For each `nums[i]`, we need to find `nums[j]` (with `j > i`) whose sum with `nums[i]` falls within the given `[lower, upper]` range. This translates to finding `nums[j]` in a specific sub-range `[lower - nums[i], upper - nums[i]]`. Binary search can efficiently count elements within this target range in a sorted array.
 * Approach: 1. Sort the input array `nums`. 2. Initialize a counter `fairPairCount` to zero. 3. Iterate through the array with `firstElementIndex` from `0` to `n-2`. 4. For each `nums[firstElementIndex]`, calculate the required minimum and maximum values for `nums[secondElement]` to form a fair pair: `minValForSecond = lower - nums[firstElementIndex]` and `maxValForSecond = upper - nums[firstElementIndex]`. 5. Use a binary search helper function `findBoundaryIndex` to locate the `lower_bound` for `minValForSecond` (inclusive start of valid range) and the `lower_bound` for `maxValForSecond + 1` (exclusive end of valid range) within the sub-array `nums[firstElementIndex + 1 ... n-1]`. 6. The difference between these two boundary indices gives the count of `secondElement` values that satisfy the condition for the current `firstElementIndex`. Add this count to `fairPairCount`. 7. Return `fairPairCount`.
 * Dry Run: nums = [1, 7, 5], lower = 6, upper = 12
 * 1. Sort nums: [1, 5, 7].
 * 2. fairPairCount = 0.
 * 3. firstElementIndex = 0 (nums[0] = 1):
 *    - minValForSecond = 6 - 1 = 5
 *    - maxValForSecond = 12 - 1 = 11
 *    - lowBound = findBoundaryIndex(1, 5) -> returns 1 (nums[1] = 5 is first element >= 5 from index 1).
 *    - highBound = findBoundaryIndex(1, 11 + 1) -> findBoundaryIndex(1, 12) -> returns 3 (index where 12 would be inserted, after 7).
 *    - Valid count for current firstElementIndex = highBound - lowBound = 3 - 1 = 2.
 *    - fairPairCount = 0 + 2 = 2. (Pairs: (1,5) sum 6; (1,7) sum 8)
 * 4. firstElementIndex = 1 (nums[1] = 5):
 *    - minValForSecond = 6 - 5 = 1
 *    - maxValForSecond = 12 - 5 = 7
 *    - lowBound = findBoundaryIndex(2, 1) -> returns 2 (nums[2] = 7 is first element >= 1 from index 2).
 *    - highBound = findBoundaryIndex(2, 7 + 1) -> findBoundaryIndex(2, 8) -> returns 3 (index where 8 would be inserted, after 7).
 *    - Valid count for current firstElementIndex = highBound - lowBound = 3 - 2 = 1.
 *    - fairPairCount = 2 + 1 = 3. (Pair: (5,7) sum 12)
 * 5. Loop ends (firstElementIndex reaches n-2=1).
 * 6. Return fairPairCount = 3.
 * Time Complexity: O(N log N) - O(N log N)
 * Space Complexity: O(log N)
 */
var countFairPairs = function (nums, lower, upper) {
  nums.sort((valueA, valueB) => valueA - valueB);

  let fairPairCount = 0;
  const arrayLength = nums.length;

  function findBoundaryIndex(searchStart, targetSum) {
    let leftBoundary = searchStart;
    let rightBoundary = arrayLength - 1;
    let insertionPoint = arrayLength;

    while (leftBoundary <= rightBoundary) {
      const midPoint = Math.floor((leftBoundary + rightBoundary) / 2);
      if (nums[midPoint] >= targetSum) {
        insertionPoint = midPoint;
        rightBoundary = midPoint - 1;
      } else {
        leftBoundary = midPoint + 1;
      }
    }
    return insertionPoint;
  }

  for (
    let firstElementIndex = 0;
    firstElementIndex < arrayLength - 1;
    firstElementIndex++
  ) {
    const minValForSecond = lower - nums[firstElementIndex];
    const maxValForSecond = upper - nums[firstElementIndex];

    const lowBound = findBoundaryIndex(firstElementIndex + 1, minValForSecond);
    const highBound = findBoundaryIndex(
      firstElementIndex + 1,
      maxValForSecond + 1,
    );

    if (lowBound < highBound) {
      fairPairCount += highBound - lowBound;
    }
  }

  return fairPairCount;
};
