/**
 * Prefix And Suffix Search
 * Intuition: Precompute every prefix/suffix pair of each word as `prefix#suffix` in a map. Later words overwrite earlier indices, so `f` returns the largest index matching both prefix and suffix.
 * Approach: 1. For each word (in order), for every prefix length and suffix start, `dictionaryMap.set(formedPrefix + "#" + formedSuffix, wordIndex)`. 2. `f` looks up `queryPrefix#querySuffix` or returns -1.
 * Dry Run: words = ["apple"]. Keys include "a#e" and "apple#apple". f("a","e") → 0. A later word "ace" would overwrite "a#e".
 * Time Complexity: O(N * L^3)
 * Space Complexity: O(N * L^3)
 */
var WordFilter = function (inputWords) {
  this.dictionaryMap = new Map();

  let totalWordEntries = inputWords.length;
  for (let wordIndex = 0; wordIndex < totalWordEntries; wordIndex++) {
    let currentProcessingWord = inputWords[wordIndex];
    let processingWordLength = currentProcessingWord.length;

    for (
      let prefixGenerationIterator = 0;
      prefixGenerationIterator <= processingWordLength;
      prefixGenerationIterator++
    ) {
      let formedPrefix = currentProcessingWord.slice(
        0,
        prefixGenerationIterator
      );

      for (
        let suffixGenerationIterator = 0;
        suffixGenerationIterator <= processingWordLength;
        suffixGenerationIterator++
      ) {
        let formedSuffix = currentProcessingWord.slice(
          suffixGenerationIterator
        );
        let combinedKey = formedPrefix + "#" + formedSuffix;
        this.dictionaryMap.set(combinedKey, wordIndex);
      }
    }
  }
};

WordFilter.prototype.f = function (queryPrefix, querySuffix) {
  const finalSearchKey = `${queryPrefix}#${querySuffix}`;
  return this.dictionaryMap.has(finalSearchKey)
    ? this.dictionaryMap.get(finalSearchKey)
    : -1;
};
