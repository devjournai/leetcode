/**
 * Split A String Into The Max Number Of Unique Substrings
 * Time Complexity: O(N^2 * 2^N)
 * Space Complexity: O(N^2)
 */
var maxUniqueSplit = function (s) {
  const mainString = s;

  function calculateMaxSplits(startPosition, currentSetOfUniqueSegments) {
    if (startPosition === mainString.length) {
      return currentSetOfUniqueSegments.size;
    }

    let currentPathMaxCount = 0;

    for (
      let segmentLength = 1;
      startPosition + segmentLength <= mainString.length;
      segmentLength++
    ) {
      const segmentEndIndex = startPosition + segmentLength;
      const potentialSegment = mainString.slice(startPosition, segmentEndIndex);

      if (!currentSetOfUniqueSegments.has(potentialSegment)) {
        currentSetOfUniqueSegments.add(potentialSegment);
        currentPathMaxCount = Math.max(
          currentPathMaxCount,
          calculateMaxSplits(segmentEndIndex, currentSetOfUniqueSegments),
        );
        currentSetOfUniqueSegments.delete(potentialSegment);
      }
    }

    return currentPathMaxCount;
  }

  return calculateMaxSplits(0, new Set());
};
