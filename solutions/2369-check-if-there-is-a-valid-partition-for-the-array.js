/**
 * Check If There Is A Valid Partition For The Array
 * Intuition: This problem can be solved using dynamic programming. We need to determine if a prefix of the array can be validly partitioned. If a prefix `nums[0...k-1]` can be partitioned, it means the last segment `nums[j...k-1]` forms a valid subarray (either 2 equal, 3 equal, or 3 consecutive increasing elements) and the preceding prefix `nums[0...j-1]` was also validly partitioned.
 * Approach: 1. Initialize a boolean array `partitionPossible` of size `nums.length + 1`, where `partitionPossible[k]` is `true` if the subarray `nums[0...k-1]` can be validly partitioned, and `false` otherwise. 2. Set `partitionPossible[0]` to `true` to represent a valid partition of an empty prefix. 3. Iterate a `processingIndex` from 2 up to `nums.length` (representing the current prefix length `k`). 4. For each `processingIndex`, check if `nums[0...processingIndex-1]` can be validly partitioned:
 *    a. Check if the last two elements (`nums[processingIndex-1]` and `nums[processingIndex-2]`) form a valid 2-equal segment AND the prefix `nums[0...processingIndex-3]` (`partitionPossible[processingIndex-2]`) was validly partitioned. If so, set `partitionPossible[processingIndex]` to `true`.
 *    b. Otherwise, if `processingIndex` is at least 3, check if the last three elements (`nums[processingIndex-1]`, `nums[processingIndex-2]`, `nums[processingIndex-3]`) form a valid 3-equal segment AND the prefix `nums[0...processingIndex-4]` (`partitionPossible[processingIndex-3]`) was validly partitioned. If so, set `partitionPossible[processingIndex]` to `true`.
 *    c. Otherwise, if `processingIndex` is at least 3, check if the last three elements form a valid 3-consecutive-increasing segment AND the prefix `nums[0...processingIndex-4]` (`partitionPossible[processingIndex-3]`) was validly partitioned. If so, set `partitionPossible[processingIndex]` to `true`.
 * 5. After the loop, `partitionPossible[nums.length]` will hold the final result.
 * Dry Run: nums = [4,4,4,5,6]
 * arrayLen = 5
 * partitionPossible = [true, false, false, false, false, false]
 *
 * processingIndex = 2:
 *   twoElementsMatch = (nums[1] === nums[0]) => (4 === 4) => true
 *   threeElementsMatch = false, threeElementsConsecutive = false
 *   if (true && partitionPossible[0]) => partitionPossible[2] = true
 *   partitionPossible = [true, false, true, false, false, false]
 *
 * processingIndex = 3:
 *   twoElementsMatch = (nums[2] === nums[1]) => (4 === 4) => true
 *   threeElementsMatch = (nums[2] === nums[1] && nums[1] === nums[0]) => (4 === 4 && 4 === 4) => true
 *   threeElementsConsecutive = false
 *   if (twoElementsMatch && partitionPossible[1]) => (true && false) => false
 *   else if (processingIndex >= 3 && threeElementsMatch && partitionPossible[0]) => (true && true && true) => true
 *   partitionPossible[3] = true
 *   partitionPossible = [true, false, true, true, false, false]
 *
 * processingIndex = 4:
 *   twoElementsMatch = (nums[3] === nums[2]) => (5 === 4) => false
 *   threeElementsMatch = (nums[3] === nums[2] && nums[2] === nums[1]) => (5 === 4 && 4 === 4) => false
 *   threeElementsConsecutive = (nums[3] === nums[2] + 1 && nums[2] === nums[1] + 1) => (5 === 4+1 && 4 === 4+1) => (true && false) => false
 *   All conditions false, partitionPossible[4] remains false
 *   partitionPossible = [true, false, true, true, false, false]
 *
 * processingIndex = 5:
 *   twoElementsMatch = (nums[4] === nums[3]) => (6 === 5) => false
 *   threeElementsMatch = (nums[4] === nums[3] && nums[3] === nums[2]) => (6 === 5 && 5 === 4) => false
 *   threeElementsConsecutive = (nums[4] === nums[3] + 1 && nums[3] === nums[2] + 1) => (6 === 5+1 && 5 === 4+1) => (true && true) => true
 *   if (false...)
 *   else if (false...)
 *   else if (processingIndex >= 3 && threeElementsConsecutive && partitionPossible[2]) => (true && true && true) => true
 *   partitionPossible[5] = true
 *   partitionPossible = [true, false, true, true, false, true]
 *
 * Return partitionPossible[5] which is true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var validPartition = function (nums) {
  const arrayLen = nums.length;
  const partitionPossible = new Array(arrayLen + 1).fill(false);
  partitionPossible[0] = true;

  let processingIndex = 2;
  while (processingIndex <= arrayLen) {
    let twoElementsMatch =
      nums[processingIndex - 1] === nums[processingIndex - 2];
    let threeElementsMatch = false;
    let threeElementsConsecutive = false;

    if (processingIndex >= 3) {
      threeElementsMatch =
        nums[processingIndex - 1] === nums[processingIndex - 2] &&
        nums[processingIndex - 2] === nums[processingIndex - 3];
      threeElementsConsecutive =
        nums[processingIndex - 1] === nums[processingIndex - 2] + 1 &&
        nums[processingIndex - 2] === nums[processingIndex - 3] + 1;
    }

    if (twoElementsMatch && partitionPossible[processingIndex - 2]) {
      partitionPossible[processingIndex] = true;
    } else if (
      processingIndex >= 3 &&
      threeElementsMatch &&
      partitionPossible[processingIndex - 3]
    ) {
      partitionPossible[processingIndex] = true;
    } else if (
      processingIndex >= 3 &&
      threeElementsConsecutive &&
      partitionPossible[processingIndex - 3]
    ) {
      partitionPossible[processingIndex] = true;
    }
    processingIndex++;
  }

  return partitionPossible[arrayLen];
};
