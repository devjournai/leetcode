/**
 * Longest Chunked Palindrome Decomposition
 * Intuition: Greedily take the shortest prefix that equals the corresponding suffix; each match adds 2 chunks and the middle is solved recursively. If no match, the whole remaining string is one chunk.
 * Approach: 1. Recurse on [L,R]. Empty=0, single char=1. 2. For chunk size 1..len/2, if text[L..L+sz) equals text(R-sz+1..R], return 2 + recurse inside. 3. Else return 1.
 * Dry Run: text = "ghiabcdefhelloadamhelloabcdefghi".
 *   - "ghi" matches both ends -> 2 + middle. Continue matching "abcdef" then "hello"; leftover "adam" is 1.
 *   - Answer 7.
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
        firstIndex + iterationChunkSize
      );
      const segmentTrailing = text.slice(
        lastIndex - iterationChunkSize + 1,
        lastIndex + 1
      );

      if (segmentLeading === segmentTrailing) {
        return (
          2 +
          computePartsCount(
            firstIndex + iterationChunkSize,
            lastIndex - iterationChunkSize
          )
        );
      }
    }

    return 1;
  }

  return computePartsCount(0, text.length - 1);
};
