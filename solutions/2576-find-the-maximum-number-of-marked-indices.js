/**
 * Find The Maximum Number Of Marked Indices
 * Intuition: To maximize the number of marked indices, we should prioritize pairing the smallest available numbers with the largest available numbers that satisfy the condition 2 * nums[i] <= nums[j]. Sorting the array allows for an efficient two-pointer approach to implement this greedy strategy by taking elements from the first half of the sorted array for `nums[i]` and from the second half for `nums[j]`.
 * Approach: 1. Sort the input array `nums` in ascending order. 2. Initialize a counter `cumulativeMarkedIndices` to zero. 3. Define a pointer `lowSearchIndex` starting at the beginning of the array (index 0) and another pointer `highSearchIndex` starting from the middle of the array (specifically, index `Math.floor(nums.length / 2)`). 4. Iterate using a `while` loop as long as `lowSearchIndex` remains within the conceptual "first half" (less than `Math.floor(nums.length / 2)`) AND `highSearchIndex` remains within the array bounds (less than `nums.length`). 5. Inside the loop, check if `2 * nums[lowSearchIndex] <= nums[highSearchIndex]`. If this condition is true, a valid pair has been found. Increment `cumulativeMarkedIndices` by 2 (since two indices are marked), then advance both `lowSearchIndex` and `highSearchIndex` to consider the next potential elements. 6. If the condition `2 * nums[lowSearchIndex] <= nums[highSearchIndex]` is false, it means `nums[highSearchIndex]` is not large enough to satisfy the condition for `nums[lowSearchIndex]`. In this case, only advance `highSearchIndex` to search for a larger number in the second half. 7. After the loop completes, return the final `cumulativeMarkedIndices`.
 * Dry Run: nums = [3, 4, 2, 3]
 *   1. arraySize = 4
 *   2. nums.sort((valA, valB) => valA - valB) transforms nums to [2, 3, 3, 4].
 *   3. cumulativeMarkedIndices = 0.
 *   4. lowSearchIndex = 0.
 *   5. lowerHalfLimit = Math.floor(4 / 2) = 2.
 *   6. highSearchIndex = 2.
 *   Loop 1: Condition (lowSearchIndex=0 < lowerHalfLimit=2) && (highSearchIndex=2 < arraySize=4) is true.
 *     - Evaluate: 2 * nums[0] (2 * 2 = 4) <= nums[2] (3). This is false.
 *     - Advance highSearchIndex to 3.
 *   Loop 2: Condition (lowSearchIndex=0 < lowerHalfLimit=2) && (highSearchIndex=3 < arraySize=4) is true.
 *     - Evaluate: 2 * nums[0] (2 * 2 = 4) <= nums[3] (4). This is true.
 *     - cumulativeMarkedIndices becomes 0 + 2 = 2.
 *     - Advance lowSearchIndex to 1.
 *     - Advance highSearchIndex to 4.
 *   Loop 3: Condition (lowSearchIndex=1 < lowerHalfLimit=2) && (highSearchIndex=4 < arraySize=4) is false (because 4 is not less than 4).
 *   Loop terminates.
 *   Return cumulativeMarkedIndices = 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxNumOfMarkedIndices = function (nums) {
  let arraySize = nums.length;
  nums.sort((valA, valB) => valA - valB);

  let cumulativeMarkedIndices = 0;
  let lowSearchIndex = 0;
  let lowerHalfLimit = Math.floor(arraySize / 2);
  let highSearchIndex = lowerHalfLimit;

  while (lowSearchIndex < lowerHalfLimit && highSearchIndex < arraySize) {
    if (2 * nums[lowSearchIndex] <= nums[highSearchIndex]) {
      cumulativeMarkedIndices += 2;
      lowSearchIndex++;
      highSearchIndex++;
    } else {
      highSearchIndex++;
    }
  }

  return cumulativeMarkedIndices;
};
