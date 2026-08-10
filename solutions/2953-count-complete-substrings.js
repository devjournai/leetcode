/**
 * 2953. Count Complete Substrings
 *
 * Intuition:
 *
 * A substring is complete when:
 *
 * 1. Every character appears exactly k times.
 * 2. For every adjacent pair of characters:
 *
 *        abs(c1 - c2) <= 2
 *
 * ------------------------------------------------------------
 *
 * First handle condition 2.
 *
 * If two adjacent characters differ by more than 2, no complete
 * substring can cross that position.
 *
 * Example:
 *
 *     "abcxdef"
 *
 * If:
 *
 *     abs('c' - 'x') > 2
 *
 * then no valid substring can contain both sides of that break.
 *
 * Therefore, we split the string into independent segments where
 * every adjacent pair differs by at most 2.
 *
 * ------------------------------------------------------------
 *
 * Inside one valid segment:
 *
 * There are only 26 lowercase English characters.
 *
 * A complete substring containing exactly `distinct` characters
 * must have length:
 *
 *     distinct * k
 *
 * Since there are only 26 possible characters, we only need to
 * check lengths:
 *
 *     k, 2k, 3k, ..., 26k
 *
 * ------------------------------------------------------------
 *
 * For each possible number of distinct characters:
 *
 *     windowSize = distinct * k
 *
 * use a sliding window.
 *
 * For every window:
 *
 *     - Count occurrences of each character.
 *     - Every used character must appear exactly k times.
 *
 * If exactly `distinct` characters each occur k times, the
 * window is complete.
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 *     word = "aaabbbccc"
 *     k = 3
 *
 * For distinct = 3:
 *
 *     windowSize = 3 * 3 = 9
 *
 * Window:
 *
 *     "aaabbbccc"
 *
 * Counts:
 *
 *     a -> 3
 *     b -> 3
 *     c -> 3
 *
 * Therefore it is complete.
 *
 * ------------------------------------------------------------
 *
 * Why do we split first?
 *
 * Consider:
 *
 *     "abz"
 *
 * If:
 *
 *     abs('b' - 'z') > 2
 *
 * then any substring containing both b and z violates the
 * adjacency condition.
 *
 * So valid substrings can never cross that position.
 *
 * This lets us solve each segment independently.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(26 * n)
 * Space Complexity: O(26)
 */
var countCompleteSubstrings = function (word, k) {
  const n = word.length;

  let answer = 0;
  let segmentStart = 0;

  for (let i = 1; i <= n; i++) {
    if (i === n || Math.abs(word.charCodeAt(i) - word.charCodeAt(i - 1)) > 2) {
      const segmentEnd = i;
      answer += countSegment(word, segmentStart, segmentEnd, k);
      segmentStart = i;
    }
  }

  return answer;
};

function countSegment(word, start, end, k) {
  let answer = 0;

  for (let distinct = 1; distinct <= 26; distinct++) {
    const windowSize = distinct * k;

    if (windowSize > end - start) {
      break;
    }

    const count = new Array(26).fill(0);

    let exactlyK = 0;
    let present = 0;

    for (let i = start; i < start + windowSize; i++) {
      const index = word.charCodeAt(i) - 97;

      if (count[index] === 0) {
        present++;
      }

      count[index]++;

      if (count[index] === k) {
        exactlyK++;
      } else if (count[index] === k + 1) {
        exactlyK--;
      }
    }

    if (present === distinct && exactlyK === distinct) {
      answer++;
    }

    for (let right = start + windowSize; right < end; right++) {
      const addIndex = word.charCodeAt(right) - 97;

      if (count[addIndex] === k) {
        exactlyK--;
      }

      if (count[addIndex] === 0) {
        present++;
      }

      count[addIndex]++;

      if (count[addIndex] === k) {
        exactlyK++;
      }

      const removeIndex = word.charCodeAt(right - windowSize) - 97;

      if (count[removeIndex] === k) {
        exactlyK--;
      }

      count[removeIndex]--;

      if (count[removeIndex] === k) {
        exactlyK++;
      }

      if (count[removeIndex] === 0) {
        present--;
      }

      if (present === distinct && exactlyK === distinct) {
        answer++;
      }
    }
  }

  return answer;
}
