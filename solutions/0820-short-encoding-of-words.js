/**
 * Short Encoding Of Words
 * Time Complexity: O(N * L^2)
 * Space Complexity: O(N * L)
 */
var minimumLengthEncoding = function (words) {
  const uniqueStringsSet = new Set(words);

  for (const currentReferenceWord of uniqueStringsSet) {
    for (
      let currentSuffixStartingIndex = 1;
      currentSuffixStartingIndex < currentReferenceWord.length;
      currentSuffixStartingIndex++
    ) {
      const extractedSuffix = currentReferenceWord.slice(
        currentSuffixStartingIndex,
      );
      uniqueStringsSet.delete(extractedSuffix);
    }
  }

  let totalEncodingLength = 0;
  for (const remainingWordInSet of uniqueStringsSet) {
    totalEncodingLength += remainingWordInSet.length + 1;
  }

  return totalEncodingLength;
};
