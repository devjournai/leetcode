/**
 * Remove 9
 * Intuition: Numbers written without digit 9 are exactly base-9 counting displayed with digits 0–8. The n-th such number is n in base 9, then parsed as decimal.
 * Approach: 1. `n.toString(9)` converts to base 9. 2. `parseInt(..., 10)` interprets those digits as a decimal integer. 3. Return it.
 * Dry Run: n = 9.
 *   - 9 in base 9 is "10". parseInt("10", 10) = 10. Return 10.
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
var newInteger = function (n) {
  const convertedToBaseNine = n.toString(9);
  const finalSequenceNumber = parseInt(convertedToBaseNine, 10);

  return finalSequenceNumber;
};
