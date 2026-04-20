/**
 * Numbers With Repeated Digits
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
          availableForRemaining,
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
