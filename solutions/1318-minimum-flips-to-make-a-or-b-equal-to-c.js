/**
 * Minimum Flips To Make A Or B Equal To C
 * Intuition: Compare bits of a|b vs c. If c needs 0, flip every 1 in a and b; if c needs 1 and both bits are 0, flip one bit.
 * Approach: 1. While any of a,b,c is nonzero, take LSB. 2. If (a|b) bit ≠ c bit: c=0 costs bitA+bitB flips; c=1 costs 1. 3. Shift all three right. 4. Return the flip count.
 * Dry Run: a=2 (10), b=6 (110), c=5 (101). Bit0: 0|0 vs 1 → 1 flip; bit1: 1|1 vs 0 → 2 flips; bit2: 0|1 vs 1 ok. Total 3.
 * Time Complexity: O(log(max(a, b, c)))
 * Space Complexity: O(1)
 */
var minFlips = function (a, b, c) {
  let currentAValue = a;
  let currentBValue = b;
  let currentCValue = c;
  let flipOperations = 0;

  while (currentAValue > 0 || currentBValue > 0 || currentCValue > 0) {
    let bitA = currentAValue & 1;
    let bitB = currentBValue & 1;
    let bitC = currentCValue & 1;

    if ((bitA | bitB) !== bitC) {
      if (bitC === 0) {
        if (bitA === 1) {
          flipOperations++;
        }
        if (bitB === 1) {
          flipOperations++;
        }
      } else {
        flipOperations++;
      }
    }

    currentAValue >>= 1;
    currentBValue >>= 1;
    currentCValue >>= 1;
  }

  return flipOperations;
};
