/**
 * Valid Parenthesis String
 * Intuition: Track a range of possible open-paren counts: `(` grows both bounds, `)` shrinks both, `*` can be either. Clamp the low bound at 0; if the high bound goes negative the string is already invalid.
 * Approach: 1. Scan `s` updating `lowerBound`/`upperBound`. 2. After each char, `lowerBound = max(0, lowerBound)`; if `upperBound < 0` return false. 3. Valid iff `lowerBound === 0` at the end.
 * Dry Run: s="(*)". '(' → lo=1,hi=1. '*' → lo=0,hi=2. ')' → lo=-1→0, hi=1. lo===0 → true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var checkValidString = function (s) {
  let lowerBound = 0;
  let upperBound = 0;

  for (const charItem of s) {
    if (charItem === "(") {
      lowerBound++;
      upperBound++;
    } else if (charItem === ")") {
      lowerBound--;
      upperBound--;
    } else {
      lowerBound--;
      upperBound++;
    }

    lowerBound = Math.max(0, lowerBound);
    if (upperBound < 0) {
      return false;
    }
  }

  return lowerBound === 0;
};
