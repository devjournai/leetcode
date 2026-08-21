/**
 * Scramble String
 * Intuition: s2 is a scramble of s1 iff we can split s1 into two parts that scramble-match either the same-order or swapped parts of s2; memoize on (s1 start, s1 end, s2 start) and prune by letter counts.
 * Approach: 1. 3D memo of size N×N×N. 2. Length 1: compare chars. 3. If frequencies differ, false. 4. Try every split: no-swap (left/right align) or swap (left of s1 vs right of s2). 5. Early true if s1===s2.
 * Dry Run: s1="great", s2="rgeat" → split "gr|eat" vs swapped "r|geat" works because "gr" scrambles to "rg" and "eat" matches → true
 * Time Complexity: O(N^4)
 * Space Complexity: O(N^3)
 */
var isScramble = function (s1, s2) {
  const stringLength = s1.length;

  const memoizationGrid = new Array(stringLength)
    .fill(null)
    .map(() =>
      new Array(stringLength)
        .fill(null)
        .map(() => new Array(stringLength).fill(null))
    );

  function checkCharacterCounts(
    sourceString,
    sourceStart,
    sourceEnd,
    targetString,
    targetStart,
    targetEnd
  ) {
    const characterFrequencies = new Array(26).fill(0);
    for (let idxOne = sourceStart; idxOne <= sourceEnd; idxOne++) {
      characterFrequencies[
        sourceString.charCodeAt(idxOne) - "a".charCodeAt(0)
      ]++;
    }
    for (let idxTwo = targetStart; idxTwo <= targetEnd; idxTwo++) {
      characterFrequencies[
        targetString.charCodeAt(idxTwo) - "a".charCodeAt(0)
      ]--;
    }
    for (let freqVal = 0; freqVal < 26; freqVal++) {
      if (characterFrequencies[freqVal] !== 0) {
        return false;
      }
    }
    return true;
  }

  function scrambleChecker(s1SubstrStart, s1SubstrEnd, s2SubstrStart) {
    const currentSubstrLength = s1SubstrEnd - s1SubstrStart + 1;
    const s2SubstrEnd = s2SubstrStart + currentSubstrLength - 1;

    if (memoizationGrid[s1SubstrStart][s1SubstrEnd][s2SubstrStart] !== null) {
      return memoizationGrid[s1SubstrStart][s1SubstrEnd][s2SubstrStart];
    }

    if (currentSubstrLength === 1) {
      const singleCharMatch = s1[s1SubstrStart] === s2[s2SubstrStart];
      memoizationGrid[s1SubstrStart][s1SubstrEnd][s2SubstrStart] =
        singleCharMatch;
      return singleCharMatch;
    }

    if (
      !checkCharacterCounts(
        s1,
        s1SubstrStart,
        s1SubstrEnd,
        s2,
        s2SubstrStart,
        s2SubstrEnd
      )
    ) {
      memoizationGrid[s1SubstrStart][s1SubstrEnd][s2SubstrStart] = false;
      return false;
    }

    let possibleScramble = false;

    for (
      let partitionIndex = s1SubstrStart;
      partitionIndex < s1SubstrEnd;
      partitionIndex++
    ) {
      const leftSegmentLength = partitionIndex - s1SubstrStart + 1;
      const rightSegmentLength = currentSubstrLength - leftSegmentLength;

      const noSwapOption =
        scrambleChecker(s1SubstrStart, partitionIndex, s2SubstrStart) &&
        scrambleChecker(
          partitionIndex + 1,
          s1SubstrEnd,
          s2SubstrStart + leftSegmentLength
        );

      const swapOption =
        scrambleChecker(
          s1SubstrStart,
          partitionIndex,
          s2SubstrStart + rightSegmentLength
        ) && scrambleChecker(partitionIndex + 1, s1SubstrEnd, s2SubstrStart);

      if (noSwapOption || swapOption) {
        possibleScramble = true;
        break;
      }
    }

    memoizationGrid[s1SubstrStart][s1SubstrEnd][s2SubstrStart] =
      possibleScramble;
    return possibleScramble;
  }

  if (stringLength === 0) return true;
  if (s1 === s2) return true;

  return scrambleChecker(0, stringLength - 1, 0);
};
