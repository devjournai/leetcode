/**
 * Count Pairs of Points With Distance k
 *
 * Intuition:
 * We need pairs satisfying:
 *
 *      (x1 XOR x2) + (y1 XOR y2) = k
 *
 * Since:
 *
 *      k ≤ 100
 *
 * we can enumerate every possible split:
 *
 *      dx + dy = k
 *
 * where:
 *
 *      dx = x1 XOR x2
 *      dy = y1 XOR y2
 *
 * For each point (x, y), if:
 *
 *      x2 = x XOR dx
 *      y2 = y XOR dy
 *
 * then:
 *
 *      (x XOR x2) = dx
 *      (y XOR y2) = dy
 *
 * So we simply check whether this required point has already appeared.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Maintain a hashmap:
 *
 *      (x, y) -> frequency
 *
 * 2. Process points from left to right.
 *
 * 3. For every point:
 *
 *      Enumerate:
 *
 *          dx = 0 ... k
 *
 *      Let:
 *
 *          dy = k - dx
 *
 *      Required previous point:
 *
 *          nx = x XOR dx
 *          ny = y XOR dy
 *
 *      Add its frequency to the answer.
 *
 * 4. Insert the current point into the hashmap.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * coordinates =
 * [
 *   [1,2],
 *   [4,2],
 *   [1,3],
 *   [5,2]
 * ]
 *
 * k = 5
 *
 * Processing (4,2):
 *
 * dx = 5
 * dy = 0
 *
 * Need:
 *
 *      (4 XOR 5, 2 XOR 0)
 *      =
 *      (1,2)
 *
 * Found once.
 *
 * answer = 1
 *
 * Continue similarly.
 *
 * Final answer = 2.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × k)
 * Space Complexity: O(N)
 */

var countPairs = function (coordinates, k) {
  const map = new Map();

  let answer = 0;

  for (const [x, y] of coordinates) {
    for (let dx = 0; dx <= k; dx++) {
      const dy = k - dx;

      const nx = x ^ dx;
      const ny = y ^ dy;

      const key = `${nx},${ny}`;

      answer += map.get(key) || 0;
    }

    const key = `${x},${y}`;
    map.set(key, (map.get(key) || 0) + 1);
  }

  return answer;
};
