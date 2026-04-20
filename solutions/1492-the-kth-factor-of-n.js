/**
 * The Kth Factor Of N
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
