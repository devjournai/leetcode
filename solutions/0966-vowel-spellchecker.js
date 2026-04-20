/**
 * Vowel Spellchecker
 * Time Complexity: O(N*L + Q*L)
 * Space Complexity: O(N*L + Q*L)
 */
var spellchecker = function (wordList, queryList) {
  const exactWordSet = new Set();
  const caseInsensitiveMapping = new Map();
  const vowelErrorMapping = new Map();

  const generateVowelMask = (currentString) => {
    const lowerString = currentString.toLowerCase();
    const maskedResult = lowerString.replace(/[aeiou]/g, "_");
    return maskedResult;
  };

  for (const originalEntry of wordList) {
    exactWordSet.add(originalEntry);

    const lowerCaseForm = originalEntry.toLowerCase();
    if (!caseInsensitiveMapping.has(lowerCaseForm)) {
      caseInsensitiveMapping.set(lowerCaseForm, originalEntry);
    }

    const vowelMaskedForm = generateVowelMask(originalEntry);
    if (!vowelErrorMapping.has(vowelMaskedForm)) {
      vowelErrorMapping.set(vowelMaskedForm, originalEntry);
    }
  }

  const answerCollection = [];
  for (const specificQuery of queryList) {
    let resolvedResponse = "";

    if (exactWordSet.has(specificQuery)) {
      resolvedResponse = specificQuery;
    } else {
      const queryLower = specificQuery.toLowerCase();
      if (caseInsensitiveMapping.has(queryLower)) {
        resolvedResponse = caseInsensitiveMapping.get(queryLower);
      } else {
        const queryVowelMasked = generateVowelMask(specificQuery);
        if (vowelErrorMapping.has(queryVowelMasked)) {
          resolvedResponse = vowelErrorMapping.get(queryVowelMasked);
        }
      }
    }
    answerCollection.push(resolvedResponse);
  }

  return answerCollection;
};
