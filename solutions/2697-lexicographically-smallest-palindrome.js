/**
 * Lexicographically Smallest Palindrome
 * Intuition: To achieve the lexicographically smallest palindrome with minimum operations, we must ensure that characters at symmetric positions are identical. When they differ, choosing the lexicographically smaller character for both positions guarantees the overall string is as small as possible from left to right.
 * Approach: 1. Convert the input string into a mutable character array. 2. Initialize two pointers, one starting at the beginning and the other at the end of the array. 3. Iterate inwards with these pointers until they meet or cross. 4. For each pair of characters pointed to, if they are not identical, replace both with the lexicographically smaller of the two. 5. Finally, join the modified character array back into a string.
 * Dry Run: s = "cbbd"
 * 1. stringCharacters = ['c', 'b', 'b', 'd']
 * 2. Loop (firstIndex = 0, lastIndex = 3):
 *    - stringCharacters[0] ('c') !== stringCharacters[3] ('d')
 *    - 'c' < 'd', so set stringCharacters[0] = 'c' and stringCharacters[3] = 'c'.
 *    - stringCharacters becomes ['c', 'b', 'b', 'c']
 *    - firstIndex becomes 1, lastIndex becomes 2.
 * 3. Loop (firstIndex = 1, lastIndex = 2):
 *    - stringCharacters[1] ('b') === stringCharacters[2] ('b'). No change.
 *    - firstIndex becomes 2, lastIndex becomes 1.
 * 4. Loop condition (firstIndex < lastIndex) is false (2 < 1 is false). Loop terminates.
 * 5. Return stringCharacters.join('') which is "cbbc".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var makeSmallestPalindrome = function (s) {
  const stringCharacters = s.split("");
  const stringLength = s.length;

  for (
    let firstIndex = 0, lastIndex = stringLength - 1;
    firstIndex < lastIndex;
    firstIndex++, lastIndex--
  ) {
    if (stringCharacters[firstIndex] !== stringCharacters[lastIndex]) {
      const chosenCharacter =
        stringCharacters[firstIndex] < stringCharacters[lastIndex]
          ? stringCharacters[firstIndex]
          : stringCharacters[lastIndex];
      stringCharacters[firstIndex] = chosenCharacter;
      stringCharacters[lastIndex] = chosenCharacter;
    }
  }

  return stringCharacters.join("");
};
