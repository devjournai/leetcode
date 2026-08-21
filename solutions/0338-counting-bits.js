/**
 * Counting Bits
 * Intuition: The popcount of i is the popcount of i without its last bit (i >> 1) plus that last bit (i & 1). Fill an array from 1 to n with that recurrence.
 * Approach: 1. Allocate n + 1 zeros. 2. For numberIndex from 1 to n, set finalCounts[i] = finalCounts[i >> 1] + (i & 1). 3. Return the array.
 * Dry Run: n = 2.
 *   - 1: (0 >> 1) + 1 → 1. 2: (2 >> 1) + 0 → 1.
 *   - [0, 1, 1].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var countBits = function (n) {
  const finalCounts = new Array(n + 1).fill(0);
  let numberIndex = 1;
  while (numberIndex <= n) {
    const shiftedNumber = numberIndex >> 1;
    const leastSignificantBit = numberIndex & 1;
    finalCounts[numberIndex] = finalCounts[shiftedNumber] + leastSignificantBit;
    numberIndex++;
  }
  return finalCounts;
};
