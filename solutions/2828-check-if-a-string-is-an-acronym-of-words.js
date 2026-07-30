/**
 * Check If A String Is An Acronym Of Words
 * Intuition: An acronym fundamentally requires two conditions: the count of words must equal the length of the candidate acronym string, and each character of the candidate acronym must sequentially match the first letter of its corresponding word.
 * Approach: 1. Obtain the total count of words in the input array and the overall length of the acronym string. 2. Immediately compare these two lengths; if they do not match, the string cannot be an acronym, so return false. 3. Initialize an index counter to traverse both the array of words and the acronym string. 4. Iterate using this counter: for each position, extract the first character of the word at the current index from the words array and compare it with the character at the same index in the acronym string. 5. If any pair of characters does not match, return false, as the acronym condition is violated. 6. If the loop completes without encountering any mismatches, it signifies that all first letters align correctly with the acronym string, therefore return true.
 * Dry Run: words = ["apple", "banana"], s = "ab"
 *   1. wordsCount = 2, stringLength = 2.
 *   2. wordsCount (2) !== stringLength (2)? No, they are equal.
 *   3. wordIterator = 0.
 *   4. Loop (wordIterator < wordsCount):
 *      - wordIterator is 0:
 *          - currentWord = "apple".
 *          - firstLetter = 'a'.
 *          - correspondingChar = 'a'.
 *          - 'a' !== 'a'? No, they are equal.
 *          - wordIterator increments to 1.
 *      - wordIterator is 1:
 *          - currentWord = "banana".
 *          - firstLetter = 'b'.
 *          - correspondingChar = 'b'.
 *          - 'b' !== 'b'? No, they are equal.
 *          - wordIterator increments to 2.
 *   5. Loop condition (wordIterator < wordsCount), 2 < 2? No, loop terminates.
 *   6. Return true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var isAcronym = function (words, s) {
  const totalWords = words.length;
  const targetLength = s.length;

  if (totalWords !== targetLength) {
    return false;
  }

  let wordIndex = 0;
  while (wordIndex < totalWords) {
    const selectedWord = words[wordIndex];
    const initialChar = selectedWord[0];
    const targetChar = s[wordIndex];

    if (initialChar !== targetChar) {
      return false;
    }
    wordIndex++;
  }

  return true;
};
