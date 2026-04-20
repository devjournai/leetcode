/**
 * Binary Number With Alternating Bits
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
