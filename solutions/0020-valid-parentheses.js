/**
 * Valid Parentheses
 * Intuition: Opening brackets push the expected closer onto `charStack`; a closing bracket must match a pop, and the stack must be empty at the end.
 * Approach: 1. Map `(`, `[`, `{` to their closers. 2. For each `currentCharacter`, if it is an opener push the expected closer. 3. Otherwise return false if the stack is empty or `pop()` is not the current char. 4. Return whether `charStack` is empty.
 * Dry Run: inputString = "([])".
 *   - '(' push ')'. '[' push ']'. ']' pops ']'. ')' pops ')'. Stack empty → true.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var isValid = function (inputString) {
  const bracketMapping = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const charStack = [];

  for (const currentCharacter of inputString) {
    if (bracketMapping[currentCharacter]) {
      charStack.push(bracketMapping[currentCharacter]);
    } else {
      if (charStack.length === 0 || charStack.pop() !== currentCharacter) {
        return false;
      }
    }
  }

  return charStack.length === 0;
};
