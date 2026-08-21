/**
 * Minimum Number Of Operations To Satisfy Conditions
 * Intuition: Every cell in a column must share one value in `0..9`, and adjacent columns must use different values. The cheapest value for a column is `rows - count[col][digit]`. DP chooses a digit for column `j` different from column `j-1` to minimize the remaining cost.
 * Approach: 1. Count digit frequencies per column. 2. `dp(column, previousDigit)` tries every digit `0..9` except `previousDigit` (ignored on column 0). 3. Cost is `m - count[column][digit]` plus the DP of the rest. 4. Memoize on `(column, previousDigit)`.
 * Dry Run:
 * Input: grid = [[1,0,2],[1,0,2]]
 * 1. Column 0 already all 1s (cost 0), column 1 all 0s (cost 0), column 2 all 2s (cost 0) and neighbors differ. Answer: 0
 * Time Complexity: O(n * 10 * 10)
 * Space Complexity: O(n)
 */
var minimumOperations = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  const digitCountByColumn = Array.from({ length: columnCount }, () =>
    new Array(10).fill(0)
  );
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      digitCountByColumn[columnIndex][grid[rowIndex][columnIndex]]++;
    }
  }

  const memoizedOperationCounts = Array.from({ length: columnCount }, () =>
    new Array(10).fill(-1)
  );

  const minOperationsFromColumn = (columnIndex, previousDigit) => {
    if (columnIndex === columnCount) {
      return 0;
    }
    if (memoizedOperationCounts[columnIndex][previousDigit] !== -1) {
      return memoizedOperationCounts[columnIndex][previousDigit];
    }

    let bestOperations = Number.POSITIVE_INFINITY;
    for (let chosenDigit = 0; chosenDigit < 10; chosenDigit++) {
      if (columnIndex !== 0 && chosenDigit === previousDigit) {
        continue;
      }
      const changeCost =
        rowCount - digitCountByColumn[columnIndex][chosenDigit];
      bestOperations = Math.min(
        bestOperations,
        changeCost + minOperationsFromColumn(columnIndex + 1, chosenDigit)
      );
    }

    memoizedOperationCounts[columnIndex][previousDigit] = bestOperations;
    return bestOperations;
  };

  return minOperationsFromColumn(0, 0);
};
