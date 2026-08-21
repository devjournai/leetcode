/**
 * Minimum Insertions To Balance A Parentheses String
 * Intuition: A valid unit is '(' plus '))'. Scan: consume '))' when possible, else insert; unmatched '(' need two ')' at the end.
 * Approach: 1. On '(' increment open. 2. On ')': if next is ')' take both else insert one. 3. Match an open or insert '('. 4. Add 2*remaining opens.
 * Dry Run: s = "(()))".
 *   - '((' then '))' matches one open; leftover ')' needs a '(' → 1 insertion.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minInsertions = function (s) {
  let totalInsertionsNeeded = 0;
  let unmatchedOpenParentheses = 0;

  let stringScanIndex = 0;
  while (stringScanIndex < s.length) {
    if (s[stringScanIndex] === "(") {
      unmatchedOpenParentheses++;
      stringScanIndex++;
    } else {
      // Current character is ')'
      // Check if there is a second consecutive ')'
      if (stringScanIndex + 1 < s.length && s[stringScanIndex + 1] === ")") {
        stringScanIndex += 2; // Consume both ')' characters
      } else {
        totalInsertionsNeeded++; // Missing a second ')'
        stringScanIndex++; // Consume the single ')'
      }

      // After handling the ')' or '))' pair, try to match it with an open parenthesis
      if (unmatchedOpenParentheses > 0) {
        unmatchedOpenParentheses--;
      } else {
        totalInsertionsNeeded++; // Missing a '(' to match the ')' or '))'
      }
    }
  }

  // Any remaining unmatched open parentheses each require two ')' insertions
  totalInsertionsNeeded += unmatchedOpenParentheses * 2;

  return totalInsertionsNeeded;
};
