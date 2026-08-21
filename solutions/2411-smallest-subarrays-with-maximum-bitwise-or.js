/**
 * Smallest Subarrays With Maximum Bitwise Or
 * Intuition: The maximum possible bitwise OR for any subarray starting at a given index `i` is achieved by OR-ing all elements from `nums[i]` to `nums[n-1]`. To find the *smallest* subarray `nums[i...j]` that yields this maximum OR, we need to find the smallest `j` such that all bits set in `nums[i...n-1]` are also set by at least one number in `nums[i...j]`. This means `j` must be the furthest right index needed to "cover" all these required bits.
 * Approach:
 * 1. Initialize an array `resultLengths` of size `n` to store the answer, and an array `lastOccurrenceIndices` of size 32 (for bits 0-31) to keep track of the rightmost index where each bit is set. Initialize `lastOccurrenceIndices` with zeros.
 * 2. Iterate `startIndex` from `n - 1` down to `0`. This backward iteration allows `lastOccurrenceIndices` to correctly track the rightmost index for bits encountered from `startIndex` onwards.
 * 3. Inside the loop, for the `currentValue` at `nums[startIndex]`:
 *    a. Iterate `bitIndexPosition` from `0` to `31`. If the `bitIndexPosition`-th bit is set in `currentValue`, update `lastOccurrenceIndices[bitIndexPosition]` to `startIndex`. This ensures `lastOccurrenceIndices[bitIndexPosition]` always holds the latest (rightmost) index where `bitIndexPosition` was set, considering `nums[startIndex...n-1]`.
 *    b. Initialize a variable `maximumReachIndex` with `startIndex`.
 *    c. Iterate `bitChecker` from `0` to `31`. Update `maximumReachIndex` to be the maximum of its current value and `lastOccurrenceIndices[bitChecker]`. After this loop, `maximumReachIndex` will contain the largest index `j` such that `nums[j]` contributes at least one bit to the overall maximum OR for `nums[startIndex...n-1]`.
 *    d. The length of the smallest subarray starting at `startIndex` that achieves the maximum OR is `maximumReachIndex - startIndex + 1`. Store this value in `resultLengths[startIndex]`.
 * 4. Return `resultLengths`.
 * Dry Run: nums = [1, 5, 2]
 * arrayLength = 3
 * resultLengths = [0, 0, 0]
 * lastOccurrenceIndices = [0, 0, ..., 0] (32 zeros)
 *
 * startIndex = 2 (currentValue = nums[2] = 2, binary 0010)
 *   bitIndexPosition loop:
 *     bitIndexPosition = 1: (2 & (1 << 1)) is non-zero. lastOccurrenceIndices[1] = 2.
 *   lastOccurrenceIndices is now [0, 2, 0, ..., 0]
 *   maximumReachIndex = 2 (initialized with startIndex)
 *   bitChecker loop:
 *     bitChecker = 1: lastOccurrenceIndices[1] is 2. maximumReachIndex = Math.max(2, 2) = 2.
 *   resultLengths[2] = 2 - 2 + 1 = 1. (Subarray [2], OR is 2)
 *
 * startIndex = 1 (currentValue = nums[1] = 5, binary 0101)
 *   bitIndexPosition loop:
 *     bitIndexPosition = 0: (5 & (1 << 0)) is non-zero. lastOccurrenceIndices[0] = 1.
 *     bitIndexPosition = 2: (5 & (1 << 2)) is non-zero. lastOccurrenceIndices[2] = 1.
 *   lastOccurrenceIndices is now [1, 2, 1, 0, ..., 0]
 *   maximumReachIndex = 1 (initialized with startIndex)
 *   bitChecker loop:
 *     bitChecker = 0: lastOccurrenceIndices[0] is 1. maximumReachIndex = Math.max(1, 1) = 1.
 *     bitChecker = 1: lastOccurrenceIndices[1] is 2. maximumReachIndex = Math.max(1, 2) = 2.
 *     bitChecker = 2: lastOccurrenceIndices[2] is 1. maximumReachIndex = Math.max(2, 1) = 2.
 *   resultLengths[1] = 2 - 1 + 1 = 2. (Subarray [5, 2], OR is 5|2=7)
 *
 * startIndex = 0 (currentValue = nums[0] = 1, binary 0001)
 *   bitIndexPosition loop:
 *     bitIndexPosition = 0: (1 & (1 << 0)) is non-zero. lastOccurrenceIndices[0] = 0.
 *   lastOccurrenceIndices is now [0, 2, 1, 0, ..., 0]
 *   maximumReachIndex = 0 (initialized with startIndex)
 *   bitChecker loop:
 *     bitChecker = 0: lastOccurrenceIndices[0] is 0. maximumReachIndex = Math.max(0, 0) = 0.
 *     bitChecker = 1: lastOccurrenceIndices[1] is 2. maximumReachIndex = Math.max(0, 2) = 2.
 *     bitChecker = 2: lastOccurrenceIndices[2] is 1. maximumReachIndex = Math.max(2, 1) = 2.
 *   resultLengths[0] = 2 - 0 + 1 = 3. (Subarray [1, 5, 2], OR is 1|5|2=7)
 *
 * Final resultLengths = [3, 2, 1]
 * Time Complexity: O(N * (Number of Bits)) = O(N * 32) = O(N)
 * Space Complexity: O(N + Number of Bits) = O(N + 32) = O(N)
 */
var smallestSubarrays = function (nums) {
  const arrayLength = nums.length;
  const resultLengths = new Array(arrayLength).fill(0);
  const lastOccurrenceIndices = new Array(32).fill(0);

  for (let startIndex = arrayLength - 1; startIndex >= 0; startIndex--) {
    const currentValue = nums[startIndex];

    for (let bitIndexPosition = 0; bitIndexPosition < 32; bitIndexPosition++) {
      if ((currentValue >> bitIndexPosition) & 1) {
        lastOccurrenceIndices[bitIndexPosition] = startIndex;
      }
    }

    let maximumReachIndex = startIndex;
    for (let bitChecker = 0; bitChecker < 32; bitChecker++) {
      maximumReachIndex = Math.max(
        maximumReachIndex,
        lastOccurrenceIndices[bitChecker]
      );
    }

    resultLengths[startIndex] = maximumReachIndex - startIndex + 1;
  }

  return resultLengths;
};
