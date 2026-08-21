/**
 * Check If String Is Decomposable Into Value Equal Substrings
 * Intuition: The string must be split into runs of identical characters of length 2 or 3, using length 2 exactly once. A run of length `L` is valid iff `L % 3 ≠ 1` (cannot be tiled by 2s and 3s except using extra 2s). Exactly one run should have `L % 3 === 2`.
 * Approach: 1. Scan `s` into run lengths. 2. For each length, if `len % 3 === 1` return false; if `len % 3 === 2` and a two-mod already appeared, return false. 3. Return whether exactly one such remainder-2 run existed.
 * Dry Run: s = "000111000".
 *   - Runs 3,3,3 → all %3==0, never found remainder 2 → false.
 * Dry Run: s = "00011111222" → runs 3,5,3. 5%3==2 once → true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isDecomposable = function (s) {
  let traversalIndex = 0;
  const consecutiveLengths = [];
  const stringLength = s.length;

  while (traversalIndex < stringLength) {
    const segmentStart = traversalIndex;
    const startingCharacter = s[traversalIndex];

    let segmentEnd = traversalIndex + 1;
    while (segmentEnd < stringLength && s[segmentEnd] === startingCharacter) {
      segmentEnd++;
    }

    const currentSegmentLength = segmentEnd - segmentStart;
    consecutiveLengths.push(currentSegmentLength);

    traversalIndex = segmentEnd;
  }

  let hasFoundTwoLengthSegment = false;
  const numberOfSegments = consecutiveLengths.length;

  for (
    let segmentIterator = 0;
    segmentIterator < numberOfSegments;
    segmentIterator++
  ) {
    const processingLength = consecutiveLengths[segmentIterator];

    if (processingLength % 3 === 1) {
      return false;
    } else if (processingLength % 3 === 2) {
      if (hasFoundTwoLengthSegment) {
        return false;
      }
      hasFoundTwoLengthSegment = true;
    }
  }

  return hasFoundTwoLengthSegment;
};
