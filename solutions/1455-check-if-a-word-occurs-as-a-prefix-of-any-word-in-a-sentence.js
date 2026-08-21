/**
 * Check If A Word Occurs As A Prefix Of Any Word In A Sentence
 * Intuition: Scan the sentence word by word (split on spaces) and test startsWith(searchWord), returning the 1-based word index.
 * Approach: 1. Walk charIndex through the string. 2. At each space or end, take substring(wordStart, charIndex). 3. If it starts with searchWord, return the ordinal. 4. Otherwise advance the word start; if none match return -1.
 * Dry Run: sentence = "i love eating burger", searchWord = "burg"
 *   - "i" no, "love" no, "eating" no, "burger" starts with "burg". Return 4.
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
