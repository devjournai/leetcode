/**
 * Find And Replace Pattern
 * Intuition: Two strings match iff they share the same first-occurrence encoding: map each new char to the next integer and join those ids.
 * Approach: 1. `createNormalizedCode` walks the string, assigning fresh integers to unseen chars and joining ids with commas. 2. Encode `patternInput` once. 3. Keep words whose encoding equals the pattern's.
 * Dry Run: words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abb".
 *   - Pattern code "0,1,1". "mee" and "aqq" match; others do not.
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
