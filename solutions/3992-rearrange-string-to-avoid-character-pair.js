/**
 * Rearrange String to Avoid Character Pair
 * Intuition: We need to construct a permutation t of s such that every occurrence of y appears before every occurrence of x. There are no extra constraints on the other characters.
 * Approach: We need to construct a permutation t of s such that every occurrence of y appears before every occurrence of x. There are no extra constraints on the other characters. Therefore, it suffices to move all occurrences of y to the front of the string. Traverse the string with two pointers: i points to the next position where a y should be placed, and j scans from left to right. Whenever t[j] = y, swap t[i] with t[j] and increment i. After the scan, the prefix of t consists entirely of y, which naturally satisfies the requirement that all y appear before all x.
 * Dry Run: Input: s = "aabc", x = "a", y = "c". Output: "cbaa".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var rearrangeString = function (s, x, y) {
  const t = s.split("");
  let i = 0;
  for (let j = 0; j < t.length; j++) {
    if (t[j] === y) {
      [t[i], t[j]] = [t[j], t[i]];
      i++;
    }
  }
  return t.join("");
};
