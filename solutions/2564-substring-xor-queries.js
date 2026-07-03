/**
 * Substring XOR Queries
 *
 * Intuition:
 * For each query:
 *
 *      val ^ first = second
 *
 * Therefore,
 *
 *      val = first ^ second
 *
 * So every query is actually asking:
 *
 *      "Find the shortest substring whose decimal value equals target."
 *
 * Since every query can have a different target, instead of processing each
 * query independently, preprocess every possible substring value.
 *
 * A binary number represented by more than 30 bits exceeds 10^9, so every
 * useful substring has length at most 30.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Traverse every starting index.
 *
 * 2. If the current character is '0':
 *
 *      Only the substring "0" is useful.
 *
 *      Store its position if not already stored.
 *
 * 3. Otherwise,
 *
 *      Extend the substring up to 30 characters.
 *
 *      value =
 *          value * 2 + currentBit
 *
 *      If this value has not appeared before,
 *      store:
 *
 *          value → [start, end]
 *
 *      Since we extend from shorter to longer substrings,
 *      the first occurrence automatically gives the shortest substring.
 *
 * 4. For every query:
 *
 *      target = first ^ second
 *
 *      If target exists in the map,
 *      return its indices.
 *
 *      Otherwise,
 *      return [-1,-1].
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s = "101101"
 *
 * Start = 0
 *
 * "1"
 * value = 1
 *
 * Store:
 * 1 → [0,0]
 *
 * "10"
 * value = 2
 *
 * Store:
 * 2 → [0,1]
 *
 * "101"
 * value = 5
 *
 * Store:
 * 5 → [0,2]
 *
 * ...
 *
 * Query:
 *
 * [0,5]
 *
 * target
 *
 * = 0 ^ 5
 * = 5
 *
 * Map contains:
 *
 * 5 → [0,2]
 *
 * Return:
 *
 * [0,2]
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × 30 + Q)
 * Space Complexity: O(N × 30)
 */

var substringXorQueries = function (s, queries) {
  const map = new Map();
  const n = s.length;

  for (let start = 0; start < n; start++) {
    if (s[start] === "0") {
      if (!map.has(0)) {
        map.set(0, [start, start]);
      }
      continue;
    }

    let value = 0;

    for (let end = start; end < Math.min(n, start + 30); end++) {
      value = (value << 1) + (s[end] === "1" ? 1 : 0);

      if (!map.has(value)) {
        map.set(value, [start, end]);
      }
    }
  }

  const answer = [];

  for (const [first, second] of queries) {
    const target = first ^ second;

    if (map.has(target)) {
      answer.push(map.get(target));
    } else {
      answer.push([-1, -1]);
    }
  }

  return answer;
};
