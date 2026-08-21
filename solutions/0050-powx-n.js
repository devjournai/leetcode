/**
 * Powx N
 * Intuition: x^n = (x^2)^(n/2) when n is even, and x * x^(n-1) when n is odd. Iterative binary exponentiation squares the base and halves the exponent. Negative n uses 1/x as the base.
 * Approach: 1. If n is negative, invert x and negate n. 2. Start result at 1. 3. While the exponent is positive, if it is odd multiply result by the current base, then square the base and floor-divide the exponent by 2.
 * Dry Run: x = 2, n = 10.
 *   - exp even: base=4, exp=5. exp odd: result=4, base=16, exp=2. even: base=256, exp=1. odd: result=4*256=1024. Return 1024.
 * Time Complexity: O(log |n|)
 * Space Complexity: O(1)
 */
var myPow = function (x, n) {
  let baseValue = x;
  let exponentValue = n;
  let finalResult = 1.0;

  if (exponentValue < 0) {
    baseValue = 1 / baseValue;
    exponentValue = -exponentValue;
  }

  while (exponentValue > 0) {
    if (exponentValue % 2 === 1) {
      finalResult *= baseValue;
    }
    baseValue *= baseValue;
    exponentValue = Math.floor(exponentValue / 2);
  }

  return finalResult;
};
