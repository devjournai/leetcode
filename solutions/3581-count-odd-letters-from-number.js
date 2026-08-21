/**
 * Count Odd Letters from Number
 * Intuition: Write each digit as an English word and XOR letter frequencies. Bits still set at the end are letters with odd count.
 * Approach: 1. Map 0-9 to words. 2. For each digit, XOR a bitmask of its letters. 3. Return popcount of the mask.
 * Dry Run: n = 23 → "two"+"three". Letters t,w,o,t,h,r,e,e. Odds: w,o,h,r,t (e even). Count 5? t appears twice (even), w,o,h,r,e,e → e even, t even: w,o,h,r = 4.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var countOddLetters = function (n) {
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  let mask = 0;
  while (n > 0) {
    const digit = n % 10;
    n = Math.floor(n / 10);
    for (const char of words[digit]) {
      mask ^= 1 << (char.charCodeAt(0) - 97);
    }
  }

  let count = 0;
  while (mask) {
    count += mask & 1;
    mask >>= 1;
  }
  return count;
};
