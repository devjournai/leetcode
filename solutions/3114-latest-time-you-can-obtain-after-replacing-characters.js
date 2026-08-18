/**
 * Latest Time You Can Obtain After Replacing Characters
 * Intuition: Fill '?' greedily with the largest valid hour/minute digits.
 * Approach: 1. If hour tens is '?', use 2 if hour ones is '?' or <=3, else 1. 2. If hour ones is '?', use 3 when tens is 2 else 9. 3. Minute tens '?' -> 5, ones '?' -> 9.
 * Dry Run:
 *   s = "1?:?4" -> "19:54"
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var findLatestTime = function (s) {
  const timeChars = s.split("");
  if (timeChars[0] === "?") {
    timeChars[0] = timeChars[1] === "?" || timeChars[1] <= "1" ? "1" : "0";
  }
  if (timeChars[1] === "?") {
    timeChars[1] = timeChars[0] === "1" ? "1" : "9";
  }
  if (timeChars[3] === "?") {
    timeChars[3] = "5";
  }
  if (timeChars[4] === "?") {
    timeChars[4] = "9";
  }
  return timeChars.join("");
};
