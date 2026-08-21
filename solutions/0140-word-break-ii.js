/**
 * Word Break II
 * Intuition: Every dictionary word that matches a prefix of the remaining suffix can start a sentence; the rest of the suffix is solved the same way. Memoizing all segmentations from each index avoids repeating work when prefixes share suffixes.
 * Approach: 1. Put `wordDict` in `wordLookupSet` and create `cachedResults`. 2. Recurse with `segmentString(currentPosition, ...)`: if `memoizationCache` has `currentPosition`, return it; if `currentPosition === inputString.length`, return `[[]]` (one empty completion). 3. For each `nextCharacterIndex` after `currentPosition`, take `potentialWord = inputString.substring(currentPosition, nextCharacterIndex)`. 4. If it is in the set, recurse from `nextCharacterIndex` and prepend `potentialWord` to each remaining word list. 5. Store `segmentationOptions` in the cache. 6. Call from index 0 and join each word list with spaces.
 * Dry Run: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
 * From 0: "cat" → from 3: "sand" → from 7: "dog" → [[cat,sand,dog]]
 * From 0: "cats" → from 4: "and" → from 7: "dog" → [[cats,and,dog]]
 * Join: ["cat sand dog", "cats and dog"]
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
    memoizationCache
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
        nextCharacterIndex
      );

      if (dictionaryReference.has(potentialWord)) {
        const remainingBreaks = segmentString(
          nextCharacterIndex,
          inputString,
          dictionaryReference,
          memoizationCache
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
