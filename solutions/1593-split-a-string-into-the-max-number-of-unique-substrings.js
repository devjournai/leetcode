/**
 * Split A String Into The Max Number Of Unique Substrings
 * Intuition: Backtracking: try every next unique piece and keep the max set size.
 * Approach: 1. DFS from i with a Set. 2. For each end, if the slice is unseen, recurse. 3. Return max size.
 * Dry Run: s = "ababccc".
 *   - One optimal split has 5 unique pieces.
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
          calculateMaxSplits(segmentEndIndex, currentSetOfUniqueSegments)
        );
        currentSetOfUniqueSegments.delete(potentialSegment);
      }
    }

    return currentPathMaxCount;
  }

  return calculateMaxSplits(0, new Set());
};
