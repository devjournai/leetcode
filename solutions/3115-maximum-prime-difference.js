/**
 * Maximum Prime Difference
 * Intuition: The answer is the distance between the leftmost and rightmost prime in nums (0 if only one).
 * Approach: 1. Sieve primes up to 100. 2. Scan for first and last prime indices. 3. Return last-first.
 * Dry Run:
 *   nums = [4,2,9,5,3] primes at 1,3,4 -> 4-1=3
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumPrimeDifference = function (nums) {
  const isPrime = new Array(101).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  for (
    let primeCandidate = 2;
    primeCandidate * primeCandidate <= 100;
    primeCandidate++
  ) {
    if (isPrime[primeCandidate]) {
      for (
        let multiple = primeCandidate * primeCandidate;
        multiple <= 100;
        multiple += primeCandidate
      ) {
        isPrime[multiple] = false;
      }
    }
  }

  let firstPrimeIndex = -1;
  let lastPrimeIndex = -1;
  for (let index = 0; index < nums.length; index++) {
    if (isPrime[nums[index]]) {
      if (firstPrimeIndex === -1) {
        firstPrimeIndex = index;
      }
      lastPrimeIndex = index;
    }
  }
  return lastPrimeIndex - firstPrimeIndex;
};
