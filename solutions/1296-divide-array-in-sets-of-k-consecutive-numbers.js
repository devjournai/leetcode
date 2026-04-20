/**
 * Divide Array In Sets Of K Consecutive Numbers
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var isPossibleDivide = function (nums, k) {
  if (nums.length % k !== 0) {
    return false;
  }

  const elementCounts = new Map();
  for (const singleNumber of nums) {
    elementCounts.set(singleNumber, (elementCounts.get(singleNumber) || 0) + 1);
  }

  const orderedKeys = Array.from(elementCounts.keys()).sort(
    (valA, valB) => valA - valB,
  );

  for (const currentKey of orderedKeys) {
    const keyFrequency = elementCounts.get(currentKey);

    if (keyFrequency > 0) {
      for (let sequencePosition = 0; sequencePosition < k; sequencePosition++) {
        const consecutiveCandidate = currentKey + sequencePosition;
        const candidateFrequency = elementCounts.get(consecutiveCandidate) || 0;

        if (candidateFrequency < keyFrequency) {
          return false;
        }
        elementCounts.set(
          consecutiveCandidate,
          candidateFrequency - keyFrequency,
        );
      }
    }
  }

  return true;
};
