/**
 * Minimum Bit Flips To Convert Number
 * Intuition: The minimum number of bit flips required to convert one number to another is equivalent to the number of positions where their binary representations differ. The XOR operation (^) between two numbers yields a new number where each set bit (1) indicates a position where the original numbers had different bits, and each unset bit (0) indicates a position where they had the same bits.
 * Approach: 1. Calculate the XOR result of `start` and `goal` to identify all differing bit positions. Let this be `xorValue`. 2. Initialize a counter `flipsCount` to zero. 3. Count the number of set bits (1s) in `xorValue` using Brian Kernighan's algorithm: repeatedly subtract 1 from `xorValue` and then bitwise AND it with the current `xorValue`. Each iteration clears the least significant set bit, and we increment `flipsCount`. 4. Continue this process until `xorValue` becomes zero. The final `flipsCount` represents the minimum number of bit flips.
 * Dry Run: start = 3 (binary 011), goal = 5 (binary 101)
 *   1. xorValue = start ^ goal = 3 ^ 5 = 011 ^ 101 = 110 (decimal 6).
 *   2. Initialize flipsCount = 0.
 *   3. Loop while xorValue > 0:
 *      - Iteration 1:
 *        xorValue is 6 (110). It's greater than 0.
 *        flipsCount becomes 1.
 *        xorValue = xorValue & (xorValue - 1) = 6 & (6 - 1) = 6 & 5 = 110 & 101 = 100 (decimal 4).
 *      - Iteration 2:
 *        xorValue is 4 (100). It's greater than 0.
 *        flipsCount becomes 2.
 *        xorValue = xorValue & (xorValue - 1) = 4 & (4 - 1) = 4 & 3 = 100 & 011 = 000 (decimal 0).
 *      - Iteration 3:
 *        xorValue is 0. Loop terminates.
 *   4. Return flipsCount = 2.
 * Time Complexity: O(log(max(start, goal)))
 * Space Complexity: O(1)
 */
var minBitFlips = function (start, goal) {
  let xorValue = start ^ goal;
  let flipsCount = 0;

  while (xorValue > 0) {
    flipsCount++;
    xorValue = xorValue & (xorValue - 1);
  }

  return flipsCount;
};
