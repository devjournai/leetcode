/**
 * Valid Permutations For Di Sequence
 * Intuition: `dp[rank]` is ways to permute 0..i so the last value's rank among them is `rank` and s[0..i-1] is satisfied. Prefix sums turn 'D'/'I' transitions into range sums. 'D' needs a previous last rank ≥ current rank; 'I' needs previous rank < current rank.
 * Approach: 1. Seed `previousDpRow`/`previousPrefixSums` as [1]. 2. For length 1..s.length, char = s[len-1]; for each new rank, if 'D' take suffix of previous row, if 'I' take prefix. 3. Rebuild prefix sums. 4. Return `previousPrefixSums[sLength]` (total ways), mod 1e9+7.
 * Dry Run: s = "DID".
 *   - After D,I,D the prefix total is 5 valid permutations of 0..3.
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
