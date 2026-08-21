/**
 * The Kth Factor Of N
 * Intuition: Walk factors up to sqrt(n). Each small factor is the next in order; the matching large factor n/f is stored and later read in reverse.
 * Approach: 1. For f from 1 while f*f <= n, if n%f==0 decrement k and return f when k hits 0. 2. If f is not sqrt, push n/f. 3. After the loop, if k is still in range return the kth from the end of large factors. 4. Else -1.
 * Dry Run: n = 12, k = 3
 *   - factors 1 (k=2), 2 (k=1), 3 (k=0) return 3
 * Time Complexity: O(sqrt(n))
 * Space Complexity: O(d(n)) where d(n) is the number of divisors of n
 */
var kthFactor = function (n, k) {
  let currentFactorCandidate = 1;
  const largeFactorsCollected = [];

  while (currentFactorCandidate * currentFactorCandidate <= n) {
    if (n % currentFactorCandidate === 0) {
      k--;
      if (k === 0) {
        return currentFactorCandidate;
      }
      if (currentFactorCandidate * currentFactorCandidate !== n) {
        largeFactorsCollected.push(n / currentFactorCandidate);
      }
    }
    currentFactorCandidate++;
  }

  const totalLargeFactors = largeFactorsCollected.length;
  if (k > 0 && k <= totalLargeFactors) {
    return largeFactorsCollected[totalLargeFactors - k];
  }

  return -1;
};
