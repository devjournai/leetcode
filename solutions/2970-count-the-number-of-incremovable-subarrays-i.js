/**
 * Count The Number Of Incremovable Subarrays I
 * Intuition: A subarray is incremovable if removing it leaves a strictly increasing sequence. The brute-force approach systematically checks every possible subarray by iterating through all start and end indices, then verifies the strictly increasing property of the remaining elements.
 * Approach: 1. Initialize a counter `totalIncremovableCount` to zero. 2. Use an outer loop, iterating with `subarrayStart` from the beginning of the `nums` array to identify the starting index of a potential subarray to remove. 3. Use an inner loop, iterating with `subarrayEnd` from `subarrayStart` to the end of the `nums` array to identify the ending index of the potential subarray. 4. For each pair `(subarrayStart, subarrayEnd)`, initialize a boolean flag `isSubsequenceStrictlyIncreasing` to `true` and a `lastCheckedValue` to negative infinity. 5. Iterate through the original `nums` array using a third loop with `currentIndexCheck`. 6. If `currentIndexCheck` falls outside the range `[subarrayStart, subarrayEnd]` (meaning the element is part of the sequence *not* being removed): a. Check if `nums[currentIndexCheck]` is less than or equal to `lastCheckedValue`. If it is, set `isSubsequenceStrictlyIncreasing` to `false` and break this innermost check loop as the condition is violated. b. Otherwise, update `lastCheckedValue` to `nums[currentIndexCheck]`. 7. After the innermost loop completes, if `isSubsequenceStrictlyIncreasing` remains `true`, increment `totalIncremovableCount`. 8. Return `totalIncremovableCount`.
 * Dry Run: nums = [1, 2, 3]
 *   totalIncremovableCount = 0
 *
 *   subarrayStart = 0:
 *     subarrayEnd = 0 (subarray [1]):
 *       Remaining: [2, 3]
 *       isSubsequenceStrictlyIncreasing = true, lastCheckedValue = -Infinity
 *       currentIndexCheck = 0 (nums[0]=1), skip
 *       currentIndexCheck = 1 (nums[1]=2). 2 > -Infinity. lastCheckedValue = 2.
 *       currentIndexCheck = 2 (nums[2]=3). 3 > 2. lastCheckedValue = 3.
 *       isSubsequenceStrictlyIncreasing is true. totalIncremovableCount = 1.
 *
 *     subarrayEnd = 1 (subarray [1, 2]):
 *       Remaining: [3]
 *       isSubsequenceStrictlyIncreasing = true, lastCheckedValue = -Infinity
 *       currentIndexCheck = 0 (nums[0]=1), skip
 *       currentIndexCheck = 1 (nums[1]=2), skip
 *       currentIndexCheck = 2 (nums[2]=3). 3 > -Infinity. lastCheckedValue = 3.
 *       isSubsequenceStrictlyIncreasing is true. totalIncremovableCount = 2.
 *
 *     subarrayEnd = 2 (subarray [1, 2, 3]):
 *       Remaining: []
 *       isSubsequenceStrictlyIncreasing = true, lastCheckedValue = -Infinity
 *       All elements skipped.
 *       isSubsequenceStrictlyIncreasing is true. totalIncremovableCount = 3.
 *
 *   subarrayStart = 1:
 *     subarrayEnd = 1 (subarray [2]):
 *       Remaining: [1, 3]
 *       isSubsequenceStrictlyIncreasing = true, lastCheckedValue = -Infinity
 *       currentIndexCheck = 0 (nums[0]=1). 1 > -Infinity. lastCheckedValue = 1.
 *       currentIndexCheck = 1 (nums[1]=2), skip
 *       currentIndexCheck = 2 (nums[2]=3). 3 > 1. lastCheckedValue = 3.
 *       isSubsequenceStrictlyIncreasing is true. totalIncremovableCount = 4.
 *
 *     subarrayEnd = 2 (subarray [2, 3]):
 *       Remaining: [1]
 *       isSubsequenceStrictlyIncreasing = true, lastCheckedValue = -Infinity
 *       currentIndexCheck = 0 (nums[0]=1). 1 > -Infinity. lastCheckedValue = 1.
 *       currentIndexCheck = 1 (nums[1]=2), skip
 *       currentIndexCheck = 2 (nums[2]=3), skip
 *       isSubsequenceStrictlyIncreasing is true. totalIncremovableCount = 5.
 *
 *   subarrayStart = 2:
 *     subarrayEnd = 2 (subarray [3]):
 *       Remaining: [1, 2]
 *       isSubsequenceStrictlyIncreasing = true, lastCheckedValue = -Infinity
 *       currentIndexCheck = 0 (nums[0]=1). 1 > -Infinity. lastCheckedValue = 1.
 *       currentIndexCheck = 1 (nums[1]=2). 2 > 1. lastCheckedValue = 2.
 *       currentIndexCheck = 2 (nums[2]=3), skip
 *       isSubsequenceStrictlyIncreasing is true. totalIncremovableCount = 6.
 *
 *   Return totalIncremovableCount = 6.
 * Time Complexity: O(N^3)
 * Space Complexity: O(1)
 */
var incremovableSubarrayCount = function (nums) {
  let totalIncremovableCount = 0;

  for (let subarrayStart = 0; subarrayStart < nums.length; subarrayStart++) {
    for (
      let subarrayEnd = subarrayStart;
      subarrayEnd < nums.length;
      subarrayEnd++
    ) {
      let isSubsequenceStrictlyIncreasing = true;
      let lastCheckedValue = -Infinity;

      for (
        let currentIndexCheck = 0;
        currentIndexCheck < nums.length;
        currentIndexCheck++
      ) {
        if (
          currentIndexCheck >= subarrayStart &&
          currentIndexCheck <= subarrayEnd
        ) {
          continue;
        }
        if (nums[currentIndexCheck] <= lastCheckedValue) {
          isSubsequenceStrictlyIncreasing = false;
          break;
        }
        lastCheckedValue = nums[currentIndexCheck];
      }

      if (isSubsequenceStrictlyIncreasing) {
        totalIncremovableCount++;
      }
    }
  }

  return totalIncremovableCount;
};
