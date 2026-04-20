/**
 * Unique Word Abbreviation
 * Time Complexity: O(N * L) 
 * Space Complexity: O(N * L)
 */
var ValidWordAbbr = function (dictionary) {
  this.abbreviationToWordsMap = new Map();

  for (const entryWord of dictionary) {
    const computedAbbreviation = this.getAbbreviation(entryWord);
    if (!this.abbreviationToWordsMap.has(computedAbbreviation)) {
      this.abbreviationToWordsMap.set(computedAbbreviation, new Set());
    }
    this.abbreviationToWordsMap.get(computedAbbreviation).add(entryWord);
  }
};

ValidWordAbbr.prototype.getAbbreviation = function (inputString) {
  const stringLength = inputString.length;
  if (stringLength <= 2) {
    return inputString;
  }
  const firstCharacter = inputString[0];
  const middleLength = stringLength - 2;
  const lastCharacter = inputString[stringLength - 1];
  const generatedAbbr = firstCharacter + middleLength + lastCharacter;
  return generatedAbbr;
};

ValidWordAbbr.prototype.isUnique = function (queryWord) {
  const queryAbbreviation = this.getAbbreviation(queryWord);
  const mappedWordSet = this.abbreviationToWordsMap.get(queryAbbreviation);

  if (!mappedWordSet) {
    return true;
  }

  const isSingleEntry = mappedWordSet.size === 1;
  const containsQueryWord = mappedWordSet.has(queryWord);

  return isSingleEntry && containsQueryWord;
};