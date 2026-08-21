/**
 * Least Operators To Express Number
 * Intuition: Write `target` in base `x`. At each digit, either use that many `x^e` terms (`positivePathCost`) or overshoot and subtract using `negativePathCost` (the complement toward the next power).
 * Approach: 1. Loop extracting `remainderDigit = remainingTarget % baseValue`. 2. At exponent 0, costs are `digit*2` and `(x-digit)*2` (each `x` needs a `+`). 3. For later exponents, combine prior pos/neg costs with `costPerTerm = loopExponentLevel`. 4. Return `min(finalMinPositive, loopExponentLevel + finalMinNegative) - 1` (drop a leading plus).
 * Dry Run: x=3, target=19. 19 = 201_3. Digit loop updates pos/neg costs; min expression uses 3*3 + 3*3 + 3/3 + 3/3 → 5 operators. Answer 5.
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
