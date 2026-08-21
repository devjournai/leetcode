/**
 * Prime Arrangements
 * Intuition: Among 1..n the primes may be permuted among themselves and the composites among themselves. Answer is p! * (n-p)! mod 1e9+7.
 * Approach: 1. Count primes in 1..n by trial division. 2. Compute factorials with BigInt. 3. Return Number((p! * (n-p)!) % 1000000007).
 * Dry Run: n = 5. Primes 2,3,5 (p=3), nonprimes 2. 3!*2! = 12.
 * Time Complexity: O(n * sqrt(n))
 * Space Complexity: O(1)
 */
var numPrimeArrangements = function (nVal) {
  function isPrimeChecker(testNumber) {
    if (testNumber < 2) {
      return false;
    }
    for (
      let divisorCandidate = 2;
      divisorCandidate * divisorCandidate <= testNumber;
      divisorCandidate++
    ) {
      if (testNumber % divisorCandidate === 0) {
        return false;
      }
    }
    return true;
  }

  function computeFactorial(numberForFactorial) {
    let accumulatedProduct = 1n;
    for (
      let factorIncrement = 2;
      factorIncrement <= numberForFactorial;
      factorIncrement++
    ) {
      accumulatedProduct *= BigInt(factorIncrement);
    }
    return accumulatedProduct;
  }

  let countedPrimes = 0;
  for (
    let currentNumberCheck = 1;
    currentNumberCheck <= nVal;
    currentNumberCheck++
  ) {
    if (isPrimeChecker(currentNumberCheck)) {
      countedPrimes++;
    }
  }

  const MOD_VALUE = 1000000007n;
  const nonPrimeNumberCount = nVal - countedPrimes;

  const primePermutationResult = computeFactorial(countedPrimes);
  const nonPrimePermutationResult = computeFactorial(nonPrimeNumberCount);

  return Number(
    (primePermutationResult * nonPrimePermutationResult) % MOD_VALUE
  );
};
