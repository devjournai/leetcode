/**
 * Ugly Number Iii
 * Intuition: The n-th number divisible by a, b, or c can be found by binary-searching the value and counting with inclusion-exclusion.
 * Approach: 1. Compute LCMs of a,b,c pairs and all three. 2. Count(x) = x/a + x/b + x/c − x/lcm(ab) − … + x/lcm(abc). 3. Binary search the smallest x with count(x) ≥ n.
 * Dry Run: n=3, a=2, b=3, c=5. Numbers 2,3,4 → answer 4.
 * Time Complexity: O(log(upperBoundValue) * log(maxValuesA_B_C))
 * Space Complexity: O(log(maxValuesA_B_C))
 */
var nthUglyNumber = function (n, a, b, c) {
  function calculateGcd(firstNumber, secondNumber) {
    if (secondNumber === 0) {
      return firstNumber;
    }
    return calculateGcd(secondNumber, firstNumber % secondNumber);
  }

  function calculateLcm(valueOne, valueTwo) {
    if (valueOne === 0 || valueTwo === 0) {
      return 0;
    }
    const commonDivisor = calculateGcd(valueOne, valueTwo);
    return (valueOne / commonDivisor) * valueTwo;
  }

  const lcmValAB = calculateLcm(a, b);
  const lcmValBC = calculateLcm(b, c);
  const lcmValAC = calculateLcm(a, c);
  const lcmValABC = calculateLcm(lcmValAB, c);

  function countUglyNumbersBelowOrEqual(currentCeiling) {
    let countDivisibleA = Math.floor(currentCeiling / a);
    let countDivisibleB = Math.floor(currentCeiling / b);
    let countDivisibleC = Math.floor(currentCeiling / c);

    let countDivisibleAB = Math.floor(currentCeiling / lcmValAB);
    let countDivisibleBC = Math.floor(currentCeiling / lcmValBC);
    let countDivisibleAC = Math.floor(currentCeiling / lcmValAC);

    let countDivisibleABC = Math.floor(currentCeiling / lcmValABC);

    return (
      countDivisibleA +
      countDivisibleB +
      countDivisibleC -
      countDivisibleAB -
      countDivisibleBC -
      countDivisibleAC +
      countDivisibleABC
    );
  }

  let lowerBound = 1;
  let upperBound = 2 * 10 ** 9;

  while (lowerBound < upperBound) {
    const midPoint = lowerBound + Math.floor((upperBound - lowerBound) / 2);
    if (countUglyNumbersBelowOrEqual(midPoint) < n) {
      lowerBound = midPoint + 1;
    } else {
      upperBound = midPoint;
    }
  }

  return lowerBound;
};
