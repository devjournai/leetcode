/**
 * Remove All Adjacent Duplicates In String
 * Intuition: Adjacent pairs cancel. A stack holds the unmatched prefix; a matching top is popped instead of pushed.
 * Approach: 1. For each char, if it equals the stack top, pop. 2. Else push. 3. Join the stack.
 * Dry Run: s = "abbaca".
 *   - a,b then second b pops. a then a pops. leftover "ca".
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
