/**
 * Binary Number With Alternating Bits
 * Intuition: Adjacent bits in n must differ. Walk n from LSB to MSB and reject if two consecutive extracted bits are equal.
 * Approach: 1. `lastProcessedBit = n & 1`, then shift n right. 2. While remaining > 0, extract LSB; if equal to last, return false; else update and shift. 3. Return true.
 * Dry Run: n=5 (101). last=1, rest=2 (10). bit=0 ≠1; last=0, rest=1. bit=1 ≠0; rest=0. Return true.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var hasAlternatingBits = function (n) {
  let lastProcessedBit = n & 1;
  let numberToProcess = n >> 1;

  while (numberToProcess > 0) {
    let currentExtractedBit = numberToProcess & 1;

    if (currentExtractedBit === lastProcessedBit) {
      return false;
    }

    lastProcessedBit = currentExtractedBit;
    numberToProcess = numberToProcess >> 1;
  }

  return true;
};
