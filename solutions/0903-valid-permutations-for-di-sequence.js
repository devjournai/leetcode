/**
 * Valid Permutations For Di Sequence
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var numPermsDISequence = function (s) {
  const sLength = s.length;
  const moduloValue = 1e9 + 7;

  let previousDpRow = new Array(1).fill(1);
  let previousPrefixSums = new Array(1).fill(1);

  for (
    let currentSegmentLength = 1;
    currentSegmentLength <= sLength;
    currentSegmentLength++
  ) {
    let currentDpRow = new Array(currentSegmentLength + 1).fill(0);
    let currentPrefixSums = new Array(currentSegmentLength + 1).fill(0);
    let relationCharacter = s[currentSegmentLength - 1];

    for (
      let currentPermutationRank = 0;
      currentPermutationRank <= currentSegmentLength;
      currentPermutationRank++
    ) {
      if (relationCharacter === "D") {
        let decreasingSum =
          (previousPrefixSums[currentSegmentLength - 1] -
            (currentPermutationRank > 0
              ? previousPrefixSums[currentPermutationRank - 1]
              : 0) +
            moduloValue) %
          moduloValue;
        currentDpRow[currentPermutationRank] = decreasingSum;
      } else {
        let increasingSum =
          (currentPermutationRank > 0
            ? previousPrefixSums[currentPermutationRank - 1]
            : 0) % moduloValue;
        currentDpRow[currentPermutationRank] = increasingSum;
      }
    }

    for (let sumIndex = 0; sumIndex <= currentSegmentLength; sumIndex++) {
      let priorPrefixValue = sumIndex > 0 ? currentPrefixSums[sumIndex - 1] : 0;
      currentPrefixSums[sumIndex] =
        (priorPrefixValue + currentDpRow[sumIndex]) % moduloValue;
    }

    previousDpRow = currentDpRow;
    previousPrefixSums = currentPrefixSums;
  }

  return previousPrefixSums[sLength];
};
