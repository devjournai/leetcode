/**
 * Bitwise And Of Numbers Range
 * Intuition: AND of every integer in [left, right] keeps only bits that never flip in the range. Walking from the high bit, those bits are the shared prefix of left and right; the first differing bit and everything below become 0.
 * Approach: 1. Start result at 0 and scan bit positions 30 down to 0. 2. If left and right share a 1 at that bit, OR it into the result. 3. If they share a 0, leave the bit off and continue. 4. On the first mismatch, stop: lower bits are mixed by the range. 5. Return the accumulated prefix.
 * Dry Run: left = 5 (101b), right = 7 (111b).
 *   - Bits 30..3: both 0, skip.
 *   - Bit 2 (value 4): both 1 → result = 4.
 *   - Bit 1: left 0, right 1 → break.
 *   - Return 4 (5 & 6 & 7 = 4).
 * Time Complexity: O(log(right))
 * Space Complexity: O(1)
 */
var rangeBitwiseAnd = function (left, right) {
  let commonPrefixResult = 0;
  for (
    let currentBitPosition = 30;
    currentBitPosition >= 0;
    currentBitPosition--
  ) {
    const bitIdentifier = 1 << currentBitPosition;
    if ((left & bitIdentifier) === (right & bitIdentifier)) {
      if ((left & bitIdentifier) !== 0) {
        commonPrefixResult |= bitIdentifier;
      }
    } else {
      break;
    }
  }
  return commonPrefixResult;
};
