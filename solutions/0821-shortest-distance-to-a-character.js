/**
 * Shortest Distance To A Character
 * Intuition: Distance to nearest `c` is the min of distance to the last `c` on the left and the next `c` on the right.
 * Approach: 1. Left-to-right: on `c` set `lastCharacterIndex`; store `i - last` (Infinity if none yet). 2. Right-to-left: min with `next - i`.
 * Dry Run: s = "loveleetcode", c = "e". After both passes distances are [3,2,1,0,1,0,0,1,2,2,1,0].
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
      nextCharacterIndex - secondLoopIndex
    );
  }

  return shortestDistances;
};
