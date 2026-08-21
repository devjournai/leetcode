/**
 * Nth Magical Number
 * Intuition: Magical numbers are multiples of `a` or `b`. They repeat every LCM: count per cycle is `LCM/a + LCM/b - 1`. Full cycles plus a binary-searched remainder give the nth value, taken mod 1e9+7.
 * Approach: 1. Euclidean GCD then `leastCommonMultipleValue = a*b/gcd`. 2. `numbersInCycle` as above; `numberOfFullCycles = floor(n / numbersInCycle)`, `remainingCount = n % numbersInCycle`. 3. `baseResult = (fullCycles * LCM) % mod`. If remainder is 0, return that. 4. Binary search the smallest x in `[1, LCM]` with `floor(x/a)+floor(x/b)-floor(x/LCM) >= remainingCount`. 5. Return `(baseResult + binarySearchStart) % mod`.
 * Dry Run: n = 1, a = 2, b = 3.
 *   - GCD=1, LCM=6, cycle size 3. 1/3 = 0 remainder 1. Search [1,6] finds 2. Return 2.
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
