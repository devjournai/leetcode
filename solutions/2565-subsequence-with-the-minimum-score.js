/**
 * Subsequence With the Minimum Score
 *
 * Intuition:
 * We want to remove one contiguous substring from `t` so that the remaining
 * characters form a subsequence of `s`.
 *
 * Compute:
 *
 * 1. prefix[i]
 *    = earliest position in `s` where t[0...i] can be matched.
 *
 * 2. suffix[i]
 *    = latest position in `s` where t[i...m-1] can be matched.
 *
 * Then use two pointers to find the smallest removable interval.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Let:
 *      n = s.length
 *      m = t.length
 *
 * 2. Build prefix array.
 *
 *      Scan s from left to right.
 *
 *      Whenever characters match,
 *      record the matched index in prefix.
 *
 * 3. Build suffix array.
 *
 *      Scan s from right to left.
 *
 *      Whenever characters match,
 *      record the matched index in suffix.
 *
 * 4. Initially:
 *
 *      answer = m
 *
 *      Removing entire prefix or suffix:
 *
 *      If suffix exists:
 *          answer = min(answer, firstMatchedIndex)
 *
 *      If prefix exists:
 *          answer = min(answer, m-lastMatchedIndex-1)
 *
 * 5. Use two pointers.
 *
 *      i = last character kept on left.
 *
 *      j = first character kept on right.
 *
 *      While:
 *
 *          prefix[i] < suffix[j]
 *
 *      update:
 *
 *          answer =
 *              min(answer,
 *                  j-i-1)
 *
 * 6. Return answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s = "abacaba"
 * t = "bzaa"
 *
 * prefix:
 *
 * b ->1
 * z ->-1
 *
 * suffix:
 *
 * a ->6
 * a ->4
 * z ->-1
 *
 * Remove:
 *
 * "z"
 *
 * Length =1
 *
 * Answer =1
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N + M)
 * Space Complexity: O(M)
 */
var minimumScore = function (s, t) {
  const n = s.length;
  const m = t.length;

  const prefix = new Array(m).fill(-1);
  const suffix = new Array(m).fill(-1);

  let j = 0;

  for (let i = 0; i < n && j < m; i++) {
    if (s[i] === t[j]) {
      prefix[j] = i;
      j++;
    }
  }

  j = m - 1;

  for (let i = n - 1; i >= 0 && j >= 0; i--) {
    if (s[i] === t[j]) {
      suffix[j] = i;
      j--;
    }
  }

  let answer = m;

  while (answer > 0 && answer - 1 >= 0 && suffix[answer - 1] !== -1) {
    answer--;
  }

  if (prefix[m - 1] !== -1) {
    return 0;
  }

  let right = 0;

  for (let left = -1; left < m; left++) {
    let leftPos = -1;

    if (left >= 0) {
      if (prefix[left] === -1) {
        break;
      }
      leftPos = prefix[left];
    }

    right = Math.max(right, left + 1);

    while (right < m && (suffix[right] === -1 || suffix[right] <= leftPos)) {
      right++;
    }

    answer = Math.min(answer, right - left - 1);
  }

  return answer;
};
