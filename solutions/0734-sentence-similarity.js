/**
 * Sentence Similarity
 * Intuition: Sentences must have the same length. Each aligned pair is similar if the words are equal or appear as a pair in `similarPairs` (either order). Similarity is not transitive here.
 * Approach: 1. Return false if lengths differ. 2. Insert `"a:b"` and `"b:a"` into `wordSimilarityLookup`. 3. For each index, if words differ and the key is missing, return false. Else true.
 * Dry Run: ["great","acting"] vs ["fine","drama"] with pairs (great,fine), (acting,drama) → true. Extra pair (fine,great) is already covered by the reverse key.
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
