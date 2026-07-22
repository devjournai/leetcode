/**
 * Length of the Longest Valid Substring
 *
 * Intuition:
 * A valid substring must not contain any string from the forbidden list.
 *
 * Since every forbidden string has length at most 10, when extending a
 * window ending at index 'right', we only need to examine the last
 * 10 characters to detect whether a forbidden substring ends at 'right'.
 *
 * We use a sliding window:
 *
 *      [left ... right]
 *
 * Whenever a forbidden substring ending at 'right' is found, we move
 * 'left' just past the beginning of that forbidden substring so that the
 * current window becomes valid again.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Store every forbidden string in a HashSet for O(1) lookup.
 *
 * 2. Maintain:
 *
 *      left = left boundary of current valid window.
 *
 * 3. Iterate right from 0 to n - 1.
 *
 * 4. For each right, check every substring ending at right whose length
 *    is at most 10:
 *
 *          word[start...right]
 *
 *      where
 *
 *          start >= max(left, right - 9)
 *
 * 5. If a forbidden substring is found:
 *
 *          left = start + 1
 *
 *      because every valid substring ending at right must start after
 *      this forbidden substring begins.
 *
 * 6. Update the maximum window length.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * word = "cbaaaabc"
 *
 * forbidden = {"aaa","cb"}
 *
 * right = 1
 *
 * "cb" found
 *
 * left = 1
 *
 * right = 4
 *
 * "aaa" found
 *
 * left = 3
 *
 * Longest valid window length = 4.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(F)
 */

var longestValidSubstring = function (word, forbidden) {
  const forbiddenSet = new Set(forbidden);

  const n = word.length;

  let left = 0;
  let answer = 0;

  for (let right = 0; right < n; right++) {
    for (let start = right; start >= Math.max(left, right - 9); start--) {
      const sub = word.substring(start, right + 1);

      if (forbiddenSet.has(sub)) {
        left = start + 1;
        break;
      }
    }

    answer = Math.max(answer, right - left + 1);
  }

  return answer;
};
