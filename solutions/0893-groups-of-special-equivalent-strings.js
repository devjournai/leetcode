/**
 * Groups Of Special Equivalent Strings
 * Time Complexity: O(N * L log L)
 * Space Complexity: O(N * L)
 */
var numSpecialEquivGroups = function (inputWords) {
  const createCanonicalString = (targetWord) => {
    const evenCharacterBucket = [];
    const oddCharacterBucket = [];

    for (
      let iteratorIndex = 0;
      iteratorIndex < targetWord.length;
      iteratorIndex++
    ) {
      if (iteratorIndex % 2 === 0) {
        evenCharacterBucket.push(targetWord[iteratorIndex]);
      } else {
        oddCharacterBucket.push(targetWord[iteratorIndex]);
      }
    }

    evenCharacterBucket.sort();
    oddCharacterBucket.sort();

    const sortedEvenPart = evenCharacterBucket.join("");
    const sortedOddPart = oddCharacterBucket.join("");

    const combinedIdentifier = sortedEvenPart + "#" + sortedOddPart;
    return combinedIdentifier;
  };

  const canonicalRepresentations = new Set();

  for (const currentWord of inputWords) {
    const processedForm = createCanonicalString(currentWord);
    canonicalRepresentations.add(processedForm);
  }

  return canonicalRepresentations.size;
};
