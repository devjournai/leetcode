/**
 * Monotone Increasing Digits
 * Intuition: The largest monotone-increasing number ≤ n is obtained by finding the leftmost descent, decrementing that digit, and turning the suffix into 9s. A right-to-left pass can decrement through a plateau of equal digits.
 * Approach: 1. Split `n` into `digitCollection`. 2. From the right, if `digit[i-1] > digit[i]`, set `startModifyIndex = i` and decrement `digit[i-1]`. 3. Fill from `startModifyIndex` to the end with 9. 4. Join and convert to Number.
 * Dry Run: 332. At the last 2, 3>2 so decrement the middle 3 → 322, then the first 3>2 → 222, then suffix from index 1 becomes 9 → 299.
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var monotoneIncreasingDigits = function (n) {
  const stringValueOfN = String(n);
  const digitCollection = stringValueOfN.split("").map(Number);
  const lengthOfCollection = digitCollection.length;
  let startModifyIndex = lengthOfCollection;

  for (
    let currentBackwardIndex = lengthOfCollection - 1;
    currentBackwardIndex > 0;
    currentBackwardIndex--
  ) {
    if (
      digitCollection[currentBackwardIndex - 1] >
      digitCollection[currentBackwardIndex]
    ) {
      startModifyIndex = currentBackwardIndex;
      digitCollection[currentBackwardIndex - 1]--;
    }
  }

  for (
    let currentForwardIndex = startModifyIndex;
    currentForwardIndex < lengthOfCollection;
    currentForwardIndex++
  ) {
    digitCollection[currentForwardIndex] = 9;
  }

  const finalResultString = digitCollection.join("");
  return Number(finalResultString);
};
