/**
 * Minimum Add To Make Parentheses Valid
 * Intuition: Each unmatched `)` needs an extra `(`, and leftover `(` at the end need extra `)`. A balance counter tracks opens still waiting for closes.
 * Approach: 1. For `(` increment `openBracketBalance`. 2. For `)`, decrement if balance>0 else increment `missingOpenBrackets`. 3. Return balance + missing.
 * Dry Run: "())" → `)` unmatched → missing=1, leftover opens=0 → 1. "(((" → 3. "()" → 0.
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
