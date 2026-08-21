/**
 * Reconstruct A 2 Row Binary Matrix
 * Intuition: Columns with colsum 2 must take both 1s first (they spend both remaining row budgets). Columns with colsum 1 can then greedily take the upper row while upper budget remains.
 * Approach: 1. Place 1/1 on every colsum=2 column and decrease both balances. 2. If either balance is negative, return []. 3. For each colsum=1, put a 1 in the upper row if currentUpperSumBalance>0 else lower; fail if neither has budget. 4. Return the grid only if both balances finish at 0.
 * Dry Run: upper=2, lower=1, colsum=[1,1,1]
 *   no 2s. Then col 0 upper, col 1 upper, col 2 lower. Balances 0,0. Grid [[1,1,0],[0,0,1]].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var reconstructMatrix = function (upper, lower, colsum) {
  const totalColumns = colsum.length;
  const finalMatrixGrid = new Array(2);
  finalMatrixGrid[0] = new Array(totalColumns);
  finalMatrixGrid[1] = new Array(totalColumns);

  let currentUpperSumBalance = upper;
  let currentLowerSumBalance = lower;

  for (
    let firstColumnIteration = 0;
    firstColumnIteration < totalColumns;
    firstColumnIteration++
  ) {
    if (colsum[firstColumnIteration] === 2) {
      finalMatrixGrid[0][firstColumnIteration] = 1;
      finalMatrixGrid[1][firstColumnIteration] = 1;
      currentUpperSumBalance--;
      currentLowerSumBalance--;
    } else {
      finalMatrixGrid[0][firstColumnIteration] = 0;
      finalMatrixGrid[1][firstColumnIteration] = 0;
    }
  }

  if (currentUpperSumBalance < 0 || currentLowerSumBalance < 0) {
    return [];
  }

  let secondColumnIteration = 0;
  for (const currentColumnValue of colsum) {
    if (currentColumnValue === 1) {
      if (currentUpperSumBalance > 0) {
        finalMatrixGrid[0][secondColumnIteration] = 1;
        currentUpperSumBalance--;
      } else if (currentLowerSumBalance > 0) {
        finalMatrixGrid[1][secondColumnIteration] = 1;
        currentLowerSumBalance--;
      } else {
        return [];
      }
    }
    secondColumnIteration++;
  }

  if (currentUpperSumBalance === 0 && currentLowerSumBalance === 0) {
    return finalMatrixGrid;
  } else {
    return [];
  }
};
