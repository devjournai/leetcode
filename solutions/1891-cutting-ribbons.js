/**
 * Cutting Ribbons
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
