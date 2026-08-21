/**
 * Sum Of Two Integers
 * Intuition: XOR mixes bits without carrying; AND<<1 is the carry. Recurse until the carry vanishes, which is addition without the `+` operator.
 * Approach: 1. `currentXorSum = a ^ b`, `nextCarry = (a & b) << 1`. 2. If carry is 0, return the XOR. 3. Otherwise recurse `getSum(xor, carry)`.
 * Dry Run: a = 1 (01), b = 2 (10). XOR = 3, carry = 0 → return 3.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var getSum = function (a, b) {
  const currentXorSum = a ^ b;
  const nextCarry = (a & b) << 1;

  if (nextCarry === 0) {
    return currentXorSum;
  }

  return getSum(currentXorSum, nextCarry);
};
