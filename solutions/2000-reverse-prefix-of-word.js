/**
 * Reverse Prefix Of Word
 * Intuition: The core idea is to locate the target character's first appearance. If found, we identify the prefix segment that needs reversal. The most efficient way to reverse a segment of characters in place is often a two-pointer swap strategy. The remainder of the string stays untouched.
 * Approach: 1. Convert the input `word` string into a mutable array of characters. 2. Iterate through this character array to find the index of the first occurrence of `ch`. 3. If `ch` is not found, return the original `word`. 4. If `ch` is found at `foundPosition`, initialize two pointers: `reverseLeft` at 0 and `reverseRight` at `foundPosition`. 5. While `reverseLeft` is less than `reverseRight`, swap the characters at `wordCharacters[reverseLeft]` and `wordCharacters[reverseRight]`. 6. Increment `reverseLeft` and decrement `reverseRight` in each iteration. 7. After the reversal loop completes, join the `wordCharacters` array back into a string and return it.
 * Dry Run: word = "abcdefd", ch = "d"
 *   1. initialWord = "abcdefd", searchChar = "d"
 *   2. wordCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'd']
 *   3. stringLength = 7
 *   4. searchCounter loop:
 *      - searchCounter = 0, wordCharacters[0] = 'a' != 'd'
 *      - searchCounter = 1, wordCharacters[1] = 'b' != 'd'
 *      - searchCounter = 2, wordCharacters[2] = 'c' != 'd'
 *      - searchCounter = 3, wordCharacters[3] = 'd' == 'd'. Set foundPosition = 3. Break.
 *   5. foundPosition = 3 (not -1). Proceed with reversal.
 *   6. reverseLeft = 0, reverseRight = 3
 *   7. Loop:
 *      - reverseLeft = 0, reverseRight = 3: wordCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'd']
 *        tempStorage = wordCharacters[0] ('a')
 *        wordCharacters[0] = wordCharacters[3] ('d') -> ['d', 'b', 'c', 'd', 'e', 'f', 'd']
 *        wordCharacters[3] = tempStorage ('a') -> ['d', 'b', 'c', 'a', 'e', 'f', 'd']
 *        reverseLeft becomes 1, reverseRight becomes 2
 *      - reverseLeft = 1, reverseRight = 2: wordCharacters = ['d', 'b', 'c', 'a', 'e', 'f', 'd']
 *        tempStorage = wordCharacters[1] ('b')
 *        wordCharacters[1] = wordCharacters[2] ('c') -> ['d', 'c', 'c', 'a', 'e', 'f', 'd']
 *        wordCharacters[2] = tempStorage ('b') -> ['d', 'c', 'b', 'a', 'e', 'f', 'd']
 *        reverseLeft becomes 2, reverseRight becomes 1
 *      - Condition reverseLeft < reverseRight (2 < 1) is false. Loop terminates.
 *   8. assembledString = wordCharacters.join('') = "dcbaefd"
 *   9. Return "dcbaefd".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reversePrefix = function (word, ch) {
  let initialWord = word;
  let searchChar = ch;

  let foundPosition = -1;
  let wordCharacters = Array.from(initialWord);
  let stringLength = initialWord.length;

  let searchCounter = 0;
  while (searchCounter < stringLength) {
    if (wordCharacters[searchCounter] === searchChar) {
      foundPosition = searchCounter;
      break;
    }
    searchCounter++;
  }

  if (foundPosition === -1) {
    return initialWord;
  }

  let reverseLeft = 0;
  let reverseRight = foundPosition;

  while (reverseLeft < reverseRight) {
    let tempStorage = wordCharacters[reverseLeft];
    wordCharacters[reverseLeft] = wordCharacters[reverseRight];
    wordCharacters[reverseRight] = tempStorage;

    reverseLeft++;
    reverseRight--;
  }

  let assembledString = wordCharacters.join("");
  return assembledString;
};
