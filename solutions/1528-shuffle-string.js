/**
 * Shuffle String
 * Intuition: indices[i] is the destination of s[i]; place each character then join.
 * Approach: 1. Allocate result[n]. 2. result[indices[i]]=s[i]. 3. Join.
 * Dry Run: s = "codeleet", indices = [4,5,6,7,0,2,1,3].
 *   - Placed letters form "leetcode".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var restoreString = function (s, indices) {
  const totalLength = s.length;
  const rearrangedCharacters = new Array(totalLength);

  for (
    let currentPosition = 0;
    currentPosition < totalLength;
    currentPosition++
  ) {
    const sourceCharacter = s[currentPosition];
    const destinationPosition = indices[currentPosition];
    rearrangedCharacters[destinationPosition] = sourceCharacter;
  }

  const finalResult = rearrangedCharacters.join("");
  return finalResult;
};
