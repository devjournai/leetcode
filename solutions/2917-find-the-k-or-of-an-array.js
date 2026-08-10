/**
 * Find The K Or Of An Array
 * Intuition: The K-or operation requires determining for each bit position whether at least 'k' numbers in the input array have that bit set. This suggests iterating through each bit position and, for each position, checking all numbers in the array.
 * Approach: 1. Initialize a variable, `kOrResult`, to 0 to store the final K-or value. 2. Iterate through possible bit positions from 0 up to 31 (representing 32-bit integers). 3. For each `currentBitPosition`, initialize a counter, `countSetBits`, to 0. 4. Iterate through each `arrayElement` in the input `nums` array. 5. Check if the `currentBitPosition`-th bit is set in the `arrayElement` using a bitwise AND operation with a bitmask `(1 << currentBitPosition)`. If it is set, increment `countSetBits`. 6. After checking all `arrayElement`s for the `currentBitPosition`, if `countSetBits` is greater than or equal to `k`, set the `currentBitPosition`-th bit in `kOrResult` using a bitwise OR operation: `kOrResult |= (1 << currentBitPosition)`. 7. After iterating through all `currentBitPosition`s, return `kOrResult`.
 * Dry Run: nums = [7, 12, 9, 8, 2], k = 2
 *  kOrResult = 0
 *
 *  currentBitPosition = 0: (bitmask = 1)
 *    countSetBits = 0
 *    arrayElement 7 (0111): 7 & 1 = 1 (set). countSetBits = 1.
 *    arrayElement 12 (1100): 12 & 1 = 0 (not set).
 *    arrayElement 9 (1001): 9 & 1 = 1 (set). countSetBits = 2.
 *    arrayElement 8 (1000): 8 & 1 = 0 (not set).
 *    arrayElement 2 (0010): 2 & 1 = 0 (not set).
 *    countSetBits (2) >= k (2). kOrResult |= (1 << 0) => kOrResult = 0 | 1 = 1.
 *
 *  currentBitPosition = 1: (bitmask = 2)
 *    countSetBits = 0
 *    arrayElement 7 (0111): 7 & 2 = 2 (set). countSetBits = 1.
 *    arrayElement 12 (1100): 12 & 2 = 0 (not set).
 *    arrayElement 9 (1001): 9 & 2 = 0 (not set).
 *    arrayElement 8 (1000): 8 & 2 = 0 (not set).
 *    arrayElement 2 (0010): 2 & 2 = 2 (set). countSetBits = 2.
 *    countSetBits (2) >= k (2). kOrResult |= (1 << 1) => kOrResult = 1 | 2 = 3.
 *
 *  currentBitPosition = 2: (bitmask = 4)
 *    countSetBits = 0
 *    arrayElement 7 (0111): 7 & 4 = 4 (set). countSetBits = 1.
 *    arrayElement 12 (1100): 12 & 4 = 4 (set). countSetBits = 2.
 *    arrayElement 9 (1001): 9 & 4 = 0 (not set).
 *    arrayElement 8 (1000): 8 & 4 = 0 (not set).
 *    arrayElement 2 (0010): 2 & 4 = 0 (not set).
 *    countSetBits (2) >= k (2). kOrResult |= (1 << 2) => kOrResult = 3 | 4 = 7.
 *
 *  currentBitPosition = 3: (bitmask = 8)
 *    countSetBits = 0
 *    arrayElement 7 (0111): 7 & 8 = 0 (not set).
 *    arrayElement 12 (1100): 12 & 8 = 8 (set). countSetBits = 1.
 *    arrayElement 9 (1001): 9 & 8 = 8 (set). countSetBits = 2.
 *    arrayElement 8 (1000): 8 & 8 = 8 (set). countSetBits = 3.
 *    arrayElement 2 (0010): 2 & 8 = 0 (not set).
 *    countSetBits (3) >= k (2). kOrResult |= (1 << 3) => kOrResult = 7 | 8 = 15.
 *
 *  ... (for currentBitPosition from 4 to 31, countSetBits will be 0)
 *
 * Final kOrResult = 15.
 * Time Complexity: O(N * B)
 * Space Complexity: O(1)
 */
var findKOr = function (nums, k) {
  let kOrResult = 0;

  for (
    let currentBitPosition = 0;
    currentBitPosition < 32;
    currentBitPosition++
  ) {
    let countSetBits = 0;
    let currentBitMask = 1 << currentBitPosition;

    for (const arrayElement of nums) {
      if ((arrayElement & currentBitMask) !== 0) {
        countSetBits++;
      }
    }

    if (countSetBits >= k) {
      kOrResult |= currentBitMask;
    }
  }

  return kOrResult;
};
