/**
 * Rotate String
 * Intuition: Every rotation of `s` is a contiguous substring of `s+s` of the same length.
 * Approach: 1. False if lengths differ. 2. Empty strings are true. 3. Return `(s+s).includes(goal)`.
 * Dry Run: s = "abcde", goal = "cdeab". "abcdeabcde" contains "cdeab" → true.
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
