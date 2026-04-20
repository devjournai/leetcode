/**
 * Prefix And Suffix Search
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
        prefixGenerationIterator,
      );

      for (
        let suffixGenerationIterator = 0;
        suffixGenerationIterator <= processingWordLength;
        suffixGenerationIterator++
      ) {
        let formedSuffix = currentProcessingWord.slice(
          suffixGenerationIterator,
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
