/**
 * Number Of Common Factors
 * Intuition: Common factors must divide both numbers. The largest possible common factor cannot exceed the smaller of the two numbers. Therefore, we can iterate from 1 up to the minimum of the two numbers and check each integer for divisibility.
 * Approach: 1. Initialize a counter for common factors to zero. 2. Determine the smaller of the two input numbers, as this sets the upper bound for potential common factors. 3. Iterate from 1 up to and including this upper bound. 4. In each iteration, check if the current number divides both input numbers without a remainder. 5. If it does, increment the common factors counter. 6. After the iteration completes, return the final count.
 * Dry Run:
 * a = 12, b = 18
 * 1. commonFactorCount = 0
 * 2. limitValue = Math.min(12, 18) = 12
 * 3. Loop currentDivisor from 1 to 12:
 *    - currentDivisor = 1: (12 % 1 === 0 && 18 % 1 === 0) is true. commonFactorCount becomes 1.
 *    - currentDivisor = 2: (12 % 2 === 0 && 18 % 2 === 0) is true. commonFactorCount becomes 2.
 *    - currentDivisor = 3: (12 % 3 === 0 && 18 % 3 === 0) is true. commonFactorCount becomes 3.
 *    - currentDivisor = 4: (12 % 4 === 0 && 18 % 4 !== 0) is false.
 *    - currentDivisor = 5: (12 % 5 !== 0) is false.
 *    - currentDivisor = 6: (12 % 6 === 0 && 18 % 6 === 0) is true. commonFactorCount becomes 4.
 *    - currentDivisor = 7 to 12: No common factors found.
 * 4. Loop finishes.
 * 5. Return commonFactorCount (4).
 * Time Complexity: O(min(a, b))
 * Space Complexity: O(1)
 */
var commonFactors = function (a, b) {
  let commonFactorCount = 0;
  let limitValue = Math.min(a, b);

  for (let currentDivisor = 1; currentDivisor <= limitValue; currentDivisor++) {
    if (a % currentDivisor === 0 && b % currentDivisor === 0) {
      commonFactorCount++;
    }
  }

  return commonFactorCount;
};
