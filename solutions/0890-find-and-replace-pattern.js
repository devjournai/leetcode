/**
 * Find And Replace Pattern
 * Time Complexity: O(N * L)
 * Space Complexity: O(N * L)
 */
var findAndReplacePattern = function (wordsInput, patternInput) {
  function createNormalizedCode(targetString) {
    let charToIntegerMap = {};
    let nextAvailableInteger = 0;
    let resultantIntegerSequence = [];

    for (let charIdentifier of targetString) {
      if (charToIntegerMap[charIdentifier] === undefined) {
        charToIntegerMap[charIdentifier] = nextAvailableInteger;
        nextAvailableInteger++;
      }
      resultantIntegerSequence.push(charToIntegerMap[charIdentifier]);
    }
    return resultantIntegerSequence.join(",");
  }

  let patternCanonicalForm = createNormalizedCode(patternInput);
  let matchedWordsCollection = [];

  for (let currentWord of wordsInput) {
    let wordCanonicalForm = createNormalizedCode(currentWord);
    if (wordCanonicalForm === patternCanonicalForm) {
      matchedWordsCollection.push(currentWord);
    }
  }

  return matchedWordsCollection;
};
