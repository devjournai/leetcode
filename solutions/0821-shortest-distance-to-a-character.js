/**
 * Shortest Distance To A Character
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var shortestToChar = function (s, c) {
  const stringLength = s.length;
  const shortestDistances = new Array(stringLength);

  let lastCharacterIndex = Number.NEGATIVE_INFINITY;

  for (
    let firstLoopIndex = 0;
    firstLoopIndex < stringLength;
    firstLoopIndex++
  ) {
    if (s[firstLoopIndex] === c) {
      lastCharacterIndex = firstLoopIndex;
    }
    shortestDistances[firstLoopIndex] = firstLoopIndex - lastCharacterIndex;
  }

  let nextCharacterIndex = Number.POSITIVE_INFINITY;

  for (
    let secondLoopIndex = stringLength - 1;
    secondLoopIndex >= 0;
    secondLoopIndex--
  ) {
    if (s[secondLoopIndex] === c) {
      nextCharacterIndex = secondLoopIndex;
    }
    shortestDistances[secondLoopIndex] = Math.min(
      shortestDistances[secondLoopIndex],
      nextCharacterIndex - secondLoopIndex,
    );
  }

  return shortestDistances;
};
