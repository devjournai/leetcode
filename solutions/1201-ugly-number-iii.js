/**
 * Ugly Number Iii
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
