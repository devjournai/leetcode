/**
 * Consecutive Characters
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxPower = function (s) {
  const stringLength = s.length;
  if (stringLength === 0) {
    return 0;
  }

  let highestPower = 1;
  let currentConsecutiveLength = 0;

  for (let iteratorIndex = 0; iteratorIndex < stringLength; iteratorIndex++) {
    const currentChar = s[iteratorIndex];
    const previousChar = iteratorIndex > 0 ? s[iteratorIndex - 1] : null;

    if (iteratorIndex === 0 || currentChar !== previousChar) {
      currentConsecutiveLength = 1;
    } else {
      currentConsecutiveLength++;
    }

    highestPower = Math.max(highestPower, currentConsecutiveLength);
  }

  return highestPower;
};
