/**
 * Distinct Prime Factors Of Product Of Array
 * Intuition: Instead of computing the potentially massive product and then factorizing it, which can lead to overflow, it's more efficient to find the prime factors of each individual number in the array. By collecting these prime factors in a set, we naturally handle distinctness and avoid large number calculations.
 * Approach: 1. Initialize an empty Set, `collectedPrimeFactors`, to store all unique prime factors encountered. 2. Iterate through each number, `processNumber`, in the input array `nums`. 3. For each `processNumber`, call a helper function, `findPrimeDivisors`, to extract its prime factors. This function takes the number and the set as arguments. 4. Inside `findPrimeDivisors`, initialize a `currentValue` with the number and a `potentialDivisor` starting from 2. 5. Loop `while potentialDivisor * potentialDivisor` is less than or equal to `currentValue`: if `currentValue` is divisible by `potentialDivisor`, add `potentialDivisor` to `collectedPrimeFactors` and repeatedly divide `currentValue` by `potentialDivisor` until it's no longer divisible. Then, increment `potentialDivisor`. 6. After the loop, if `currentValue` is still greater than 1, it means the remaining `currentValue` is a prime factor itself, so add it to `collectedPrimeFactors`. 7. After processing all numbers in `nums`, return the size of `collectedPrimeFactors`.
 * Dry Run: nums = [12, 10]
 * 1. Initialize collectedPrimeFactors = new Set().
 * 2. Loop for elementIndex = 0 (processNumber = 12):
 *    a. findPrimeDivisors(12, collectedPrimeFactors)
 *       - currentValue = 12, potentialDivisor = 2
 *       - potentialDivisor * potentialDivisor (4) <= currentValue (12) is true.
 *       - while (12 % 2 === 0):
 *         - collectedPrimeFactors.add(2) -> {2}
 *         - currentValue = 12 / 2 = 6
 *       - while (6 % 2 === 0):
 *         - collectedPrimeFactors.add(2) -> {2}
 *         - currentValue = 6 / 2 = 3
 *       - while (3 % 2 === 0) is false.
 *       - potentialDivisor increments to 3.
 *       - potentialDivisor * potentialDivisor (9) <= currentValue (3) is false. Loop ends.
 *       - currentValue (3) > 1 is true. collectedPrimeFactors.add(3) -> {2, 3}
 * 3. Loop for elementIndex = 1 (processNumber = 10):
 *    a. findPrimeDivisors(10, collectedPrimeFactors)
 *       - currentValue = 10, potentialDivisor = 2
 *       - potentialDivisor * potentialDivisor (4) <= currentValue (10) is true.
 *       - while (10 % 2 === 0):
 *         - collectedPrimeFactors.add(2) -> {2, 3}
 *         - currentValue = 10 / 2 = 5
 *       - while (5 % 2 === 0) is false.
 *       - potentialDivisor increments to 3.
 *       - potentialDivisor * potentialDivisor (9) <= currentValue (5) is false. Loop ends.
 *       - currentValue (5) > 1 is true. collectedPrimeFactors.add(5) -> {2, 3, 5}
 * 4. All numbers processed.
 * 5. Return collectedPrimeFactors.size which is 3.
 * Time Complexity: O(N * sqrt(M))
 * Space Complexity: O(pi(M))
 */
var distinctPrimeFactors = function (nums) {
  const collectedPrimeFactors = new Set();

  const findPrimeDivisors = (valueForFactoring, factorStorage) => {
    let currentValue = valueForFactoring;
    let potentialDivisor = 2;

    while (potentialDivisor * potentialDivisor <= currentValue) {
      while (currentValue % potentialDivisor === 0) {
        factorStorage.add(potentialDivisor);
        currentValue /= potentialDivisor;
      }
      potentialDivisor++;
    }

    if (currentValue > 1) {
      factorStorage.add(currentValue);
    }
  };

  for (let elementIndex = 0; elementIndex < nums.length; elementIndex++) {
    const processNumber = nums[elementIndex];
    findPrimeDivisors(processNumber, collectedPrimeFactors);
  }

  return collectedPrimeFactors.size;
};
