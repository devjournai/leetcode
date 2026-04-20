/**
 * Check If A Word Occurs As A Prefix Of Any Word In A Sentence
 * Time Complexity: O(N * M)
 * Space Complexity: O(N)
 */
var isPrefixOfWord = function (sentence, searchWord) {
  const sentenceLen = sentence.length;
  const searchLen = searchWord.length;

  let charIndex = 0;
  let wordStartIdx = 0;
  let wordOrdinal = 1;

  while (charIndex <= sentenceLen) {
    if (charIndex === sentenceLen || sentence[charIndex] === " ") {
      const currentCandidateWord = sentence.substring(wordStartIdx, charIndex);

      if (currentCandidateWord.startsWith(searchWord)) {
        return wordOrdinal;
      }

      wordOrdinal++;
      wordStartIdx = charIndex + 1;
    }
    charIndex++;
  }

  return -1;
};
