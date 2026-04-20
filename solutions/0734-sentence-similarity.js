/**
 * Sentence Similarity
 * Time Complexity: O(N + P * L)
 * Space Complexity: O(P * L)
 */
var areSentencesSimilar = function (sentence1, sentence2, similarPairs) {
  const primarySentenceWordCount = sentence1.length;
  const secondarySentenceWordCount = sentence2.length;

  if (primarySentenceWordCount !== secondarySentenceWordCount) {
    return false;
  }

  const wordSimilarityLookup = new Set();
  const numberOfSimilarPairs = similarPairs.length;
  let currentPairIndex = 0;

  while (currentPairIndex < numberOfSimilarPairs) {
    const pairEntry = similarPairs[currentPairIndex];
    const firstMember = pairEntry[0];
    const secondMember = pairEntry[1];

    wordSimilarityLookup.add(`${firstMember}:${secondMember}`);
    wordSimilarityLookup.add(`${secondMember}:${firstMember}`);
    currentPairIndex++;
  }

  let wordComparisonIndex = 0;
  const commonSentenceLength = primarySentenceWordCount;

  while (wordComparisonIndex < commonSentenceLength) {
    const wordFromFirstSentence = sentence1[wordComparisonIndex];
    const wordFromSecondSentence = sentence2[wordComparisonIndex];

    if (wordFromFirstSentence !== wordFromSecondSentence) {
      const similarityQueryKey = `${wordFromFirstSentence}:${wordFromSecondSentence}`;
      if (!wordSimilarityLookup.has(similarityQueryKey)) {
        return false;
      }
    }
    wordComparisonIndex++;
  }

  return true;
};
