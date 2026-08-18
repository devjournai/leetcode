/**
 * Guess The Number Using Bitwise Questions I
 * Intuition: The `commonSetBits(num)` API returns 1 if the hidden number `n` shares a set bit with `num` and `num` has only one bit set. This allows us to probe each bit position of `n` independently.
 * Approach: 1. Initialize an accumulator variable `foundNumber` to 0. 2. Iterate from bit position 0 up to 29 (covering standard 32-bit positive integers). 3. In each iteration, create a `bitValue` mask with only the current bit position set (e.g., `1 << currentBitIndex`). 4. Call `commonSetBits(bitValue)`. If it returns 1, it means `n` has this bit set, so bitwise OR `bitValue` into `foundNumber`. 5. After iterating through all relevant bit positions, `foundNumber` will hold the value of `n`.
 * Dry Run: Suppose n = 6 (binary 110).
 *   foundNumber = 0
 *   currentBitIndex = 0:
 *     bitValue = 1 << 0 = 1 (binary 001)
 *     commonSetBits(1) -> (6 & 1) = 0, so returns 0.
 *     foundNumber remains 0.
 *   currentBitIndex = 1:
 *     bitValue = 1 << 1 = 2 (binary 010)
 *     commonSetBits(2) -> (6 & 2) = 2, so returns 1.
 *     foundNumber |= 2 -> foundNumber = 0 | 2 = 2 (binary 010)
 *   currentBitIndex = 2:
 *     bitValue = 1 << 2 = 4 (binary 100)
 *     commonSetBits(4) -> (6 & 4) = 4, so returns 1.
 *     foundNumber |= 4 -> foundNumber = 2 | 4 = 6 (binary 110)
 *   ... (subsequent currentBitIndex values up to 29 will result in commonSetBits returning 0 as 6 has no higher bits set)
 *   Loop finishes. Return foundNumber = 6.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var findNumber = function () {
  let foundNumber = 0;

  for (let currentBitIndex = 0; currentBitIndex < 30; currentBitIndex++) {
    const bitValue = 1 << currentBitIndex;
    if (commonSetBits(bitValue) === 1) {
      foundNumber |= bitValue;
    }
  }

  return foundNumber;
};
