/**
 * Remove All Adjacent Duplicates In String
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeDuplicates = function (s) {
  const processedCharacters = [];

  for (const individualChar of s) {
    const currentStackSize = processedCharacters.length;
    if (
      currentStackSize > 0 &&
      processedCharacters[currentStackSize - 1] === individualChar
    ) {
      processedCharacters.pop();
    } else {
      processedCharacters.push(individualChar);
    }
  }

  return processedCharacters.join("");
};
