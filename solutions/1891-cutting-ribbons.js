/**
 * Cutting Ribbons
 * Intuition: Maximum ribbon length L is binary-searchable: you can cut k pieces of length L iff sum(floor(ribbon/L)) ≥ k.
 * Approach: 1. Search L in [1, max(ribbons)]. 2. `canAchieveK` counts pieces. 3. If possible, try larger L; else smaller. Return `maximumPossible` (0 if none).
 * Dry Run: ribbons=[9,7,5], k=3. Length 5 yields 1+1+1=3. Return 5.
 * Time Complexity: O(N * log M)
 * Space Complexity: O(1)
 */
var maxLength = function (ribbons, k) {
  let lowerBound = 1;
  let upperBound = Math.max(...ribbons);

  let maximumPossible = 0;

  while (lowerBound <= upperBound) {
    const candidateLength = Math.floor((lowerBound + upperBound) / 2);

    if (canAchieveK(candidateLength)) {
      maximumPossible = candidateLength;
      lowerBound = candidateLength + 1;
    } else {
      upperBound = candidateLength - 1;
    }
  }

  return maximumPossible;

  function canAchieveK(targetLength) {
    let totalSegments = 0;
    for (const singleRibbonLength of ribbons) {
      totalSegments += Math.floor(singleRibbonLength / targetLength);
      if (totalSegments >= k) {
        return true;
      }
    }
    return false;
  }
};
