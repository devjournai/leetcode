/**
 * Count Substrings That Satisfy K-Constraint I
 * Intuition: A binary substring is valid if it has at most k zeros or at most k ones. Once both counts exceed k, the window is invalid and every longer extension stays invalid until the left side shrinks.
 * Approach: 1. Expand a right pointer across s and count 0/1 frequencies. 2. While both counts are greater than k, move the left pointer. 3. Every index r contributes r - l + 1 valid substrings ending at r.
 * Dry Run:
 *   s = "10101", k = 1
 *   r=0 window "1" -> 1; r=1 "10" -> +2; r=2 "101" has two 1s and one 0, still valid -> +3; r=3 both counts hit 2 so shrink left; total 12.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countKConstraintSubstrings = function (s, k) {
  let ans = 0;
  const count = [0, 0];
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    count[s[right] - "0"]++;
    while (count[0] > k && count[1] > k) {
      count[s[left] - "0"]--;
      left++;
    }
    ans += right - left + 1;
  }

  return ans;
};
