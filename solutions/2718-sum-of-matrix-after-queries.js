/**
 * Sum of Matrix After Queries
 *
 * Intuition:
 * Processing the queries from the beginning is difficult because later queries
 * overwrite earlier ones.
 *
 * Instead, process the queries in reverse order.
 *
 * While traversing backwards:
 *
 * • The first time we see a row, it is its final value.
 * • The first time we see a column, it is its final value.
 *
 * Keep track of which rows and columns have already been assigned.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Maintain:
 *
 *      visitedRows
 *      visitedColumns
 *
 * 2. Also keep:
 *
 *      remainingRows
 *      remainingColumns
 *
 *      representing rows/columns that have not yet been finalized.
 *
 * 3. Traverse queries from the end.
 *
 * 4. If it is a row query and this row has not been processed:
 *
 *      answer += value × remainingColumns
 *
 *      Mark the row as visited.
 *
 *      remainingRows--
 *
 * 5. If it is a column query and this column has not been processed:
 *
 *      answer += value × remainingRows
 *
 *      Mark the column as visited.
 *
 *      remainingColumns--
 *
 * 6. Return the final answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 3
 *
 * Queries:
 *
 * [Row 0 = 1]
 * [Col 2 = 2]
 * [Row 2 = 3]
 *
 * Process backwards:
 *
 * Row 2:
 *
 * Add
 *
 * 3 × 3 = 9
 *
 * ----------------
 *
 * Col 2:
 *
 * Remaining rows = 2
 *
 * Add
 *
 * 2 × 2 = 4
 *
 * ----------------
 *
 * Row 0:
 *
 * Remaining columns = 2
 *
 * Add
 *
 * 1 × 2 = 2
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(Q)
 * Space Complexity: O(N)
 */
var matrixSumQueries = function (n, queries) {
  const visitedRows = new Array(n).fill(false);
  const visitedColumns = new Array(n).fill(false);

  let remainingRows = n;
  let remainingColumns = n;

  let answer = 0n;

  for (let i = queries.length - 1; i >= 0; i--) {
    const [type, index, value] = queries[i];

    if (type === 0) {
      if (visitedRows[index]) {
        continue;
      }

      visitedRows[index] = true;

      answer += BigInt(value) * BigInt(remainingColumns);

      remainingRows--;
    } else {
      if (visitedColumns[index]) {
        continue;
      }

      visitedColumns[index] = true;

      answer += BigInt(value) * BigInt(remainingRows);

      remainingColumns--;
    }
  }

  return Number(answer);
};
