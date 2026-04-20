/**
 * Construct The Lexicographically Largest Valid Sequence
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
