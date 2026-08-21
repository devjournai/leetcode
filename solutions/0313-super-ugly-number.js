/**
 * Super Ugly Number
 * Intuition: Super ugly numbers are 1 and products of the given primes. Keep one pointer per prime into the sequence already built; the next value is always the minimum of prime[i] * sequence[pointer[i]].
 * Approach: 1. Start sequence with [1] and set each prime's candidate to the prime itself. 2. While fewer than n values exist, take the min candidate and append it. 3. For every prime whose candidate equals that min, advance its pointer and refresh candidate = prime * sequence[pointer]. 4. Return sequence[n - 1].
 * Dry Run: n = 6, primes = [2, 3, 5].
 *   - Sequence [1]; candidates [2, 3, 5]. Min 2 → [1, 2]; 2's candidate becomes 4.
 *   - Min 3 → [1, 2, 3]; then 4, 5, 6. Return sequence[5] = 6.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N + K)
 */
var nthSuperUglyNumber = function (n, primes) {
  const superUglyValues = [1];
  const primeIndices = new Array(primes.length).fill(0);
  const candidateProducts = [...primes];

  let currentCount = superUglyValues.length;

  while (currentCount < n) {
    let minimumCandidate = Infinity;
    for (
      let currentProductIndex = 0;
      currentProductIndex < candidateProducts.length;
      currentProductIndex++
    ) {
      if (candidateProducts[currentProductIndex] < minimumCandidate) {
        minimumCandidate = candidateProducts[currentProductIndex];
      }
    }

    superUglyValues.push(minimumCandidate);

    for (
      let primeFactorIndex = 0;
      primeFactorIndex < primes.length;
      primeFactorIndex++
    ) {
      if (candidateProducts[primeFactorIndex] === minimumCandidate) {
        primeIndices[primeFactorIndex]++;
        candidateProducts[primeFactorIndex] =
          primes[primeFactorIndex] *
          superUglyValues[primeIndices[primeFactorIndex]];
      }
    }
    currentCount++;
  }

  return superUglyValues[n - 1];
};
