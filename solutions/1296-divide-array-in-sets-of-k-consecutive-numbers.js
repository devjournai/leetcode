/**
 * Divide Array In Sets Of K Consecutive Numbers
 * Intuition: Greedy from the smallest remaining value: each leftover count of x must start that many hands x,x+1,...,x+k-1.
 * Approach: 1. If n not divisible by k, false. 2. Frequency map, sort unique keys. 3. For each key with remaining count c>0, subtract c from the next k consecutive keys; fail if any is short. 4. Return true.
 * Dry Run: nums=[1,2,3,3,4,4,5,6], k=4
 *   start at 1 count 1: take 1,2,3,4. Then 3 count 1: take 3,4,5,6. All zero. Return true.
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
    (valA, valB) => valA - valB
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
          candidateFrequency - keyFrequency
        );
      }
    }
  }

  return true;
};
