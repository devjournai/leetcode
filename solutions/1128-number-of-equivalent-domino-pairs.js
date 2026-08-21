/**
 * Number Of Equivalent Domino Pairs
 * Intuition: [a,b] equals [b,a], so canonicalize each tile as min*10+max (digits 1..9) and count combinations C(freq,2) per key.
 * Approach: 1. For each domino, increment a map keyed by the canonical integer. 2. For every frequency f>=2, add f*(f-1)/2.
 * Dry Run: dominoes = [[1,2],[2,1],[3,4],[5,6]].
 *   - Canonical keys: 12 twice, 34 once, 56 once.
 *   - Pairs: 2*(2-1)/2 = 1. Answer 1.
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
      (dominoOccurrences.get(processedKey) || 0) + 1
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
