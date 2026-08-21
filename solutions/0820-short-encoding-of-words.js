/**
 * Short Encoding Of Words
 * Intuition: In a `#`-joined encoding, a word that is a suffix of another is already included. Keep only words that are not suffixes of some remaining word.
 * Approach: 1. Put words in a Set. 2. For each word, delete every proper suffix. 3. Sum `length+1` for leftover words (`#` terminator).
 * Dry Run: ["time","me","bell"]. "me" is a suffix of "time" and is deleted. Remaining time+bell → 10.
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
        currentSuffixStartingIndex
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
