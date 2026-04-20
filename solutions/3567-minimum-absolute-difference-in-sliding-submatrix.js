/**
 * Minimum Absolute Difference in Sliding Submatrix
 * Time Complexity: O(((m - k + 1) * (n - k + 1)) * k^2 * log(k^2))
 * Space Complexity: O(m * n)
 */
var minAbsDiff = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;

  const ansRows = m - k + 1;
  const ansCols = n - k + 1;
  const ans = Array(ansRows)
    .fill(0)
    .map(() => Array(ansCols).fill(0));

  for (let i = 0; i < ansRows; i++) {
    for (let j = 0; j < ansCols; j++) {
      const distinctValues = new Set();

      for (let row = i; row < i + k; row++) {
        for (let col = j; col < j + k; col++) {
          distinctValues.add(grid[row][col]);
        }
      }

      if (distinctValues.size < 2) {
        ans[i][j] = 0;
      } else {
        const valuesArray = Array.from(distinctValues).sort((a, b) => a - b);

        let minDifference = Infinity;

        for (let idx = 0; idx < valuesArray.length - 1; idx++) {
          const currentDifference = valuesArray[idx + 1] - valuesArray[idx];
          minDifference = Math.min(minDifference, currentDifference);
        }
        ans[i][j] = minDifference;
      }
    }
  }

  return ans;
};
