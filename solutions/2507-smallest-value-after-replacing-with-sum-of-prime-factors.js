/**
 * Smallest Value After Replacing With Sum Of Prime Factors
 * Intuition: The problem describes a process where a number `n` is repeatedly transformed into the sum of its prime factors. We need to find the smallest value `n` reaches during this process. This implies a fixed-point iteration: calculate the next value, and if it's the same as the current value, we've found our answer. Otherwise, continue with the new value.
 * Approach: 1. Define a main function `smallestValue` that takes an integer `inputNumber`. 2. Inside `smallestValue`, initialize a variable, say `currentValue`, with `inputNumber`. 3. Enter an infinite loop. 4. In each iteration, call a helper function, say `calculatePrimeFactorSum`, with `currentValue` to get `nextCalculatedValue`. 5. Compare `nextCalculatedValue` with `currentValue`. If they are equal, `currentValue` is the smallest fixed point, so return `currentValue`. 6. Otherwise, update `currentValue` to `nextCalculatedValue` and continue the loop. 7. The helper function `calculatePrimeFactorSum` will take an integer `targetNumber`. It initializes a `primeFactorSum` to 0. It then iterates from `potentialDivisor = 2` up to `sqrt(targetNumber)`. For each `potentialDivisor`, if `targetNumber` is divisible, it repeatedly adds `potentialDivisor` to `primeFactorSum` and divides `targetNumber` by `potentialDivisor` until it's no longer divisible. After the loop, if the remaining `targetNumber` (now called `tempTarget`) is greater than 1, it means it's a prime factor itself, so add `tempTarget` to `primeFactorSum`. Finally, return `primeFactorSum`.
 * Dry Run: For input `n = 12`:
 * 1. `smallestValue(12)` starts with `currentValue = 12`.
 * 2. Loop iteration 1:
 *    a. Call `calculatePrimeFactorSum(12)`:
 *       - `primeFactorSum = 0`, `tempTarget = 12`.
 *       - `potentialDivisor = 2`: `12 % 2 === 0`.
 *         - `primeFactorSum += 2` (is 2), `tempTarget = 6`.
 *         - `primeFactorSum += 2` (is 4), `tempTarget = 3`.
 *       - `potentialDivisor = 3`: `3 % 3 === 0`.
 *         - `primeFactorSum += 3` (is 7), `tempTarget = 1`.
 *       - Loop finishes (`potentialDivisor * potentialDivisor` > `tempTarget`).
 *       - `tempTarget > 1` is false.
 *       - Returns `7`.
 *    b. `nextCalculatedValue = 7`.
 *    c. `7 === 12` is false.
 *    d. `currentValue` becomes `7`.
 * 3. Loop iteration 2:
 *    a. Call `calculatePrimeFactorSum(7)`:
 *       - `primeFactorSum = 0`, `tempTarget = 7`.
 *       - `potentialDivisor = 2`: `7 % 2 !== 0`.
 *       - `potentialDivisor = 3`: `7 % 3 !== 0`.
 *       - Loop finishes (`4 * 4` > `7`).
 *       - `tempTarget > 1` (7 > 1) is true.
 *       - `primeFactorSum += 7` (is 7).
 *       - Returns `7`.
 *    b. `nextCalculatedValue = 7`.
 *    c. `7 === 7` is true.
 *    d. Return `currentValue` which is `7`.
 * Time Complexity: O(sqrt(N))
 * Space Complexity: O(1)
 */
var smallestValue = function (inputNumber) {
  let currentValue = inputNumber;

  const calculatePrimeFactorSum = (targetNumber) => {
    let primeFactorSum = 0;
    let tempTarget = targetNumber;

    for (
      let potentialDivisor = 2;
      potentialDivisor * potentialDivisor <= tempTarget;
      potentialDivisor++
    ) {
      while (tempTarget % potentialDivisor === 0) {
        primeFactorSum += potentialDivisor;
        tempTarget /= potentialDivisor;
      }
    }

    if (tempTarget > 1) {
      primeFactorSum += tempTarget;
    }

    return primeFactorSum;
  };

  while (true) {
    const nextCalculatedValue = calculatePrimeFactorSum(currentValue);
    if (nextCalculatedValue === currentValue) {
      return currentValue;
    }
    currentValue = nextCalculatedValue;
  }
};
