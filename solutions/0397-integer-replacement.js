/**
 * Integer Replacement
 * Intuition: Even numbers always halve. For odds, prefer the neighbor divisible by 4 (except 3, where decrement is shorter) so more trailing zeros appear after the next step.
 * Approach: 1. While `currentNumber!==1`: if even, divide by 2. 2. Else if it is 3, subtract 1; else if `(n+1)%4===0` add 1; else subtract 1. 3. Count each operation. 4. Return `operationCounter`.
 * Dry Run: n = 8 → 8/2=4 /2=2 /2=1, three steps.
 *   n = 7: 7+1=8 (because 8%4===0), then 4,2,1 → 4 steps.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var integerReplacement = function (n) {
  let currentNumber = n;
  let operationCounter = 0;

  while (currentNumber !== 1) {
    if (currentNumber % 2 === 0) {
      currentNumber /= 2;
    } else {
      if (currentNumber === 3) {
        currentNumber -= 1;
      } else if ((currentNumber + 1) % 4 === 0) {
        currentNumber += 1;
      } else {
        currentNumber -= 1;
      }
    }
    operationCounter++;
  }

  return operationCounter;
};
