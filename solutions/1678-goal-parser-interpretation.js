/**
 * Goal Parser Interpretation
 * Intuition: The command language has three tokens: "G" stays, "()" → "o", "(al)" → "al". Replace the two parenthesized tokens globally.
 * Approach: 1. Replace all "(al)" with "al". 2. Replace all "()" with "o". 3. Return the result ("G" is already correct).
 * Dry Run: command = "G()(al)".
 *   - "(al)" → "al" gives "G()al"; "()" → "o" gives "Goal".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var interpret = function (commandInput) {
  let intermediateString = commandInput.replaceAll("(al)", "al");
  let finalParsedString = intermediateString.replaceAll("()", "o");

  return finalParsedString;
};
