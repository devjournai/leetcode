/**
 * Gray Code
 * Intuition: The n-bit Gray code sequence is i XOR (i shifted right by 1) for i from 0 to 2^n-1, which changes exactly one bit between consecutive values.
 * Approach: 1. total = 1 << n. 2. For currentCount from 0 to total-1, push currentCount ^ (currentCount >> 1).
 * Dry Run: n=2 → 0^0=0, 1^0=1, 2^1=3, 3^1=2 → [0,1,3,2]
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
 */
var grayCode = function (n) {
  const graySequence = [];
  const totalElements = 1 << n;

  for (let currentCount = 0; currentCount < totalElements; currentCount++) {
    const grayValue = currentCount ^ (currentCount >> 1);
    graySequence.push(grayValue);
  }

  return graySequence;
};
