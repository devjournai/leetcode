/**
 * Once Twice
 * Intuition: Every value appears 3 times except one that appears once and one that appears twice. For each bit, the count modulo 3 is 1 if the singleton has it and 2 if the doubleton has it.
 * Approach: 1. For bits 0..31, sum how many numbers have that bit, modulo 3. 2. If remainder 1, set the bit on the once-number; if 2, set it on the twice-number. 3. Return [once, twice] as signed 32-bit.
 * Dry Run: nums = [2,2,3,2,5,5,5,7,7]. Bit of 3 (once) and 7 (twice) reconstruct to [3,7].
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var onceTwice = function (nums) {
  let once = 0;
  let twice = 0;

  for (let bit = 0; bit < 32; bit++) {
    let sum = 0;
    for (const x of nums) {
      sum += (x >>> bit) & 1;
    }
    const rem = sum % 3;
    if (rem === 1) {
      once |= 1 << bit;
    } else if (rem === 2) {
      twice |= 1 << bit;
    }
  }

  return [once, twice];
};
