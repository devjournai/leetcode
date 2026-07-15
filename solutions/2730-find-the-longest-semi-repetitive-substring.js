/**
 * Find the Longest Semi-Repetitive Substring
 *
 * Intuition:
 * A valid substring can contain at most one adjacent equal pair.
 *
 * Use a sliding window and keep track of how many adjacent equal pairs are
 * currently inside the window.
 *
 * If the window contains more than one adjacent equal pair, move the left
 * pointer until it becomes valid again.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Initialize:
 *
 *      left = 0
 *      pairs = 0
 *      answer = 1
 *
 * 2. Expand the right pointer.
 *
 * 3. If:
 *
 *      s[right] == s[right - 1]
 *
 *      then one adjacent equal pair is added.
 *
 *      pairs++
 *
 * 4. While:
 *
 *      pairs > 1
 *
 *      shrink the window.
 *
 *      If removing the left character removes an adjacent equal pair:
 *
 *          s[left] == s[left + 1]
 *
 *      decrement pairs.
 *
 *      Move left forward.
 *
 * 5. Update the maximum window length.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s = "52233"
 *
 * Window:
 *
 * "522"
 *
 * pairs = 1
 *
 * Valid
 *
 * ----------------
 *
 * Extend:
 *
 * "5223"
 *
 * pairs = 1
 *
 * Valid
 *
 * ----------------
 *
 * Extend:
 *
 * "52233"
 *
 * pairs = 2
 *
 * Move left until
 *
 * pairs = 1
 *
 * Maximum = 4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var longestSemiRepetitiveSubstring = function (s) {
  const n = s.length;

  let left = 0;
  let pairs = 0;
  let answer = 1;

  for (let right = 1; right < n; right++) {
    if (s[right] === s[right - 1]) {
      pairs++;
    }

    while (pairs > 1) {
      if (left + 1 < n && s[left] === s[left + 1]) {
        pairs--;
      }

      left++;
    }

    answer = Math.max(answer, right - left + 1);
  }

  return answer;
};
