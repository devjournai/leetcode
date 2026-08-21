/**
 * Add To Array Form Of Integer
 * Intuition: Add k to the digit array from the right, keeping `currentCarryAmount`, then reverse the collected digits.
 * Approach: 1. While index ≥0 or k>0 or carry>0, take `num[pointerIndex]` (or 0) plus `k%10` plus carry. 2. Push `sum%10`, update carry and `k = floor(k/10)`. 3. Reverse `resultCollection`.
 * Dry Run: num = [1,2,0,0], k=34. 0+4, 0+3, 2, 1 → digits 4,3,2,1 reversed [1,2,3,4].
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var addToArrayForm = function (num, k) {
  let resultCollection = [];
  let pointerIndex = num.length - 1;
  let currentCarryAmount = 0;

  while (pointerIndex >= 0 || k > 0 || currentCarryAmount > 0) {
    let digitFromFirstOperand = 0;
    if (pointerIndex >= 0) {
      digitFromFirstOperand = num[pointerIndex];
    }

    let digitFromSecondOperand = k % 10;

    let intermediateSum =
      digitFromFirstOperand + digitFromSecondOperand + currentCarryAmount;

    resultCollection.push(intermediateSum % 10);
    currentCarryAmount = Math.floor(intermediateSum / 10);
    k = Math.floor(k / 10);
    pointerIndex--;
  }

  return resultCollection.reverse();
};
