/**
 * Longest Nice Subarray
 * Intuition: A subarray is nice if no two elements share any common set bit. This means the bitwise OR of all elements in a nice subarray will have set bits only where exactly one element has that bit set. If we add a new element, its bits must not overlap with any bits already set in the current subarray's combined bitmask.
 * Approach: 1. Use a sliding window `[leftIndex, rightIndex]` to track the current subarray. 2. Maintain a `accumulatedBits` variable which is the bitwise OR of all numbers in the current window. 3. Iterate with `rightIndex` to expand the window. 4. For each `currentElement` at `nums[rightIndex]`, check if it overlaps with `accumulatedBits`. 5. If `(accumulatedBits & currentElement) !== 0`, meaning there's an overlap, shrink the window from the `leftIndex` by XORing `nums[leftIndex]` from `accumulatedBits` and incrementing `leftIndex`, until no overlap exists. 6. Once there's no overlap, add `currentElement` to `accumulatedBits` using bitwise OR. 7. Update `longestLength` with the maximum length of the current valid window `(rightIndex - leftIndex + 1)`.
 * Dry Run: nums = [1, 2, 3]
 *   longestLength = 1, leftIndex = 0, accumulatedBits = 0
 *
 *   rightIndex = 0, currentElement = 1 (binary 01)
 *     (accumulatedBits & currentElement) = (0 & 1) = 0. No overlap.
 *     accumulatedBits = 0 | 1 = 1 (binary 01).
 *     longestLength = Math.max(1, 0 - 0 + 1) = 1.
 *
 *   rightIndex = 1, currentElement = 2 (binary 10)
 *     (accumulatedBits & currentElement) = (1 & 2) = (01 & 10) = 0. No overlap.
 *     accumulatedBits = 1 | 2 = 3 (binary 11).
 *     longestLength = Math.max(1, 1 - 0 + 1) = 2. (Subarray [1, 2] is nice)
 *
 *   rightIndex = 2, currentElement = 3 (binary 11)
 *     (accumulatedBits & currentElement) = (3 & 3) = (11 & 11) = 3. Overlap detected.
 *     WHILE loop starts:
 *       elementToRemove = nums[leftIndex] = nums[0] = 1 (binary 01).
 *       accumulatedBits = 3 ^ 1 = (11 ^ 01) = 2 (binary 10).
 *       leftIndex = 1.
 *       (accumulatedBits & currentElement) = (2 & 3) = (10 & 11) = 2. Overlap persists.
 *     WHILE loop continues:
 *       elementToRemove = nums[leftIndex] = nums[1] = 2 (binary 10).
 *       accumulatedBits = 2 ^ 2 = (10 ^ 10) = 0 (binary 00).
 *       leftIndex = 2.
 *       (accumulatedBits & currentElement) = (0 & 3) = 0. No overlap. WHILE loop ends.
 *     accumulatedBits = 0 | 3 = 3 (binary 11).
 *     longestLength = Math.max(2, 2 - 2 + 1) = 2. (Subarray [3] is nice; current window [3] length 1. Before adding 3, window was empty, then 3 added, so current window is [3] from index 2 to 2.)
 *
 *   End of loop.
 *   Return longestLength = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestNiceSubarray = function (nums) {
  let longestLength = 1;
  let leftIndex = 0;
  let accumulatedBits = 0;

  for (let rightIndex = 0; rightIndex < nums.length; rightIndex++) {
    let currentElement = nums[rightIndex];

    while ((accumulatedBits & currentElement) !== 0) {
      let elementToRemove = nums[leftIndex];
      accumulatedBits ^= elementToRemove;
      leftIndex++;
    }

    accumulatedBits |= currentElement;
    longestLength = Math.max(longestLength, rightIndex - leftIndex + 1);
  }

  return longestLength;
};
