/**
 * Sentence Similarity III
 * Intuition: One sentence is similar to the other if it is the other with a single contiguous insertion (possibly empty). That means the shorter sentence is a prefix plus suffix of the longer one.
 * Approach: 1. Split both sentences; call the longer `longerSentenceParts`. 2. Count matching prefix words. 3. Count matching suffix words that do not overlap the prefix. 4. Similar iff prefix+suffix covers the shorter sentence.
 * Dry Run: sentence1 = "My name is Haley", sentence2 = "My Haley".
 *   - Prefix "My", suffix "Haley" cover the shorter sentence → true.
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
