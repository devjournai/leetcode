/**
 * Mirror Distance of an Integer
 * Intuition: Mirror distance is |n - reverse_digits(n)|, ignoring leading zeros of the reversed decimal string via parseInt.
 * Approach: 1. Convert n to string, reverse characters, parseInt. 2. Return abs(n - reversed).
 * Dry Run: n = 120. reverse string "021" → 21. |120-21| = 99.
 * Time Complexity: O(log10(n))
 * Space Complexity: O(log10(n))
 */
var mirrorDistance = function (n) {
  const originalN = n;
  const nStr = n.toString();
  const reversedStr = nStr.split("").reverse().join("");
  const reversedN = parseInt(reversedStr, 10);
  return Math.abs(originalN - reversedN);
};
