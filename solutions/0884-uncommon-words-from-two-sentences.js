/**
 * Uncommon Words From Two Sentences
 * Time Complexity: O(L1 + L2)
 * Space Complexity: O(L1 + L2)
 */
var uncommonFromSentences = function (s1, s2) {
  const combinedSentenceString = s1 + " " + s2;
  const splitWordsArray = combinedSentenceString.split(" ");

  const processedWords = [];
  for (const individualWord of splitWordsArray) {
    if (individualWord.length > 0) {
      processedWords.push(individualWord);
    }
  }

  const wordCountRegistry = new Map();
  for (const currentWordItem of processedWords) {
    const existingWordTally = wordCountRegistry.get(currentWordItem) || 0;
    wordCountRegistry.set(currentWordItem, existingWordTally + 1);
  }

  const uniqueWordsFound = [];
  for (const [wordIdentifier, wordFrequency] of wordCountRegistry.entries()) {
    if (wordFrequency === 1) {
      uniqueWordsFound.push(wordIdentifier);
    }
  }

  return uniqueWordsFound;
};
