/**
 * Find the Maximum Number of Fruits Collected
 * Intuition: Three collectors start at (0,0), (0,n-1), and (n-1,0) and must meet at (n-1,n-1) in n-1 moves. The (0,0) collector is forced onto the main diagonal. The other two stay in opposite triangles and never share cells except the meeting corner, so we DP each triangle and add the diagonal, subtracting the corner twice.
 * Approach: 1. Sum `fruits[i][i]` for the diagonal collector. 2. DP from (0,n-1) with moves (1,-1),(1,0),(1,1), staying in the upper triangle. 3. DP from (n-1,0) with moves (-1,1),(0,1),(1,1), staying in the lower triangle. 4. Return diagonal + both DPs to (n-1,n-1) minus `2 * fruits[n-1][n-1]`.
 * Dry Run: n=2, fruits=[[1,2],[3,4]]. Diagonal 1+4=5. Top-right path 2→4. Bottom-left 3→4. Total 5+6+7-8=10.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var maxCollectedFruits = function (fruits) {
  const n = fruits.length;

  const getTopLeft = () => {
    let diagonalSum = 0;
    for (let index = 0; index < n; index++) {
      diagonalSum += fruits[index][index];
    }
    return diagonalSum;
  };

  const getTopRight = () => {
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    dp[0][n - 1] = fruits[0][n - 1];
    const directions = [
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (row >= col && !(row === n - 1 && col === n - 1)) {
          continue;
        }
        for (const [deltaRow, deltaCol] of directions) {
          const prevRow = row - deltaRow;
          const prevCol = col - deltaCol;
          if (prevRow < 0 || prevRow === n || prevCol < 0 || prevCol === n) {
            continue;
          }
          if (prevRow < prevCol && prevCol < n - 1 - prevRow) {
            continue;
          }
          dp[row][col] = Math.max(
            dp[row][col],
            dp[prevRow][prevCol] + fruits[row][col]
          );
        }
      }
    }

    return dp[n - 1][n - 1];
  };

  const getBottomLeft = () => {
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    dp[n - 1][0] = fruits[n - 1][0];
    const directions = [
      [-1, 1],
      [0, 1],
      [1, 1],
    ];

    for (let col = 0; col < n; col++) {
      for (let row = 0; row < n; row++) {
        if (row <= col && !(row === n - 1 && col === n - 1)) {
          continue;
        }
        for (const [deltaRow, deltaCol] of directions) {
          const prevRow = row - deltaRow;
          const prevCol = col - deltaCol;
          if (prevRow < 0 || prevRow === n || prevCol < 0 || prevCol === n) {
            continue;
          }
          if (prevCol < prevRow && prevRow < n - 1 - prevCol) {
            continue;
          }
          dp[row][col] = Math.max(
            dp[row][col],
            dp[prevRow][prevCol] + fruits[row][col]
          );
        }
      }
    }

    return dp[n - 1][n - 1];
  };

  return (
    getTopLeft() + getTopRight() + getBottomLeft() - 2 * fruits[n - 1][n - 1]
  );
};
