/**
 * Removing Stars From A String
 * Intuition: The problem describes a Last-In, First-Out (LIFO) behavior: a star removes the *closest* non-star character to its left. This is a classic indicator for using a stack data structure.
 * Approach: 1. Initialize an empty array to serve as a stack for storing characters. 2. Iterate through the input string character by character. 3. If the current character is not a star, push it onto the stack. 4. If the current character is a star, pop the top element from the stack (which represents the closest non-star character to its left). 5. After processing all characters, join the elements remaining in the stack to form the final string.
 * Dry Run: s = "leet**cod*e"
 * 1. charStack = [], charIndex = 0, stringLength = 11
 * 2. charIndex = 0, currentChar = 'l': charStack.push('l') -> ['l']
 * 3. charIndex = 1, currentChar = 'e': charStack.push('e') -> ['l', 'e']
 * 4. charIndex = 2, currentChar = 'e': charStack.push('e') -> ['l', 'e', 'e']
 * 5. charIndex = 3, currentChar = 't': charStack.push('t') -> ['l', 'e', 'e', 't']
 * 6. charIndex = 4, currentChar = '*': charStack.pop() -> ['l', 'e', 'e']
 * 7. charIndex = 5, currentChar = '*': charStack.pop() -> ['l', 'e']
 * 8. charIndex = 6, currentChar = 'c': charStack.push('c') -> ['l', 'e', 'c']
 * 9. charIndex = 7, currentChar = 'o': charStack.push('o') -> ['l', 'e', 'c', 'o']
 * 10. charIndex = 8, currentChar = 'd': charStack.push('d') -> ['l', 'e', 'c', 'o', 'd']
 * 11. charIndex = 9, currentChar = '*': charStack.pop() -> ['l', 'e', 'c', 'o']
 * 12. charIndex = 10, currentChar = 'e': charStack.push('e') -> ['l', 'e', 'c', 'o', 'e']
 * 13. Loop finishes.
 * 14. finalResultString = ['l', 'e', 'c', 'o', 'e'].join('') = "lecoe"
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeStars = function (s) {
  const charStack = [];
  const stringLength = s.length;
  let charIndex = 0;

  while (charIndex < stringLength) {
    const currentChar = s[charIndex];
    switch (currentChar) {
      case "*":
        charStack.pop();
        break;
      default:
        charStack.push(currentChar);
        break;
    }
    charIndex++;
  }

  const finalResultString = charStack.join("");
  return finalResultString;
};
