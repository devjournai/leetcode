/**
 * Count Valid Prefixes
 * Intuition: A string can be rearranged into an alternating string if and only if the counts of '0' and '1' in it differ by at most 1.
 * Approach: A string can be rearranged into an alternating string if and only if the counts of '0' and '1' in it differ by at most 1. Therefore, we traverse the string s and maintain a variable t equal to the number of '1's minus the number of '0's in the current prefix (increment by one on '1', decrement by one on '0'). If |t| leq 1, the current prefix is valid, and we add one to the answer.
 * Dry Run: Input: s = "00101". Output: 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countValidPrefixes = function (s) {
  let ans = 0;
  let t = 0;
  for (const c of s) {
    t += c === "1" ? 1 : -1;
    if (Math.abs(t) <= 1) {
      ans++;
    }
  }
  return ans;
};
