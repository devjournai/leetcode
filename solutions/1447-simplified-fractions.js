/**
 * Simplified Fractions
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
        denominatorCandidate,
      );
      if (currentGcdResult === 1) {
        fractionsCollection.push(
          `${numeratorCandidate}/${denominatorCandidate}`,
        );
      }
      numeratorCandidate++;
    }
  }

  return fractionsCollection;
};
