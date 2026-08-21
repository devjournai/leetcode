/**
 * Vowel Spellchecker
 * Intuition: Resolve queries in priority: exact set match, then first case-insensitive word, then first vowel-masked word (`generateVowelMask` replaces vowels with `_`).
 * Approach: 1. Index `wordList` into `exactWordSet`, `caseInsensitiveMapping`, `vowelErrorMapping` (first wins). 2. For each query, try exact, then lowercased map, then vowel mask. 3. Else push `""`. 4. Return `answerCollection`.
 * Dry Run: wordList = ["KiTe"], queryList = ["kite","Kite"]. Exact misses; lower "kite" maps to "KiTe". Both queries become "KiTe".
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
