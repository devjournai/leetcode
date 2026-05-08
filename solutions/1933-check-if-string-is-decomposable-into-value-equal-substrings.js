/**
 * Check If String Is Decomposable Into Value Equal Substrings
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
