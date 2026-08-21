/**
 * Count Primes
 * Intuition: Every composite below n is a multiple of some prime p and can be marked starting at p*p. Counting unmarked numbers in [2, n) is the sieve of Eratosthenes.
 * Approach: 1. If n <= 2 return 0. 2. Allocate a boolean array of size n (false = still prime). 3. For each candidate i from 2 to n-1, if unmarked, count it and mark multiples from i*i. 4. Return the count.
 * Dry Run: n = 10.
 *   - 2 unmarked → count=1; mark 4,6,8.
 *   - 3 unmarked → count=2; mark 9.
 *   - 5 unmarked → count=3; 7 unmarked → count=4.
 *   - Return 4 (primes 2,3,5,7).
 * Time Complexity: O(n log log n)
 * Space Complexity: O(n)
 */
var countPrimes = function (n) {
  if (n <= 2) {
    return 0;
  }

  const isCompositeTracker = new Array(n).fill(false);
  let totalPrimeCount = 0;

  for (let currentCandidate = 2; currentCandidate < n; currentCandidate++) {
    if (!isCompositeTracker[currentCandidate]) {
      totalPrimeCount++;
      for (
        let currentMultiple = currentCandidate * currentCandidate;
        currentMultiple < n;
        currentMultiple += currentCandidate
      ) {
        isCompositeTracker[currentMultiple] = true;
      }
    }
  }

  return totalPrimeCount;
};
