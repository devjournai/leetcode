/**
 * Super Ugly Number
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
