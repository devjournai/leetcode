/**
 * Maximum Value Sum by Placing Three Rooks I
 * Intuition: Three non-attacking rooks sit on distinct rows and columns. Each chosen cell can be assumed to be among the top 3 values of its row and of its column, so the search space shrinks to a handful of candidates.
 * Approach: 1. Keep the 3 largest cells in every row and every column. 2. Intersect those two candidate sets and keep the 9 largest remaining cells. 3. Try every triple; skip triples that share a row or column and take the maximum value sum.
 * Dry Run:
 *   board = [[-3,1,1,1],[-3,1,-3,1],[-3,2,1,1]]
 *   Top cells include (2,1)=2 and several 1s. The best non-attacking triple is 2+1+1 = 4.
 * Time Complexity: O(m n)
 * Space Complexity: O(m + n)
 */
var maximumValueSum = function (board) {
  const m = board.length;
  const n = board[0].length;

  const topK = (cells, k) => {
    cells.sort((a, b) => b[0] - a[0] || a[1] - b[1] || a[2] - b[2]);
    return cells.slice(0, k);
  };

  const rowSet = new Set();
  const colSet = new Set();

  for (let i = 0; i < m; i++) {
    const rowCells = [];
    for (let j = 0; j < n; j++) {
      rowCells.push([board[i][j], i, j]);
    }
    for (const cell of topK(rowCells, 3)) {
      rowSet.add(cell.join(","));
    }
  }

  for (let j = 0; j < n; j++) {
    const colCells = [];
    for (let i = 0; i < m; i++) {
      colCells.push([board[i][j], i, j]);
    }
    for (const cell of topK(colCells, 3)) {
      colSet.add(cell.join(","));
    }
  }

  const intersection = [];
  for (const key of rowSet) {
    if (colSet.has(key)) {
      const [val, i, j] = key.split(",").map(Number);
      intersection.push([val, i, j]);
    }
  }

  const topNine = topK(intersection, 9);
  let ans = -Infinity;

  for (let a = 0; a < topNine.length; a++) {
    for (let b = a + 1; b < topNine.length; b++) {
      for (let c = b + 1; c < topNine.length; c++) {
        const [val1, i1, j1] = topNine[a];
        const [val2, i2, j2] = topNine[b];
        const [val3, i3, j3] = topNine[c];
        if (
          i1 === i2 ||
          i1 === i3 ||
          i2 === i3 ||
          j1 === j2 ||
          j1 === j3 ||
          j2 === j3
        ) {
          continue;
        }
        ans = Math.max(ans, val1 + val2 + val3);
      }
    }
  }

  return ans;
};
