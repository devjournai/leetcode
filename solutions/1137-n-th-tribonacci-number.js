/**
 * N Th Tribonacci Number
 * Intuition: T0=0, T1=1, T2=1, and each later term is the sum of the previous three; keep only those three values.
 * Approach: 1. Return 0/1 for n=0/1/2. 2. Iterate from 3 to n, shifting the three-term window. 3. Return the last term.
 * Dry Run: n = 4.
 *   - T3 = 0+1+1=2. T4 = 1+1+2=4. Answer 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var tribonacci = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }

  let firstValue = 0;
  let secondValue = 1;
  let thirdValue = 1;

  let loopCounter = 3;
  while (loopCounter <= n) {
    let nextTribonacci = firstValue + secondValue + thirdValue;
    firstValue = secondValue;
    secondValue = thirdValue;
    thirdValue = nextTribonacci;
    loopCounter++;
  }

  return thirdValue;
};
