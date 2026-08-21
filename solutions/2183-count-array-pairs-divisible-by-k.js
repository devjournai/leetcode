/**
 * Count Array Pairs Divisible By K
 * Intuition: The condition `nums[i] * nums[j]` is divisible by `k` can be simplified by considering the greatest common divisors of `nums[i]` and `nums[j]` with `k`. If the product of `gcd(nums[i], k)` and `gcd(nums[j], k)` is divisible by `k`, then `nums[i] * nums[j]` will also be divisible by `k`. This optimization significantly reduces the problem space as we only need to track the counts of distinct `gcd(value, k)` values, which are at most the number of divisors of `k`.
 * Approach: 1. Implement a standard Euclidean algorithm for GCD as a helper function `calculateCommonDivisor`. 2. Initialize a frequency map `gcdFrequenciesMap` to store counts of `gcd(num, k)` encountered so far and a total count `totalFoundPairs` for valid pairs. 3. Iterate through each number in the input array `nums`. For each `currentNumberElement`, calculate `primaryGCD = calculateCommonDivisor(currentNumberElement, k)`. 4. Iterate through the `gcdFrequenciesMap`'s entries using `forEach`. For each `(existingCount, existingGCD)` pair, if the product `(primaryGCD * existingGCD)` is divisible by `k`, add `existingCount` to `totalFoundPairs`. 5. After checking against all previous GCDs, update `gcdFrequenciesMap` by incrementing the count for `primaryGCD`. 6. Return `totalFoundPairs`.
 * Dry Run: nums = [1, 2, 3, 4, 5], k = 6
 * Initial: totalFoundPairs = 0, gcdFrequenciesMap = {}
 *
 * 1. currentNumberElement = 1: primaryGCD = calculateCommonDivisor(1, 6) = 1.
 *    gcdFrequenciesMap empty.
 *    gcdFrequenciesMap = {1: 1}.
 *
 * 2. currentNumberElement = 2: primaryGCD = calculateCommonDivisor(2, 6) = 2.
 *    Iterate gcdFrequenciesMap:
 *    - (existingGCD = 1, existingCount = 1): (2 * 1) % 6 = 2 != 0.
 *    gcdFrequenciesMap = {1: 1, 2: 1}. totalFoundPairs = 0.
 *
 * 3. currentNumberElement = 3: primaryGCD = calculateCommonDivisor(3, 6) = 3.
 *    Iterate gcdFrequenciesMap:
 *    - (existingGCD = 1, existingCount = 1): (3 * 1) % 6 = 3 != 0.
 *    - (existingGCD = 2, existingCount = 1): (3 * 2) % 6 = 0. Add 1 to totalFoundPairs. totalFoundPairs = 1.
 *    gcdFrequenciesMap = {1: 1, 2: 1, 3: 1}. totalFoundPairs = 1. (Pair: (2,3))
 *
 * 4. currentNumberElement = 4: primaryGCD = calculateCommonDivisor(4, 6) = 2.
 *    Iterate gcdFrequenciesMap:
 *    - (existingGCD = 1, existingCount = 1): (2 * 1) % 6 = 2 != 0.
 *    - (existingGCD = 2, existingCount = 1): (2 * 2) % 6 = 4 != 0.
 *    - (existingGCD = 3, existingCount = 1): (2 * 3) % 6 = 0. Add 1 to totalFoundPairs. totalFoundPairs = 2.
 *    gcdFrequenciesMap = {1: 1, 2: 2, 3: 1}. totalFoundPairs = 2. (Pair: (3,4))
 *
 * 5. currentNumberElement = 5: primaryGCD = calculateCommonDivisor(5, 6) = 1.
 *    Iterate gcdFrequenciesMap:
 *    - (existingGCD = 1, existingCount = 1): (1 * 1) % 6 = 1 != 0.
 *    - (existingGCD = 2, existingCount = 2): (1 * 2) % 6 = 2 != 0.
 *    - (existingGCD = 3, existingCount = 1): (1 * 3) % 6 = 3 != 0.
 *    gcdFrequenciesMap = {1: 2, 2: 2, 3: 1}. totalFoundPairs = 2.
 * Final totalFoundPairs = 2.
 *
 * Time Complexity: O(N * (log K + d(K)))
 * Space Complexity: O(d(K))
 */

function calculateCommonDivisor(firstValue, secondValue) {
  let currentA = firstValue;
  let currentB = secondValue;
  while (currentB !== 0) {
    let tempModulo = currentA % currentB;
    currentA = currentB;
    currentB = tempModulo;
  }
  return currentA;
}

var countPairs = function (nums, k) {
  let totalFoundPairs = 0;
  const gcdFrequenciesMap = new Map();

  for (const currentNumberElement of nums) {
    const primaryGCD = calculateCommonDivisor(currentNumberElement, k);

    gcdFrequenciesMap.forEach((existingCount, existingGCD) => {
      if ((primaryGCD * existingGCD) % k === 0) {
        totalFoundPairs += existingCount;
      }
    });

    gcdFrequenciesMap.set(
      primaryGCD,
      (gcdFrequenciesMap.get(primaryGCD) || 0) + 1
    );
  }

  return totalFoundPairs;
};
