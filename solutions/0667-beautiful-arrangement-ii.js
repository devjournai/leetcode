/**
 * Beautiful Arrangement II
 * Intuition: Alternate high/low while k>0 so each new value introduces a new difference; remaining values are consecutive (difference 1 already used). Odd k pushes the next low, even k the next high.
 * Approach: 1. While `distinctCountK>0`, if k odd push `currentLow++` else push `currentHigh--`, then k--. 2. Fill the rest with increasing lows. 3. Return `arrangementArray`.
 * Dry Run: n=3, k=2.
 *   - k even → push 3. k odd → push 1. Fill 2. Array [3,1,2] with diffs {2,1}.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var constructArray = function (numberN, distinctCountK) {
  const arrangementArray = [];
  let currentLow = 1;
  let currentHigh = numberN;
  let totalElementsAdded = 0;

  while (distinctCountK > 0) {
    if (distinctCountK % 2 === 1) {
      arrangementArray.push(currentLow);
      currentLow++;
    } else {
      arrangementArray.push(currentHigh);
      currentHigh--;
    }
    distinctCountK--;
    totalElementsAdded++;
  }

  while (totalElementsAdded < numberN) {
    arrangementArray.push(currentLow);
    currentLow++;
    totalElementsAdded++;
  }

  return arrangementArray;
};
