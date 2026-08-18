/**
 * Clear Digits
 * Intuition: Each digit deletes itself and the closest non-digit to its left, which is exactly a stack: letters push, digits pop.
 * Approach: 1. Iterate characters. 2. Push letters. 3. On a digit, pop the last remaining letter. 4. Join the stack.
 * Dry Run:
 *   s = "abc" -> "abc". s = "cb34" -> push c,b, pop b on 3, pop c on 4 -> ""
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var clearDigits = function (s) {
  const remainingChars = [];
  for (const currentChar of s) {
    if (currentChar >= "0" && currentChar <= "9") {
      remainingChars.pop();
    } else {
      remainingChars.push(currentChar);
    }
  }
  return remainingChars.join("");
};
