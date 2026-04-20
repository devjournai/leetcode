/**
 * Minimum Add To Make Parentheses Valid
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minAddToMakeValid = function (s) {
  let openBracketBalance = 0;
  let missingOpenBrackets = 0;

  for (const charIteration of s) {
    if (charIteration === "(") {
      openBracketBalance++;
    } else {
      if (openBracketBalance > 0) {
        openBracketBalance--;
      } else {
        missingOpenBrackets++;
      }
    }
  }

  return openBracketBalance + missingOpenBrackets;
};
