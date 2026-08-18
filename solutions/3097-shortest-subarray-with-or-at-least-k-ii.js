/**
 * Shortest Subarray With Or At Least K Ii
 * Intuition: The problem asks for the shortest subarray whose bitwise OR sum is at least `k`. This pattern often suggests a sliding window approach, especially when dealing with non-negative integers where adding elements generally increases or maintains the bitwise OR value, and removing elements might decrease it. We need to efficiently track the bitwise OR sum of the current window and shrink the window from the left when the condition is met.
 * Approach: 1. Initialize `shortestLengthFound` to infinity, `currentWindowOr` to 0, and `leftBoundary` to 0. Also, maintain an array `bitPresenceCounts` of size 32 to store the count of each bit position set within the current sliding window.
 * 2. Iterate `rightBoundary` from the beginning to the end of the `nums` array.
 * 3. For each `currentNumber` at `nums[rightBoundary]`:
 *    a. Iterate `bitPosition` from 0 to 31. If the `bitPosition`-th bit is set in `currentNumber`, increment `bitPresenceCounts[bitPosition]`.
 *    b. Update `currentWindowOr`: if `bitPresenceCounts[bitPosition]` becomes greater than 0, set the `bitPosition`-th bit in `currentWindowOr`.
 * 4. While `currentWindowOr` is greater than or equal to `k` and `leftBoundary` is less than or equal to `rightBoundary`:
 *    a. Update `shortestLengthFound` with the minimum of its current value and the current window length (`rightBoundary - leftBoundary + 1`).
 *    b. Consider `leftBoundaryValue` at `nums[leftBoundary]` for removal. Iterate `bitIndex` from 0 to 31. If the `bitIndex`-th bit is set in `leftBoundaryValue`, decrement `bitPresenceCounts[bitIndex]`.
 *    c. If `bitPresenceCounts[bitIndex]` becomes 0 after decrementing, it means that this bit is no longer present in any number within the current window, so clear the `bitIndex`-th bit in `currentWindowOr`.
 *    d. Increment `leftBoundary`.
 * 5. After iterating through all `rightBoundary` positions, return `shortestLengthFound` if it's not infinity; otherwise, return -1, indicating no such subarray exists.
 * Dry Run: nums = [1, 2, 3], k = 3
 * Initial: shortestLengthFound = Infinity, currentWindowOr = 0, leftBoundary = 0, bitPresenceCounts = [0]*32
 *
 * rightBoundary = 0 (currentNumber = 1):
 *   Update bits for 1 (binary 001): bitPresenceCounts[0] = 1. currentWindowOr = 1.
 *   currentWindowOr (1) < k (3). Skip while loop.
 *
 * rightBoundary = 1 (currentNumber = 2):
 *   Update bits for 2 (binary 010): bitPresenceCounts[1] = 1. currentWindowOr = 1 | 2 = 3.
 *   currentWindowOr (3) >= k (3) && leftBoundary (0) <= rightBoundary (1):
 *     shortestLengthFound = min(Infinity, 1 - 0 + 1) = 2.
 *     leftBoundaryValue = nums[0] = 1 (binary 001).
 *     Remove bits for 1: bitPresenceCounts[0] = 0. Since bitPresenceCounts[0] is 0, clear bit 0 in currentWindowOr. currentWindowOr = 3 & ~1 = 2.
 *     leftBoundary = 1.
 *   currentWindowOr (2) < k (3). Exit while loop.
 *
 * rightBoundary = 2 (currentNumber = 3):
 *   Update bits for 3 (binary 011): bitPresenceCounts[0] = 1, bitPresenceCounts[1] = 2. currentWindowOr = 2 | 1 = 3.
 *   currentWindowOr (3) >= k (3) && leftBoundary (1) <= rightBoundary (2):
 *     shortestLengthFound = min(2, 2 - 1 + 1) = 2.
 *     leftBoundaryValue = nums[1] = 2 (binary 010).
 *     Remove bits for 2: bitPresenceCounts[1] = 1. (bitPresenceCounts[1] is not 0, so currentWindowOr remains 3).
 *     leftBoundary = 2.
 *   currentWindowOr (3) >= k (3) && leftBoundary (2) <= rightBoundary (2):
 *     shortestLengthFound = min(2, 2 - 2 + 1) = 1.
 *     leftBoundaryValue = nums[2] = 3 (binary 011).
 *     Remove bits for 3: bitPresenceCounts[0] = 0. Clear bit 0 in currentWindowOr. currentWindowOr = 3 & ~1 = 2.
 *                      bitPresenceCounts[1] = 0. Clear bit 1 in currentWindowOr. currentWindowOr = 2 & ~2 = 0.
 *     leftBoundary = 3.
 *   currentWindowOr (0) < k (3). Exit while loop.
 *
 * End of loop. shortestLengthFound = 1.
 * Return 1.
 * Time Complexity: O(N * C)
 * Space Complexity: O(C)
 */
var minimumSubarrayLength = function (nums, k) {
  if (k === 0) return 1;

  const bitPresenceCounts = new Array(32).fill(0);
  let shortestLengthFound = Infinity;
  let currentWindowOr = 0;
  let leftBoundary = 0;

  for (let rightBoundary = 0; rightBoundary < nums.length; rightBoundary++) {
    const currentNumber = nums[rightBoundary];
    for (let bitPosition = 0; bitPosition < 32; bitPosition++) {
      if ((currentNumber & (1 << bitPosition)) !== 0) {
        bitPresenceCounts[bitPosition]++;
      }
      if (bitPresenceCounts[bitPosition] > 0) {
        currentWindowOr |= 1 << bitPosition;
      }
    }

    while (currentWindowOr >= k && leftBoundary <= rightBoundary) {
      shortestLengthFound = Math.min(
        shortestLengthFound,
        rightBoundary - leftBoundary + 1,
      );
      const leftBoundaryValue = nums[leftBoundary];
      for (
        let bitIndexToRemove = 0;
        bitIndexToRemove < 32;
        bitIndexToRemove++
      ) {
        if ((leftBoundaryValue & (1 << bitIndexToRemove)) !== 0) {
          bitPresenceCounts[bitIndexToRemove]--;
          if (bitPresenceCounts[bitIndexToRemove] === 0) {
            currentWindowOr &= ~(1 << bitIndexToRemove);
          }
        }
      }
      leftBoundary++;
    }
  }

  return shortestLengthFound === Infinity ? -1 : shortestLengthFound;
};
