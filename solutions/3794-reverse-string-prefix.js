/**
 * Reverse String Prefix
 * Intuition: We reverse the first k characters of the string according to the problem description, and then concatenate them with the remaining characters.
 * Approach: The time complexity is O(n) and the space complexity is O(n), where n is the length of the string.
 * Dry Run: Input s = "abcd", k = 2. Output "bacd".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var reversePrefix = function (s, k) {
  return s.slice(0, k).split("").reverse().join("") + s.slice(k);
};
