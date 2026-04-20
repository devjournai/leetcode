/**
 * Add To Array Form Of Integer
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
