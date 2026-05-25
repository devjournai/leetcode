/**
 * Find First Palindromic String In The Array
 * Intuition: Iterate through each word in the input array. For each word, determine if it is a palindrome by comparing characters from both ends inwards. The first word found to be a palindrome is the result.
 * Approach: 1. Initialize a 'for' loop to iterate through each string in the given 'words' array using an index. 2. Inside this loop, for each 'currentWord', set up two integer pointers: 'leftBoundary' starting at the beginning (index 0) and 'rightBoundary' starting at the end (last index) of the 'currentWord'. 3. Initialize a boolean flag 'isCandidatePalindrome' to true. 4. Use an inner 'while' loop that continues as long as 'leftBoundary' is less than 'rightBoundary'. 5. Within the inner 'while' loop, compare the characters at 'currentWord[leftBoundary]' and 'currentWord[rightBoundary]'. If they are not equal, set 'isCandidatePalindrome' to false and immediately 'break' out of the inner 'while' loop, as the word cannot be a palindrome. 6. If the characters match, increment 'leftBoundary' and decrement 'rightBoundary' to move the pointers inwards. 7. After the inner 'while' loop completes (either by pointers meeting/crossing or by a mismatch), check the 'isCandidatePalindrome' flag. If it is true, then 'currentWord' is the first palindromic string found, so return it immediately. 8. If the outer 'for' loop finishes without finding any palindromic string, return an empty string "".
 * Dry Run: words = ["abc","car","ada","racecar","cool"]
 *   1. Outer loop starts. totalWords = 5. currentWordIndex = 0.
 *      currentWord = "abc" (wordCharLength = 3).
 *      leftBoundary = 0, rightBoundary = 2.
 *      isCandidatePalindrome = true.
 *      Inner while (leftBoundary < rightBoundary):
 *          0 < 2 is true. currentWord[0] ('a') !== currentWord[2] ('c').
 *          isCandidatePalindrome = false.
 *          Break from inner while loop.
 *      Check if (isCandidatePalindrome) is false.
 *      currentWordIndex increments to 1.
 *   2. currentWordIndex = 1.
 *      currentWord = "car" (wordCharLength = 3).
 *      leftBoundary = 0, rightBoundary = 2.
 *      isCandidatePalindrome = true.
 *      Inner while (leftBoundary < rightBoundary):
 *          0 < 2 is true. currentWord[0] ('c') !== currentWord[2] ('r').
 *          isCandidatePalindrome = false.
 *          Break from inner while loop.
 *      Check if (isCandidatePalindrome) is false.
 *      currentWordIndex increments to 2.
 *   3. currentWordIndex = 2.
 *      currentWord = "ada" (wordCharLength = 3).
 *      leftBoundary = 0, rightBoundary = 2.
 *      isCandidatePalindrome = true.
 *      Inner while (leftBoundary < rightBoundary):
 *          0 < 2 is true. currentWord[0] ('a') === currentWord[2] ('a').
 *          leftBoundary increments to 1. rightBoundary decrements to 1.
 *          Inner while (leftBoundary < rightBoundary): 1 < 1 is false. Loop ends.
 *      Check if (isCandidatePalindrome) is true.
 *      Return "ada". (Execution stops here).
 * Time Complexity: O(N * L)
 * Space Complexity: O(1)
 */
var firstPalindrome = function (words) {
  const totalWords = words.length;

  for (
    let currentWordIndex = 0;
    currentWordIndex < totalWords;
    currentWordIndex++
  ) {
    const currentWord = words[currentWordIndex];
    const wordCharLength = currentWord.length;
    let leftBoundary = 0;
    let rightBoundary = wordCharLength - 1;
    let isCandidatePalindrome = true;

    while (leftBoundary < rightBoundary) {
      if (currentWord[leftBoundary] !== currentWord[rightBoundary]) {
        isCandidatePalindrome = false;
        break;
      }
      leftBoundary++;
      rightBoundary--;
    }

    if (isCandidatePalindrome) {
      return currentWord;
    }
  }

  return "";
};
