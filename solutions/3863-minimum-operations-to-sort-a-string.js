/**
 * Minimum Operations to Sort a String
 * Intuition: We first check whether the string is already sorted in ascending order; if so, return 0. Otherwise, if the string has length 2, since we cannot choose the entire string to sort, it is impossible to sort the string, so we return -1. Next, we find the minimum character $mn$ and the maximum character $mx$ in the string. If the first character of the string equals $mn$, or the last character equals $mx$, then one operation on the remaining substring is sufficient to sort the entire string, so we return 1. Otherwise, if some character in the middle of the string equals $mn$ or $mx$, we need one operation to move that character to the beginning or the end of the string, and then one more operation to sort the rest, so we return 2. Finally, if none of the above cases apply, we need one operation on the substring containing both $mn$ and $mx$, followed by one more operation on the remaining subs...
 * Approach: We first check whether the string is already sorted in ascending order; if so, return 0. Otherwise, if the string has length 2, since we cannot choose the entire string to sort, it is impossible to sort the string, so we return -1. Next, we find the minimum character $mn$ and the maximum character $mx$ in the string. If the first character of the string equals $mn$, or the last character equals $mx$, then one operation on the remaining substring is sufficient to sort the entire string, so we return 1. Otherwise, if some character in the middle of the string equals $mn$ or $mx$, we need one operation to move that character to the beginning or the end of the string, and then one more operation to sort the rest, so we return 2. Finally, if none of the above cases apply, we need one operation on the substring containing both $mn$ and $mx$, followed by one more operation on the remaining subs...
 * Dry Run: Input: s = &quot;dog&quot; => Output: 1
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var minOperations = function (s) {
  const n = s.length;

  let sorted = true;
  for (let i = 1; i < n; i++) {
    if (s[i] < s[i - 1]) {
      sorted = false;
      break;
    }
  }

  if (sorted) {
    return 0;
  }

  if (n === 2) {
    return -1;
  }

  let mn = s[0];
  let mx = s[0];

  for (const c of s) {
    if (c < mn) {
      mn = c;
    }
    if (c > mx) {
      mx = c;
    }
  }

  if (s[0] === mn || s[n - 1] === mx) {
    return 1;
  }

  for (let i = 1; i < n - 1; i++) {
    if (s[i] === mn || s[i] === mx) {
      return 2;
    }
  }

  return 3;
};
