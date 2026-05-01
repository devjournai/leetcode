/**
 * Splitting A String Into Descending Consecutive Values
 * Time Complexity: O(N^4)
 * Space Complexity: O(N)
 */
var splitString = function (s) {
  function recursiveSplitCheck(
    currentParsingIndex,
    previousSegmentValue,
    partsFoundCount,
  ) {
    if (currentParsingIndex === s.length) {
      return partsFoundCount >= 2;
    }

    let currentAttemptValue = 0n;

    for (
      let segmentEndingPointer = currentParsingIndex;
      segmentEndingPointer < s.length;
      segmentEndingPointer++
    ) {
      currentAttemptValue =
        currentAttemptValue * 10n + BigInt(s[segmentEndingPointer]);

      if (currentAttemptValue >= previousSegmentValue) {
        break;
      }

      if (previousSegmentValue - currentAttemptValue === 1n) {
        if (
          recursiveSplitCheck(
            segmentEndingPointer + 1,
            currentAttemptValue,
            partsFoundCount + 1,
          )
        ) {
          return true;
        }
      }
    }

    return false;
  }

  let firstSegmentValueCandidate = 0n;

  for (
    let initialSegmentEnd = 0;
    initialSegmentEnd < s.length - 1;
    initialSegmentEnd++
  ) {
    firstSegmentValueCandidate =
      firstSegmentValueCandidate * 10n + BigInt(s[initialSegmentEnd]);

    if (
      recursiveSplitCheck(initialSegmentEnd + 1, firstSegmentValueCandidate, 1)
    ) {
      return true;
    }
  }

  return false;
};
