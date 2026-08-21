/**
 * Construct The Lexicographically Largest Valid Sequence
 * Intuition: Length 2n−1: place each k>1 twice with distance k, and 1 once. Backtrack from the left trying large numbers first for a lexicographically largest sequence.
 * Approach: 1. `solutionArray` of zeros, `isNumberUsed`. 2. `findSequence(currentIdx)` skips filled slots; try `candidateVal` from n down to 1; place second copy at `idx+val` if needed. 3. Backtrack on failure. 4. Return `solutionArray`.
 * Dry Run: n = 3
 * Place 3 at 0 and 3, then 2 at 1 and 3 conflict; 2 at 1 and 3... result [3,1,2,3,2].
 * Time Complexity: O(n^2 * 2^n)
 * Space Complexity: O(n)
 */
var constructDistancedSequence = function (n) {
  const sequenceLength = 2 * n - 1;
  const solutionArray = new Array(sequenceLength).fill(0);
  const isNumberUsed = new Array(n + 1).fill(false);

  function findSequence(currentIdx) {
    if (currentIdx === sequenceLength) {
      return true;
    }

    if (solutionArray[currentIdx] !== 0) {
      return findSequence(currentIdx + 1);
    }

    for (let candidateVal = n; candidateVal >= 1; candidateVal--) {
      if (isNumberUsed[candidateVal]) {
        continue;
      }

      solutionArray[currentIdx] = candidateVal;
      isNumberUsed[candidateVal] = true;

      let canPlaceValue = false;
      let secondPlacementIdx = -1;

      if (candidateVal === 1) {
        canPlaceValue = true;
      } else {
        const calculatedSecondIdx = currentIdx + candidateVal;
        if (
          calculatedSecondIdx < sequenceLength &&
          solutionArray[calculatedSecondIdx] === 0
        ) {
          solutionArray[calculatedSecondIdx] = candidateVal;
          secondPlacementIdx = calculatedSecondIdx;
          canPlaceValue = true;
        }
      }

      if (canPlaceValue) {
        if (findSequence(currentIdx + 1)) {
          return true;
        }
      }

      solutionArray[currentIdx] = 0;
      isNumberUsed[candidateVal] = false;
      if (secondPlacementIdx !== -1) {
        solutionArray[secondPlacementIdx] = 0;
      }
    }

    return false;
  }

  findSequence(0);
  return solutionArray;
};
