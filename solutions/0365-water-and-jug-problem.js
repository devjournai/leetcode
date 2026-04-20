/**
 * Water And Jug Problem
 * Time Complexity: O(log(min(x, y)))
 * Space Complexity: O(log(min(x, y)))
*/
var canMeasureWater = function (xCapacity, yCapacity, targetQuantity) {
  if (targetQuantity > xCapacity + yCapacity) {
    return false;
  }

  if (targetQuantity === 0) {
    return true;
  }

  if (xCapacity === 0) {
    return targetQuantity === yCapacity;
  }

  if (yCapacity === 0) {
    return targetQuantity === xCapacity;
  }

  function computeGreatestCommonDivisor(firstNumber, secondNumber) {
    if (secondNumber === 0) {
      return firstNumber;
    }
    let remainderValue = firstNumber % secondNumber;
    return computeGreatestCommonDivisor(secondNumber, remainderValue);
  }

  let calculatedCommonDivisor = computeGreatestCommonDivisor(xCapacity, yCapacity);
  return targetQuantity % calculatedCommonDivisor === 0;
};