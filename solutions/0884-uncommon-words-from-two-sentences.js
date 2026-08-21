/**
 * Uncommon Words From Two Sentences
 * Intuition: A word is uncommon iff it appears exactly once across both sentences, so concatenate, split, and keep frequency-1 tokens.
 * Approach: 1. Join `s1` and `s2` with a space and split. 2. Skip empty tokens. 3. Count in `wordCountRegistry`. 4. Collect keys whose frequency is 1.
 * Dry Run: s1 = "this apple is sweet", s2 = "this apple is sour".
 *   - Counts: this/apple/is → 2, sweet/sour → 1. Return ["sweet","sour"].
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
