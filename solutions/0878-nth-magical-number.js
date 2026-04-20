/**
 * Nth Magical Number
 * Time Complexity: O(log(min(a, b)) + log(a * b))
 * Space Complexity: O(log(min(a, b)))
 */
var nthMagicalNumber = function (n, a, b) {
  const modConstant = 1e9 + 7;

  function findGreatestCommonDivisor(gcdDivisorOne, gcdDivisorTwo) {
    if (gcdDivisorTwo === 0) {
      return gcdDivisorOne;
    } else {
      let gcdRemainder = gcdDivisorOne % gcdDivisorTwo;
      return findGreatestCommonDivisor(gcdDivisorTwo, gcdRemainder);
    }
  }

  let greatestCommonDivisorResult = findGreatestCommonDivisor(a, b);
  let leastCommonMultipleValue = (a * b) / greatestCommonDivisorResult;

  let numbersInCycle =
    Math.floor(leastCommonMultipleValue / a) +
    Math.floor(leastCommonMultipleValue / b) -
    1;
  let numberOfFullCycles = Math.floor(n / numbersInCycle);
  let remainingCount = n % numbersInCycle;

  let baseResult =
    (numberOfFullCycles * leastCommonMultipleValue) % modConstant;

  if (remainingCount === 0) {
    return baseResult;
  }

  let binarySearchStart = 1;
  let binarySearchEnd = leastCommonMultipleValue;

  while (binarySearchStart < binarySearchEnd) {
    let binarySearchMidpoint =
      binarySearchStart + Math.floor((binarySearchEnd - binarySearchStart) / 2);
    let currentMagicalCount =
      Math.floor(binarySearchMidpoint / a) +
      Math.floor(binarySearchMidpoint / b) -
      Math.floor(binarySearchMidpoint / leastCommonMultipleValue);

    if (currentMagicalCount < remainingCount) {
      binarySearchStart = binarySearchMidpoint + 1;
    } else {
      binarySearchEnd = binarySearchMidpoint;
    }
  }

  let finalAnswer = (baseResult + binarySearchStart) % modConstant;
  return finalAnswer;
};
