/**
 * Sentence Similarity III
 * Time Complexity: O(L1 + L2)
 * Space Complexity: O(L1 + L2)
 */
var areSentencesSimilar = function (sentence1, sentence2) {
  let sentenceOneWords = sentence1.split(" ");
  let sentenceTwoWords = sentence2.split(" ");

  let longerSentenceParts;
  let shorterSentenceParts;

  if (sentenceOneWords.length < sentenceTwoWords.length) {
    longerSentenceParts = sentenceTwoWords;
    shorterSentenceParts = sentenceOneWords;
  } else {
    longerSentenceParts = sentenceOneWords;
    shorterSentenceParts = sentenceTwoWords;
  }

  let prefixMatchCount = 0;
  let forwardIndex = 0;
  while (
    forwardIndex < shorterSentenceParts.length &&
    longerSentenceParts[forwardIndex] === shorterSentenceParts[forwardIndex]
  ) {
    prefixMatchCount++;
    forwardIndex++;
  }

  let suffixEndIndexLonger = longerSentenceParts.length - 1;
  let suffixEndIndexShorter = shorterSentenceParts.length - 1;
  let suffixMatchCount = 0;

  while (
    suffixEndIndexShorter >= prefixMatchCount &&
    longerSentenceParts[suffixEndIndexLonger] ===
      shorterSentenceParts[suffixEndIndexShorter]
  ) {
    suffixMatchCount++;
    suffixEndIndexLonger--;
    suffixEndIndexShorter--;
  }

  return prefixMatchCount + suffixMatchCount >= shorterSentenceParts.length;
};
