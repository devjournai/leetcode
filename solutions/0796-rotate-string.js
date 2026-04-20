/**
 * Rotate String
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var rotateString = function (s, goal) {
  const initialStringLength = s.length;
  const desiredStringLength = goal.length;

  if (initialStringLength !== desiredStringLength) {
    return false;
  }

  if (initialStringLength === 0) {
    return true;
  }

  const concatenatedString = s + s;
  const rotationCheckResult = concatenatedString.includes(goal);

  return rotationCheckResult;
};
