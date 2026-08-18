/**
 * Guess The Number Using Bitwise Questions Ii
 * Intuition: The key insight is that calling `commonBits(num)` twice with the same `num` restores the original value of `n`. This allows us to query the `k`-th bit of the initial `n` without affecting subsequent bit queries.
 * Approach: 1. Initialize a `foundNumber` to 0. This variable will accumulate the bits of the target number. 2. Iterate through each bit position from 0 to 29 (since numbers are between 0 and 2^30 - 1). This is done by using a `currentBitMask` that starts at 1 and is left-shifted in each iteration. 3. For each `currentBitMask`, make two consecutive calls to `commonBits` with the same `currentBitMask`. Store the counts returned by the API calls into `firstCommonCount` and `secondCommonCount`. 4. Compare `firstCommonCount` and `secondCommonCount`. If `firstCommonCount` is greater than `secondCommonCount`, it implies that the corresponding bit in the *initial* number `n` was 1. 5. If the bit was 1, set that bit in `foundNumber` using a bitwise OR operation. 6. After iterating through all 30 bits, `foundNumber` will hold the initial value of `n`.
 * Dry Run: Suppose initial n = 5 (binary 101) and we target 3 bits.
 * - foundNumber = 0
 * - currentBitMask = 1 (001, for bit 0):
 *   - n (101), call commonBits(1): firstCommonCount = 2. n becomes (101 XOR 001 = 100).
 *   - n (100), call commonBits(1): secondCommonCount = 1. n becomes (100 XOR 001 = 101).
 *   - Since firstCommonCount (2) > secondCommonCount (1), bit 0 was 1. foundNumber = 0 | 1 = 1.
 * - currentBitMask = 2 (010, for bit 1):
 *   - n (101), call commonBits(2): firstCommonCount = 0. n becomes (101 XOR 010 = 111).
 *   - n (111), call commonBits(2): secondCommonCount = 1. n becomes (111 XOR 010 = 101).
 *   - Since firstCommonCount (0) is NOT > secondCommonCount (1), bit 1 was 0. foundNumber remains 1.
 * - currentBitMask = 4 (100, for bit 2):
 *   - n (101), call commonBits(4): firstCommonCount = 2. n becomes (101 XOR 100 = 001).
 *   - n (001), call commonBits(4): secondCommonCount = 1. n becomes (001 XOR 100 = 101).
 *   - Since firstCommonCount (2) > secondCommonCount (1), bit 2 was 1. foundNumber = 1 | 4 = 5.
 * - Loop ends. Return foundNumber (5).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var findNumber = function () {
  let foundNumber = 0;

  for (
    let currentBitMask = 1;
    currentBitMask < 1073741824;
    currentBitMask <<= 1
  ) {
    let firstCommonCount = commonBits(currentBitMask);
    let secondCommonCount = commonBits(currentBitMask);

    if (firstCommonCount > secondCommonCount) {
      foundNumber |= currentBitMask;
    }
  }

  return foundNumber;
};
