/**
 * Number of Black Blocks
 *
 * Intuition:
 * Every black cell can belong to at most four different 2 × 2 blocks
 * (depending on whether it is the top-left, top-right, bottom-left,
 * or bottom-right cell of the block).
 *
 * Instead of examining every possible block (there can be up to 10^10),
 * we only update the blocks affected by each black cell.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Use a HashMap where:
 *
 *      key = "topLeftRow,topLeftCol"
 *      value = number of black cells inside that 2 × 2 block.
 *
 * 2. For every black cell (x, y), the possible affected blocks have
 *    top-left corners:
 *
 *      (x, y)
 *      (x - 1, y)
 *      (x, y - 1)
 *      (x - 1, y - 1)
 *
 * 3. For each valid top-left position:
 *
 *      • Increase its black-cell count in the map.
 *
 * 4. Initialize:
 *
 *      totalBlocks = (m - 1) * (n - 1)
 *
 * 5. Traverse the map:
 *
 *      • answer[count]++
 *      • Each visited block is not an empty block.
 *
 * 6. Empty blocks are:
 *
 *      answer[0] =
 *          totalBlocks - map.size
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * m = 3, n = 3
 *
 * coordinates = [[0,0]]
 *
 * Affected block:
 *
 * (0,0)
 *
 * Map:
 *
 * (0,0) → 1
 *
 * Total blocks = 4
 *
 * answer[1] = 1
 * answer[0] = 4 - 1 = 3
 *
 * Result:
 *
 * [3,1,0,0,0]
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(K)
 * Space Complexity: O(K)
 */

var countBlackBlocks = function (m, n, coordinates) {
  const map = new Map();

  for (const [x, y] of coordinates) {
    const positions = [
      [x, y],
      [x - 1, y],
      [x, y - 1],
      [x - 1, y - 1],
    ];

    for (const [r, c] of positions) {
      if (r >= 0 && r < m - 1 && c >= 0 && c < n - 1) {
        const key = `${r},${c}`;
        map.set(key, (map.get(key) || 0) + 1);
      }
    }
  }

  const answer = [0, 0, 0, 0, 0];

  for (const count of map.values()) {
    answer[count]++;
  }

  const totalBlocks = (m - 1) * (n - 1);

  answer[0] = totalBlocks - map.size;

  return answer;
};
