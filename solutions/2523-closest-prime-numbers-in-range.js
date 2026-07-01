/**
 * Closest Prime Numbers In Range
 * Intuition: The problem requires finding prime numbers within a given range and then identifying the pair with the smallest difference. A highly efficient method to find all primes up to a certain limit is the Sieve of Eratosthenes. Once primes are identified, a single pass through the range can find the closest pair.
 * Approach: 1. Initialize a boolean array (or Uint8Array for memory efficiency) up to `right` to mark all numbers as potentially prime. Set `0` and `1` as non-prime. 2. Implement the Sieve of Eratosthenes: iterate from 2 up to the square root of `right`. For each prime found, mark its multiples as non-prime. 3. Initialize variables for tracking the minimum difference and the closest prime pair. 4. Iterate from `left` to `right`. If the current number is marked as prime and a previous prime has been found, calculate the difference. If this difference is smaller than the current minimum, update the minimum difference and the result pair. Always update the `lastDiscoveredPrime` to the current prime. 5. Return the final closest prime pair.
 * Dry Run: left = 10, right = 100
 * 1. `primeTracker` array of size 101, all filled with 1s (true).
 * 2. `primeTracker[0] = 0`, `primeTracker[1] = 0`.
 * 3. Sieve loop:
 *    - `primeCandidateIterator = 2`: `primeTracker[2]` is 1. Mark 4, 6, ..., 100 as 0.
 *    - `primeCandidateIterator = 3`: `primeTracker[3]` is 1. Mark 9, 12, ..., 99 as 0.
 *    - `primeCandidateIterator = 4`: `primeTracker[4]` is 0. Skip.
 *    - `primeCandidateIterator = 5`: `primeTracker[5]` is 1. Mark 25, 30, ..., 100 as 0.
 *    - `primeCandidateIterator = 6`: `primeTracker[6]` is 0. Skip.
 *    - `primeCandidateIterator = 7`: `primeTracker[7]` is 1. Mark 49, 56, ..., 98 as 0.
 *    - `primeCandidateIterator = 8, 9, 10`: all `primeTracker` values are 0. Skip.
 *    - Sieve completes.
 * 4. Finding closest primes:
 *    - `resultPair = [-1, -1]`, `minimumGap = Infinity`, `previousPrime = -1`.
 *    - `currentValueIterator` from 10 to 100:
 *    - `currentValueIterator = 10`: `primeTracker[10]` is 0. Skip.
 *    - `currentValueIterator = 11`: `primeTracker[11]` is 1.
 *      - `previousPrime` is -1. No comparison.
 *      - `previousPrime = 11`.
 *    - `currentValueIterator = 12`: `primeTracker[12]` is 0. Skip.
 *    - `currentValueIterator = 13`: `primeTracker[13]` is 1.
 *      - `previousPrime` is 11. `currentGap = 13 - 11 = 2`.
 *      - `2 < Infinity`. `minimumGap = 2`, `resultPair = [11, 13]`.
 *      - `previousPrime = 13`.
 *    - `currentValueIterator = 14, 15, 16`: `primeTracker` values are 0. Skip.
 *    - `currentValueIterator = 17`: `primeTracker[17]` is 1.
 *      - `previousPrime` is 13. `currentGap = 17 - 13 = 4`.
 *      - `4` is not less than `minimumGap = 2`. No update to `resultPair`.
 *      - `previousPrime = 17`.
 *    - `currentValueIterator = 18`: `primeTracker[18]` is 0. Skip.
 *    - `currentValueIterator = 19`: `primeTracker[19]` is 1.
 *      - `previousPrime` is 17. `currentGap = 19 - 17 = 2`.
 *      - `2` is not less than `minimumGap = 2`. No update to `resultPair` (11 is smaller than 17, so `[11, 13]` is kept per smallest `num1` rule).
 *      - `previousPrime = 19`.
 *    - This process continues. All subsequent pairs with difference 2 (e.g., 29, 31; 41, 43; 59, 61; 71, 73) will not update `resultPair` because their `num1` is greater than 11.
 * 5. Loop finishes. `resultPair` is `[11, 13]`.
 * Time Complexity: O(N log log N + N)
 * Space Complexity: O(N)
 */
var closestPrimes = function (left, right) {
  const primeTracker = new Uint8Array(right + 1).fill(1);
  let resultPair = [-1, -1];

  primeTracker[0] = 0;
  primeTracker[1] = 0;

  for (
    let primeCandidateIterator = 2;
    primeCandidateIterator * primeCandidateIterator <= right;
    primeCandidateIterator++
  ) {
    if (primeTracker[primeCandidateIterator]) {
      for (
        let multipleMarkerIterator =
          primeCandidateIterator * primeCandidateIterator;
        multipleMarkerIterator <= right;
        multipleMarkerIterator += primeCandidateIterator
      ) {
        primeTracker[multipleMarkerIterator] = 0;
      }
    }
  }

  let previousPrime = -1;
  let minimumGap = Infinity;

  for (
    let currentValueIterator = left;
    currentValueIterator <= right;
    currentValueIterator++
  ) {
    if (primeTracker[currentValueIterator]) {
      if (previousPrime !== -1) {
        const currentGap = currentValueIterator - previousPrime;
        if (currentGap < minimumGap) {
          minimumGap = currentGap;
          resultPair = [previousPrime, currentValueIterator];
        }
      }
      previousPrime = currentValueIterator;
    }
  }

  return resultPair;
};
