/**
 * Goal Parser Interpretation
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var interpret = function (commandInput) {
  let intermediateString = commandInput.replaceAll("(al)", "al");
  let finalParsedString = intermediateString.replaceAll("()", "o");

  return finalParsedString;
};
