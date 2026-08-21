/**
 * Minimum String Length After Balanced Removals
 * Intuition: According to the problem description, as long as adjacent characters are different, we can remove them. Therefore, the final remaining string will only contain the same character, either all 'a' or all 'b'. So we only need to count the number of 'a' and 'b' in the string, and the final minimum length is the absolute difference between their counts.
 * Approach: The time complexity is O(n), where n is the length of the string. The space complexity is O(1).
 * Dry Run: Input s =. Output 0.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minLengthAfterRemovals = function (s) {
  let a = 0;
  for (const c of s) {
    if (c === "a") {
      ++a;
    }
  }
  const b = s.length - a;
  return Math.abs(a - b);
};
