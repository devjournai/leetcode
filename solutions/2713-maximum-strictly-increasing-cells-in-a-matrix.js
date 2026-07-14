/**
 * Maximum Strictly Increasing Cells in a Matrix
 *
 * Intuition:
 * A move is only allowed to a strictly larger value in the same row or column.
 *
 * Therefore, cells should be processed in increasing order of their values.
 *
 * For every cell:
 *
 *      dp[row][col]
 *
 * =
 *
 *      1 +
 *      max(best value already computed in its row,
 *          best value already computed in its column)
 *
 * Cells having the same value cannot transition to one another, so they must
 * be processed together. Their answers are computed first and only afterwards
 * used to update the row and column maximums.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Group all cells by their value.
 *
 * 2. Sort the distinct values in increasing order.
 *
 * 3. Maintain:
 *
 *      rowBest[row]
 *      =
 *      longest path ending in this row.
 *
 *      colBest[col]
 *      =
 *      longest path ending in this column.
 *
 * 4. For every value (smallest → largest):
 *
 *      a. Compute the answer for every cell having this value.
 *
 *             dp =
 *             1 + max(rowBest[row], colBest[col])
 *
 *      b. Store these temporary values.
 *
 *      c. After all cells of the same value are processed,
 *         update:
 *
 *             rowBest
 *             colBest
 *
 *      d. Update the global answer.
 *
 * 5. Return the maximum path length.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * mat =
 *
 * [
 *  [3,1],
 *  [3,4]
 * ]
 *
 * Process value:
 *
 * 1
 *
 * dp = 1
 *
 * rowBest = [1,0]
 *
 * colBest = [1,0]
 *
 * ----------------
 *
 * Process value:
 *
 * 3
 *
 * Both cells:
 *
 * dp = 2
 *
 * rowBest = [2,2]
 *
 * colBest = [2,0]
 *
 * ----------------
 *
 * Process value:
 *
 * 4
 *
 * dp = 3
 *
 * Answer = 3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(MN log(MN))
 * Space Complexity: O(MN)
 */

var maxIncreasingCells = function (mat) {
  const rows = mat.length;
  const cols = mat[0].length;

  const groups = new Map();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const value = mat[r][c];

      if (!groups.has(value)) {
        groups.set(value, []);
      }

      groups.get(value).push([r, c]);
    }
  }

  const values = [...groups.keys()].sort((a, b) => a - b);

  const rowBest = new Array(rows).fill(0);
  const colBest = new Array(cols).fill(0);

  let answer = 1;

  for (const value of values) {
    const cells = groups.get(value);

    const temp = [];

    for (const [r, c] of cells) {
      const current = 1 + Math.max(rowBest[r], colBest[c]);

      temp.push([r, c, current]);

      answer = Math.max(answer, current);
    }

    for (const [r, c, current] of temp) {
      rowBest[r] = Math.max(rowBest[r], current);

      colBest[c] = Math.max(colBest[c], current);
    }
  }

  return answer;
};
