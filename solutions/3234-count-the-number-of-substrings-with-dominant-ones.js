/**
 * Count the Number of Substrings With Dominant Ones
 * Intuition: Dominant means ones >= zeros^2, so zeros is at most O(sqrt(n)). Enumerate the zero count and slide a minimal window that still satisfies that budget.
 * Approach: 1. For each zero count z with z + z*z <= n, expand a right pointer. 2. Shrink from the left while extra zeros exist or extra ones can be dropped. 3. When the window has exactly z zeros and enough ones, add (left - lastInvalid) substrings ending at right.
 * Dry Run: s = "00011". For z = 0, substrings of all 1s: "11" contributes 2. For z = 1, some windows of one 0 and at least 1 one are valid. Total 5.
 * Time Complexity: O(n sqrt(n))
 * Space Complexity: O(1)
 */
var numberOfSubstrings = function (s) {
  let answer = 0;
  const length = s.length;

  for (let zeros = 0; zeros + zeros * zeros <= length; zeros++) {
    let lastInvalidPos = -1;
    const count = [0, 0];
    let left = 0;
    for (let right = 0; right < length; right++) {
      count[s.charCodeAt(right) - 48]++;
      for (; left < right; left++) {
        if (s[left] === "0" && count[0] > zeros) {
          count[0]--;
          lastInvalidPos = left;
        } else if (s[left] === "1" && count[1] - 1 >= zeros * zeros) {
          count[1]--;
        } else {
          break;
        }
      }
      if (count[0] === zeros && count[1] >= zeros * zeros) {
        answer += left - lastInvalidPos;
      }
    }
  }

  return answer;
};
