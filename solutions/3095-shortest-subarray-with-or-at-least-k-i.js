/**
 * Shortest Subarray With Or At Least K I
 * Intuition: The bitwise OR sum of a subarray can only increase or stay the same as more elements are included. This property allows us to stop extending a subarray once its OR sum reaches `k`, as any further extension starting from the same point will not result in a shorter valid subarray.
 * Approach: 1. Handle the base case where `k` is 0, returning 1 as any single element subarray satisfies the condition (since elements are non-negative, their OR sum will be >= 0). 2. Initialize `minLengthFound` to infinity to track the shortest valid subarray length. 3. Iterate through the input array using an outer loop with `startPointer` to define the beginning of each potential subarray. 4. For each `startPointer`, use an inner loop with `advancePointer` to extend the subarray to the right. 5. Maintain a running bitwise OR sum (`currentOrValue`) for the elements within the `[startPointer, advancePointer]` range. 6. If `currentOrValue` becomes greater than or equal to `k`, update `minLengthFound` with the current subarray's length (`advancePointer - startPointer + 1`). Crucially, `break` the inner loop because extending this subarray further will only make it longer or keep the same length (when comparing against future subarrays starting from the same `startPointer`). 7. After all possible subarrays have been checked, return `minLengthFound` if it was updated (not infinity); otherwise, return -1, indicating no special subarray was found.
 * Dry Run: nums = [1, 2, 3], k = 3
 *   minLengthFound = Infinity
 *   startPointer = 0:
 *     currentOrValue = 0
 *     advancePointer = 0: nums[0]=1. currentOrValue = 0|1 = 1. (1 < 3)
 *     advancePointer = 1: nums[1]=2. currentOrValue = 1|2 = 3. (3 >= 3)
 *       minLengthFound = Math.min(Infinity, 1-0+1) = 2.
 *       break inner loop.
 *   startPointer = 1:
 *     currentOrValue = 0
 *     advancePointer = 1: nums[1]=2. currentOrValue = 0|2 = 2. (2 < 3)
 *     advancePointer = 2: nums[2]=3. currentOrValue = 2|3 = 3. (3 >= 3)
 *       minLengthFound = Math.min(2, 2-1+1) = 2.
 *       break inner loop.
 *   startPointer = 2:
 *     currentOrValue = 0
 *     advancePointer = 2: nums[2]=3. currentOrValue = 0|3 = 3. (3 >= 3)
 *       minLengthFound = Math.min(2, 2-2+1) = 1.
 *       break inner loop.
 *   Final minLengthFound = 1. Return 1.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var minimumSubarrayLength = function (nums, k) {
  if (k === 0) {
    return 1;
  }

  let minLengthFound = Infinity;
  let arraySize = nums.length;

  for (let startPointer = 0; startPointer < arraySize; startPointer++) {
    let currentOrValue = 0;
    for (
      let advancePointer = startPointer;
      advancePointer < arraySize;
      advancePointer++
    ) {
      currentOrValue |= nums[advancePointer];
      if (currentOrValue >= k) {
        minLengthFound = Math.min(
          minLengthFound,
          advancePointer - startPointer + 1,
        );
        break;
      }
    }
  }

  return minLengthFound === Infinity ? -1 : minLengthFound;
};
