/**
 * Check If Digits Are Equal in String After Operations I
 * Intuition: Repeatedly replace the string with pairwise digit sums mod 10 until two digits remain. With `n <= 100`, simulating each round is enough.
 * Approach: 1. While the string has more than two digits, build the next string: `next[i] = (s[i] + s[i+1]) % 10`. 2. Replace `s` with that result. 3. Return whether the final two digits are equal.
 * Dry Run: s = "3902" → "292" → "11" → equal, true. s = "34789" → "7157" → "862" → "48" → not equal.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var hasSameDigits = function (s) {
  let digits = s.split("").map(Number);

  while (digits.length > 2) {
    const nextDigits = [];
    for (let index = 0; index < digits.length - 1; index++) {
      nextDigits.push((digits[index] + digits[index + 1]) % 10);
    }
    digits = nextDigits;
  }

  return digits[0] === digits[1];
};
