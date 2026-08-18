/**
 * Minimum Moves to Get a Peaceful Board
 * Intuition: A peaceful board has one rook per row and per column. Rows and columns are independent: sort current row indices and move rook i to row i (same for columns). Total moves are the L1 distances to those targets.
 * Approach: 1. Sort rooks by row and by column separately. 2. For i in 0..n-1 add |sortedByRow[i][0] - i| and |sortedByCol[i][1] - i|.
 * Dry Run: rooks = [[0,0],[1,0],[1,1]]
 *   sortedByRow rows 0,1,1 -> |0-0|+|1-1|+|1-2| = 1
 *   sortedByCol cols 0,0,1 -> |0-0|+|0-1|+|1-2| = 2
 *   Return 3
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var minMoves = function (rooks) {
  const n = rooks.length;
  const sortedByRow = [...rooks].sort((a, b) => a[0] - b[0]);
  const sortedByCol = [...rooks].sort((a, b) => a[1] - b[1]);
  let ans = 0;

  for (let i = 0; i < n; i++) {
    ans += Math.abs(sortedByRow[i][0] - i);
    ans += Math.abs(sortedByCol[i][1] - i);
  }

  return ans;
};
