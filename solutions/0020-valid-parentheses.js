/**
 * Valid Parentheses
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
