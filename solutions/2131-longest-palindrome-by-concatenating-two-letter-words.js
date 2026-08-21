/**
 * Longest Palindrome By Concatenating Two Letter Words
 * Intuition: Palindromes are formed by matching words with their reverses, or by using a single self-reverse word in the center. Count word frequencies, then pair them up to maximize length.
 * Approach: 1. Store frequencies of all two-letter words in a map. 2. Initialize palindrome length to zero and a flag for a potential center word. 3. Iterate through each unique word and its count in the frequency map. 4. If a word is a palindrome itself (e.g., "gg"), add 4 for every two occurrences to the length and mark if an odd count remains for a center piece. 5. If a word is not a palindrome itself (e.g., "lc"), find its reverse ("cl"). If both exist, form pairs by taking the minimum count of the word and its reverse, adding 4 for each pair to the length. Mark both words as used by setting their counts to zero in the map to avoid double counting. 6. After iterating, if a center piece was marked, add 2 to the total length.
 * Dry Run: words = ["lc","cl","gg","gg","cc"]
 *   1. wordCounts = {"lc": 1, "cl": 1, "gg": 2, "cc": 1}
 *   2. currentTotalLength = 0, hasSingleCenter = false
 *   3. Iterate wordCounts entries:
 *      - currentEntry = ["lc", 1]
 *        - `lc` !== `cl`. reverseKey = "cl". wordCounts.get("cl") = 1.
 *        - matchedPairCount = min(1, 1) = 1.
 *        - currentTotalLength += 1 * 4 = 4.
 *        - wordCounts.set("lc", 0), wordCounts.set("cl", 0).
 *      - currentEntry = ["cl", 0] (skipped as count is 0)
 *      - currentEntry = ["gg", 2]
 *        - `gg` === `gg`.
 *        - currentTotalLength += floor(2 / 2) * 4 = 4. (currentTotalLength = 8).
 *        - 2 % 2 !== 1. hasSingleCenter remains false.
 *        - wordCounts.set("gg", 0).
 *      - currentEntry = ["cc", 1]
 *        - `cc` === `cc`.
 *        - currentTotalLength += floor(1 / 2) * 4 = 0. (currentTotalLength = 8).
 *        - 1 % 2 === 1. hasSingleCenter = true.
 *        - wordCounts.set("cc", 0).
 *   4. Loop ends. hasSingleCenter is true.
 *   5. currentTotalLength += 2. (currentTotalLength = 10).
 *   6. Return 10.
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var longestPalindrome = function (words) {
  const wordFrequencies = new Map();
  let currentTotalLength = 0;
  let hasSingleCenter = false;

  for (const initialWord of words) {
    wordFrequencies.set(
      initialWord,
      (wordFrequencies.get(initialWord) || 0) + 1
    );
  }

  for (const [uniqueWord, uniqueWordCount] of wordFrequencies.entries()) {
    if (uniqueWordCount === 0) {
      continue;
    }

    const firstChar = uniqueWord[0];
    const secondChar = uniqueWord[1];
    const reversedUniqueWord = secondChar + firstChar;

    if (uniqueWord === reversedUniqueWord) {
      const fullPairs = Math.floor(uniqueWordCount / 2);
      currentTotalLength += fullPairs * 4;
      if (uniqueWordCount % 2 === 1) {
        hasSingleCenter = true;
      }
      wordFrequencies.set(uniqueWord, 0);
    } else {
      if (wordFrequencies.has(reversedUniqueWord)) {
        const reverseWordCount = wordFrequencies.get(reversedUniqueWord);
        const matchedPairCount = Math.min(uniqueWordCount, reverseWordCount);
        currentTotalLength += matchedPairCount * 4;
        wordFrequencies.set(uniqueWord, 0);
        wordFrequencies.set(reversedUniqueWord, 0);
      }
    }
  }

  return hasSingleCenter ? currentTotalLength + 2 : currentTotalLength;
};
