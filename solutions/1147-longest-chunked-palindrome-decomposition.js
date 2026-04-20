/**
 * Longest Chunked Palindrome Decomposition
 * Time Complexity: O(N^3)
 * Space Complexity: O(N)
 */
var longestDecomposition = function (text) {
  function computePartsCount(firstIndex, lastIndex) {
    if (firstIndex > lastIndex) {
      return 0;
    }
    if (firstIndex === lastIndex) {
      return 1;
    }

    const currentSegmentLength = lastIndex - firstIndex + 1;

    for (
      let iterationChunkSize = 1;
      iterationChunkSize * 2 <= currentSegmentLength;
      iterationChunkSize++
    ) {
      const segmentLeading = text.slice(
        firstIndex,
        firstIndex + iterationChunkSize,
      );
      const segmentTrailing = text.slice(
        lastIndex - iterationChunkSize + 1,
        lastIndex + 1,
      );

      if (segmentLeading === segmentTrailing) {
        return (
          2 +
          computePartsCount(
            firstIndex + iterationChunkSize,
            lastIndex - iterationChunkSize,
          )
        );
      }
    }

    return 1;
  }

  return computePartsCount(0, text.length - 1);
};
