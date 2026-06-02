/**
 * Minimum Number Of Moves To Make Palindrome
 * Intuition: The problem can be solved greedily by iteratively building the palindrome from the outside in. For each outermost pair, we try to find a match for the leftmost character from the right side of the remaining string. If a match is found, we move it to the rightmost available position with minimum adjacent swaps and then remove both paired characters. If no match is found (meaning the leftmost character must be the unique middle character of an odd-length palindrome), we move it to the exact center.
 * Approach: 1. Convert the input string `s` into a mutable character array `currentCharacters`. 2. Initialize a counter `totalSwapCount` to zero. 3. Loop while `currentCharacters` contains more than one character. 4. In each iteration, take the character at the front (`currentCharacters[0]`). 5. Find the index of its rightmost occurrence in the `currentCharacters` array using `lastIndexOf`. 6. If the rightmost occurrence is at index 0 (meaning it's a unique character for the current subproblem), calculate the moves needed to place it in the center of the remaining string (`Math.floor(currentCharacters.length / 2)`), add these moves to `totalSwapCount`, and remove this character from the front. 7. If the rightmost occurrence is not at index 0, iterate from that `rightmostMatchPosition` up to the second-to-last position (`currentCharacters.length - 1`), swapping adjacent characters to effectively move the matched character to the end. Increment `totalSwapCount` for each swap. 8. After moving the match, remove the character from the front (`currentCharacters.shift()`) and the character from the end (`currentCharacters.pop()`) as they now form a palindrome pair. 9. Once the loop finishes, `totalSwapCount` will hold the minimum number of moves.
 * Dry Run: For input s = "eqmem"
 * 1. currentCharacters = ['e', 'q', 'm', 'e', 'm'], totalSwapCount = 0
 * 2. Loop (length 5 > 1):
 *    firstAvailableChar = 'e', rightmostMatchPosition = 3 (for 'e')
 *    rightmostMatchPosition is not 0 (it's 3).
 *    Loop shiftPointer from index 3 to < 4:
 *      shiftPointer = 3: Swap currentCharacters[3] ('e') and currentCharacters[4] ('m').
 *        currentCharacters = ['e', 'q', 'm', 'm', 'e'], totalSwapCount = 1
 *    Remove first and last: currentCharacters.pop(), currentCharacters.shift()
 *    currentCharacters = ['q', 'm', 'm'], totalSwapCount = 1
 * 3. Loop (length 3 > 1):
 *    firstAvailableChar = 'q', rightmostMatchPosition = 0 (for 'q')
 *    rightmostMatchPosition is 0.
 *    middleTargetPosition = Math.floor(3 / 2) = 1.
 *    totalSwapCount += 1 => totalSwapCount = 2.
 *    Remove first: currentCharacters.splice(0, 1)
 *    currentCharacters = ['m', 'm'], totalSwapCount = 2
 * 4. Loop (length 2 > 1):
 *    firstAvailableChar = 'm', rightmostMatchPosition = 1 (for 'm')
 *    rightmostMatchPosition is not 0 (it's 1).
 *    Loop shiftPointer from index 1 to < 1: (loop does not run)
 *    Remove first and last: currentCharacters.pop(), currentCharacters.shift()
 *    currentCharacters = [], totalSwapCount = 2
 * 5. Loop (length 0 > 1) is false.
 * 6. Return totalSwapCount = 2.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minMovesToMakePalindrome = function (s) {
  const currentCharacters = s.split("");
  let totalSwapCount = 0;

  while (currentCharacters.length > 1) {
    const firstAvailableChar = currentCharacters[0];
    const rightmostMatchPosition =
      currentCharacters.lastIndexOf(firstAvailableChar);

    if (rightmostMatchPosition === 0) {
      const middleTargetPosition = Math.floor(currentCharacters.length / 2);
      totalSwapCount += middleTargetPosition;
      currentCharacters.splice(0, 1);
    } else {
      for (
        let shiftPointer = rightmostMatchPosition;
        shiftPointer < currentCharacters.length - 1;
        shiftPointer++
      ) {
        [currentCharacters[shiftPointer], currentCharacters[shiftPointer + 1]] =
          [
            currentCharacters[shiftPointer + 1],
            currentCharacters[shiftPointer],
          ];
        totalSwapCount++;
      }
      currentCharacters.pop();
      currentCharacters.shift();
    }
  }

  return totalSwapCount;
};
