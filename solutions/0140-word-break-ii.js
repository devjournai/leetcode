/**
 * Word Break II
 * Time Complexity: O(L_total + N * L^2 + K * N)
 * Space Complexity: O(L_total + K * N)
 */
var wordBreak = function (s, wordDict) {
  const wordLookupSet = new Set(wordDict);
  const cachedResults = new Map();

  function segmentString(
    currentPosition,
    inputString,
    dictionaryReference,
    memoizationCache,
  ) {
    if (memoizationCache.has(currentPosition)) {
      return memoizationCache.get(currentPosition);
    }

    if (currentPosition === inputString.length) {
      return [[]];
    }

    const segmentationOptions = [];

    for (
      let nextCharacterIndex = currentPosition + 1;
      nextCharacterIndex <= inputString.length;
      nextCharacterIndex++
    ) {
      const potentialWord = inputString.substring(
        currentPosition,
        nextCharacterIndex,
      );

      if (dictionaryReference.has(potentialWord)) {
        const remainingBreaks = segmentString(
          nextCharacterIndex,
          inputString,
          dictionaryReference,
          memoizationCache,
        );

        for (const segmentWordList of remainingBreaks) {
          const completedSegment = [potentialWord, ...segmentWordList];
          segmentationOptions.push(completedSegment);
        }
      }
    }

    memoizationCache.set(currentPosition, segmentationOptions);
    return segmentationOptions;
  }

  const allWordLists = segmentString(0, s, wordLookupSet, cachedResults);
  const finalSentenceList = allWordLists.map((wordList) => wordList.join(" "));

  return finalSentenceList;
};
