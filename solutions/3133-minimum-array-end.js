/**
 * Minimum Array End
 * Intuition: nums[0] = x, and each next value is the next integer that has all bits of x set (i.e. OR x equals itself). This is filling the zero-bits of x with the binary digits of (n-1).
 * Approach: 1. Walk bits of x. 2. Whenever a bit of x is 0, take the next bit of (n-1). 3. Always keep bits that are already 1 in x.
 * Dry Run:
 *   n = 3, x = 4 (100b). n-1=2 (10b). Fill zeros of 100 with 10 from low bits -> 110b = 6.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minEnd = function (n, x) {
  let remainingFillBits = BigInt(n - 1);
  let resultValue = BigInt(x);
  let bitMask = 1n;
  while (remainingFillBits > 0n) {
    if ((resultValue & bitMask) === 0n) {
      if (remainingFillBits & 1n) {
        resultValue |= bitMask;
      }
      remainingFillBits >>= 1n;
    }
    bitMask <<= 1n;
  }
  return Number(resultValue);
};
