/**
 * Numbers With Repeated Digits
 * Intuition: Count numbers <= n with all unique digits via digit DP-style permutations, then subtract from n.
 * Approach: 1. Count unique-digit numbers with fewer digits than n (9 * P(9, len-1)). 2. Walk n's digits: for each prefix, add permutations of unused digits for smaller choices. 3. Stop if a digit repeats. 4. Include n itself if all digits unique. 5. Return n minus that count.
 * Dry Run: n = 20.
 *   - 1-digit unique: 9. Two-digit prefixes starting with 1 add 9 more unique numbers. 20 itself is unique. Unique total 19, so answer 20-19=1.
 * Time Complexity: O(logN)
 * Space Complexity: O(logN)
 */
var numDupDigitsAtMostN = function (n) {
  const numberDigits = String(n).split("").map(Number);
  const digitCount = numberDigits.length;
  let distinctNumberAccumulator = 0;

  function calculatePermutations(elementsToChoose, totalElements) {
    if (elementsToChoose < 0 || elementsToChoose > totalElements) {
      return 0;
    }
    if (elementsToChoose === 0) {
      return 1;
    }
    let permutationResult = 1;
    for (
      let currentIteration = 0;
      currentIteration < elementsToChoose;
      currentIteration++
    ) {
      permutationResult *= totalElements - currentIteration;
    }
    return permutationResult;
  }

  for (let currentLength = 1; currentLength < digitCount; currentLength++) {
    distinctNumberAccumulator +=
      9 * calculatePermutations(currentLength - 1, 9);
  }

  const encounteredDigits = new Set();

  for (let positionIndex = 0; positionIndex < digitCount; positionIndex++) {
    const valueAtPosition = numberDigits[positionIndex];
    const lowerBoundSearch = positionIndex === 0 ? 1 : 0;

    for (
      let candidateDigit = lowerBoundSearch;
      candidateDigit < valueAtPosition;
      candidateDigit++
    ) {
      if (!encounteredDigits.has(candidateDigit)) {
        const remainingPlaces = digitCount - 1 - positionIndex;
        const availableForRemaining = 10 - encounteredDigits.size - 1;
        distinctNumberAccumulator += calculatePermutations(
          remainingPlaces,
          availableForRemaining
        );
      }
    }

    if (encounteredDigits.has(valueAtPosition)) {
      break;
    }

    encounteredDigits.add(valueAtPosition);

    if (positionIndex === digitCount - 1) {
      distinctNumberAccumulator++;
    }
  }

  return n - distinctNumberAccumulator;
};
