/**
 * Least Operators To Express Number
 * Time Complexity: O(log(target))
 * Space Complexity: O(1)
 */
var leastOpsExpressTarget = function (x, target) {
  let baseValue = x;
  let remainingTarget = target;
  let positivePathCost = 0;
  let negativePathCost = 0;
  let finalMinPositive;
  let finalMinNegative;
  let loopExponentLevel = 0;

  for (; ; loopExponentLevel++) {
    let remainderDigit = remainingTarget % baseValue;
    remainingTarget = Math.floor(remainingTarget / baseValue);

    if (loopExponentLevel === 0) {
      positivePathCost = remainderDigit * 2;
      negativePathCost = (baseValue - remainderDigit) * 2;
    } else {
      let costPerTerm = loopExponentLevel;

      let positiveOptionA = remainderDigit * costPerTerm + positivePathCost;
      let positiveOptionB =
        (remainderDigit + 1) * costPerTerm + negativePathCost;
      let newPositivePathCost = Math.min(positiveOptionA, positiveOptionB);

      let negativeOptionA =
        (baseValue - remainderDigit) * costPerTerm + positivePathCost;
      let negativeOptionB =
        (baseValue - remainderDigit - 1) * costPerTerm + negativePathCost;
      let newNegativePathCost = Math.min(negativeOptionA, negativeOptionB);

      positivePathCost = newPositivePathCost;
      negativePathCost = newNegativePathCost;
    }

    finalMinPositive = positivePathCost;
    finalMinNegative = negativePathCost;

    if (remainingTarget === 0) {
      break;
    }
  }

  return Math.min(finalMinPositive, loopExponentLevel + finalMinNegative) - 1;
};
