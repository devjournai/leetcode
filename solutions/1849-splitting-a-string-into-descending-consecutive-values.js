/**
 * Splitting A String Into Descending Consecutive Values
 * Intuition: Try every first number, then DFS later segments that equal previous−1, requiring at least two parts. Use BigInt so leading segments can be huge.
 * Approach: 1. Grow `firstSegmentValueCandidate` from prefixes of `s` (leave at least one digit). 2. `recursiveSplitCheck` extends `currentAttemptValue` until it would exceed `previousSegmentValue`; recurse only when the difference is 1. 3. Success when the string is fully consumed with `partsFoundCount >= 2`.
 * Dry Run: s = "123".
 *   - First "1", then try "2" (prev-1) then "3" → true (1,2,3).
 * Time Complexity: O(N^4)
 * Space Complexity: O(N)
 */
var splitString = function (s) {
  function recursiveSplitCheck(
    currentParsingIndex,
    previousSegmentValue,
    partsFoundCount
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
            partsFoundCount + 1
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
