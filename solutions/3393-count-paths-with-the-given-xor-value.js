/**
 * Count Paths With the Given XOR Value
 * Intuition: Paths only move right or down. XOR values are at most 15, so DP can count paths to each cell for every XOR.
 * Approach: 1. `dp[i][j][xor] =` ways from (0,0) to (i,j) with that XOR. 2. Start `dp[0][0][grid[0][0]] = 1`. 3. Push right/down, XOR in the next cell's value, mod 1e9+7. 4. Return `dp[m-1][n-1][k]`.
 * Dry Run: grid = [[2,1,5],[7,10,0],[12,6,4]], k = 11. One known path 2→1→5→0→4 has XOR 2^1^5^0^4=2, not 11. The sample answer is 3 paths with XOR 11.
 * Time Complexity: O(M * N * 16)
 * Space Complexity: O(M * N * 16)
 */

var countPathsWithXorValue = function (grid, k) {
  const MOD = 1000000007;
  const MAX_XOR = 15;
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  const pathCounts = Array.from({ length: rowCount }, () =>
    Array.from({ length: columnCount }, () => new Array(MAX_XOR + 1).fill(0))
  );

  pathCounts[0][0][grid[0][0]] = 1;

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      for (let xorValue = 0; xorValue <= MAX_XOR; xorValue++) {
        const ways = pathCounts[rowIndex][columnIndex][xorValue];
        if (ways === 0) {
          continue;
        }
        if (rowIndex + 1 < rowCount) {
          const newXor = xorValue ^ grid[rowIndex + 1][columnIndex];
          pathCounts[rowIndex + 1][columnIndex][newXor] =
            (pathCounts[rowIndex + 1][columnIndex][newXor] + ways) % MOD;
        }
        if (columnIndex + 1 < columnCount) {
          const newXor = xorValue ^ grid[rowIndex][columnIndex + 1];
          pathCounts[rowIndex][columnIndex + 1][newXor] =
            (pathCounts[rowIndex][columnIndex + 1][newXor] + ways) % MOD;
        }
      }
    }
  }

  return pathCounts[rowCount - 1][columnCount - 1][k];
};
