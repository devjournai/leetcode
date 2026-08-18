/**
 * Lexicographically Minimum String After Removing Stars
 * Intuition: Each '*' deletes itself and the smallest letter to its left (rightmost if ties). Track indices of each letter and always delete the smallest available.
 * Approach: 1. Keep stacks of indices per letter a-z. 2. On a letter, push index. 3. On '*', pop the smallest letter's latest index and mark deleted. 4. Build the string from unmarked chars.
 * Dry Run:
 *   s = "aaba*" delete last 'a' before *, result "aab"
 * Time Complexity: O(N * 26)
 * Space Complexity: O(N)
 */
var clearStars = function (s) {
  const indicesByLetter = Array.from({ length: 26 }, () => []);
  const shouldKeep = new Array(s.length).fill(true);
  for (let charIndex = 0; charIndex < s.length; charIndex++) {
    if (s[charIndex] === "*") {
      shouldKeep[charIndex] = false;
      for (let letterIndex = 0; letterIndex < 26; letterIndex++) {
        if (indicesByLetter[letterIndex].length > 0) {
          const removedIndex = indicesByLetter[letterIndex].pop();
          shouldKeep[removedIndex] = false;
          break;
        }
      }
    } else {
      indicesByLetter[s.charCodeAt(charIndex) - 97].push(charIndex);
    }
  }
  let resultString = "";
  for (let charIndex = 0; charIndex < s.length; charIndex++) {
    if (shouldKeep[charIndex]) {
      resultString += s[charIndex];
    }
  }
  return resultString;
};
