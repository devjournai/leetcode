/**
 * Simplified Fractions
 * Intuition: Every proper fraction numerator/denominator with 1 <= num < den <= n is simplified iff gcd is 1.
 * Approach: 1. Euclidean gcd helper. 2. For denominator 2..n and numerator 1..denominator-1, if gcd==1 push "num/den". 3. Return the list.
 * Dry Run: n = 3
 *   - 1/2 gcd 1; 1/3 gcd 1; 2/3 gcd 1
 *   - ["1/2","1/3","2/3"]
 * Time Complexity: O(n^2 * log n)
 * Space Complexity: O(n^2 * log n)
 */
var simplifiedFractions = function (n) {
  const calculateGreatestCommonDivisor = (valueA, valueB) => {
    let currentDividend = valueA;
    let currentDivisor = valueB;
    while (currentDivisor !== 0) {
      let temporaryRemainder = currentDividend % currentDivisor;
      currentDividend = currentDivisor;
      currentDivisor = temporaryRemainder;
    }
    return currentDividend;
  };

  const fractionsCollection = [];

  for (
    let denominatorCandidate = 2;
    denominatorCandidate <= n;
    denominatorCandidate++
  ) {
    let numeratorCandidate = 1;
    while (numeratorCandidate < denominatorCandidate) {
      const currentGcdResult = calculateGreatestCommonDivisor(
        numeratorCandidate,
        denominatorCandidate
      );
      if (currentGcdResult === 1) {
        fractionsCollection.push(
          `${numeratorCandidate}/${denominatorCandidate}`
        );
      }
      numeratorCandidate++;
    }
  }

  return fractionsCollection;
};
