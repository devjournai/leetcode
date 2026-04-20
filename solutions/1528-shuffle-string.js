/**
 * Shuffle String
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
