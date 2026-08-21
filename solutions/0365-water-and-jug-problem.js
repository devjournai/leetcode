/**
 * Water And Jug Problem
 * Intuition: Pour/fill/empty operations can produce exactly the multiples of gcd(x, y) that fit in the two jugs combined (Bézout), so target is measurable iff it is ≤ x+y and divisible by that gcd (with trivial empty-jug cases).
 * Approach: 1. False if target > x+y. 2. True if target is 0. 3. If one capacity is 0, target must equal the other. 4. Recursively compute gcd, return whether target % gcd === 0.
 * Dry Run: x = 3, y = 5, target = 4. gcd(3,5)=1, 4 ≤ 8 and 4%1===0 → true.
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

  let calculatedCommonDivisor = computeGreatestCommonDivisor(
    xCapacity,
    yCapacity
  );
  return targetQuantity % calculatedCommonDivisor === 0;
};
