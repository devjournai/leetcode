/**
 * Unique 3-Digit Even Numbers
 * Intuition: Every even 3-digit number is an ordered triple (hundreds, tens, ones) using distinct positions from digits, with a nonzero hundreds digit and an even ones digit. A set drops duplicate values that different index triples produce.
 * Approach: 1. Enumerate all index permutations of length 3. 2. Skip a leading 0 or an odd last digit. 3. Insert 100*a + 10*b + c into a set. 4. Return the set size.
 * Dry Run: digits = [1,2,3].
 *   - Ones digit must be even, so only 2 works: 132 and 312. Count 2.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^3)
 */
var totalNumbers = function (digits) {
  const uniqueNumbers = new Set();
  const n = digits.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j === i) {
        continue;
      }
      for (let k = 0; k < n; k++) {
        if (k === i || k === j) {
          continue;
        }
        const hundreds = digits[i];
        const tens = digits[j];
        const ones = digits[k];
        if (hundreds !== 0 && ones % 2 === 0) {
          uniqueNumbers.add(hundreds * 100 + tens * 10 + ones);
        }
      }
    }
  }

  return uniqueNumbers.size;
};
