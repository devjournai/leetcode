/**
 * Unique Paths
 * Intuition: Paths to a cell equal paths from the left plus paths from above. A 1-row DP array is enough: after initializing the first row to 1, each cell adds the left neighbor (previous cell in the same row of the DP).
 * Approach: 1. Fill an array of length n with 1s. 2. For each extra row, for each column from 1, add dp[col-1] into dp[col]. 3. Return dp[n-1].
 * Dry Run: m = 3, n = 3. dp starts [1,1,1].
 *   - Row 2: [1, 2, 3]. Row 3: [1, 3, 6]. Return 6.
 * Time Complexity: O(m*n)
 * Space Complexity: O(n)
 */
var uniquePaths = function (m, n) {
  const pathsInCurrentRow = new Array(n);

  for (let columnIndex = 0; columnIndex < n; columnIndex++) {
    pathsInCurrentRow[columnIndex] = 1;
  }

  for (let currentRow = 1; currentRow < m; currentRow++) {
    for (let currentColumn = 1; currentColumn < n; currentColumn++) {
      pathsInCurrentRow[currentColumn] += pathsInCurrentRow[currentColumn - 1];
    }
  }

  return pathsInCurrentRow[n - 1];
};
