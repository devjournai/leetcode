/**
 * Hamming Distance
 * Intuition: XOR highlights bits that differ. Repeatedly clear the lowest set bit to count them.
 * Approach: 1. `bitwiseDifference = x ^ y`. 2. While nonzero, increment `differingBitsCount` and `difference &= difference-1`. 3. Return the count.
 * Dry Run: x=1, y=4. XOR 5 (101). Two clear-lowest-bit steps. Return 2.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var hammingDistance = function (x, y) {
  let bitwiseDifference = x ^ y;
  let differingBitsCount = 0;

  while (bitwiseDifference !== 0) {
    differingBitsCount++;
    bitwiseDifference &= bitwiseDifference - 1;
  }

  return differingBitsCount;
};
