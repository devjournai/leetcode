/**
 * Number Of Equivalent Domino Pairs
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numEquivDominoPairs = function (dominoes) {
  const dominoOccurrences = new Map();

  for (const currentDomino of dominoes) {
    const firstValue = currentDomino[0];
    const secondValue = currentDomino[1];

    const processedKey =
      Math.min(firstValue, secondValue) * 10 +
      Math.max(firstValue, secondValue);

    dominoOccurrences.set(
      processedKey,
      (dominoOccurrences.get(processedKey) || 0) + 1,
    );
  }

  let equivalentPairCount = 0;

  for (const occurrenceCount of dominoOccurrences.values()) {
    if (occurrenceCount >= 2) {
      equivalentPairCount += (occurrenceCount * (occurrenceCount - 1)) / 2;
    }
  }

  return equivalentPairCount;
};
