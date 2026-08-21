/**
 * Number of Paths with Max Score
 * Intuition: This problem asks for both the maximum score and the number of paths achieving it. Since moves are restricted to "up", "left", or "up-left", a dynamic programming approach can compute the state for each cell based on previously computed states from "below" or "to the right". Each DP state will store a pair: [maximum_score_to_reach_this_cell, count_of_paths_for_that_score].
 * Approach: 1. Initialize a 2D DP array, `pathScoresAndCounts`, of the same dimensions as the board. Each entry will be a pair `[maxScore, numPaths]`, initially `[-Infinity, 0]` to denote an unreachable state. 2. Define `boardSize` as the board's dimension and `moduloValue` for path counts. 3. Set the base case: The starting cell 'S' at `(boardSize - 1, boardSize - 1)` has a score of `0` and `1` path, so `pathScoresAndCounts[boardSize - 1][boardSize - 1]` is `[0, 1]`. 4. Iterate through the board from bottom-right to top-left (i.e., `currentGridRow` from `boardSize - 1` down to `0`, and `currentGridColumn` from `boardSize - 1` down to `0`). 5. For each cell: If it's an obstacle 'X', it remains `[-Infinity, 0]`. If it's the 'S' cell, skip further processing for this cell as its base state is set. Otherwise, determine its `squareNumericValue` (0 for 'E', otherwise its numeric character value). 6. Consider three possible previous cells from which one could have moved to the current cell (bottom, right, or bottom-right diagonal). For each valid previous cell `(sourceRow, sourceColumn)`: 7. If `pathScoresAndCounts[sourceRow][sourceColumn][1]` is `0` (meaning no path to that previous cell), skip it. 8. Calculate `prospectiveTotalScore` by adding `pathScoresAndCounts[sourceRow][sourceColumn][0]` and `squareNumericValue`. 9. Update the current cell's `maxScore` and `numPaths`: If `prospectiveTotalScore` is greater than the current cell's `maxScore`, replace it and set `numPaths` to `pathScoresAndCounts[sourceRow][sourceColumn][1]`. If `prospectiveTotalScore` is equal, add `pathScoresAndCounts[sourceRow][sourceColumn][1]` to the current cell's `numPaths` (modulo `moduloValue`). 10. After iterating through all possible previous cells, `pathScoresAndCounts[currentGridRow][currentGridColumn]` will hold the final `maxScore` and `numPaths` for that cell. 11. The final result is `pathScoresAndCounts[0][0]` (the 'E' cell). If `pathScoresAndCounts[0][0][1]` is `0`, return `[0, 0]` indicating no path.
 * Dry Run: boardInput = ["E23", "2X4", "12S"], boardSize = 3, moduloValue = 10^9 + 7
 * `pathScoresAndCounts` initialized to `[[-Infinity, 0]]` everywhere, except `pathScoresAndCounts[2][2]` = `[0, 1]` ('S').
 *
 * Iteration (relevant updates):
 * - `(2,1)` ('2'): `squareNumericValue = 2`. Source `(2,2)` (`[0,1]`). `prospectiveTotalScore = 0 + 2 = 2`. `pathScoresAndCounts[2][1]` becomes `[2, 1]`.
 * - `(2,0)` ('1'): `squareNumericValue = 1`. Source `(2,1)` (`[2,1]`). `prospectiveTotalScore = 2 + 1 = 3`. `pathScoresAndCounts[2][0]` becomes `[3, 1]`.
 * - `(1,2)` ('4'): `squareNumericValue = 4`. Source `(2,2)` (`[0,1]`). `prospectiveTotalScore = 0 + 4 = 4`. `pathScoresAndCounts[1][2]` becomes `[4, 1]`.
 * - `(1,1)` ('X'): Remains `[-Infinity, 0]`.
 * - `(1,0)` ('2'): `squareNumericValue = 2`.
 *   - Source `(1,1)` (`[-Infinity,0]`): Skip.
 *   - Source `(2,0)` (`[3,1]`): `prospectiveTotalScore = 3 + 2 = 5`. `pathScoresAndCounts[1][0]` becomes `[5, 1]`.
 *   - Source `(2,1)` (`[2,1]`): `prospectiveTotalScore = 2 + 2 = 4`. Less than 5, no update.
 * - `(0,2)` ('3'): `squareNumericValue = 3`. Source `(1,2)` (`[4,1]`). `prospectiveTotalScore = 4 + 3 = 7`. `pathScoresAndCounts[0][2]` becomes `[7, 1]`.
 * - `(0,1)` ('2'): `squareNumericValue = 2`.
 *   - Source `(0,2)` (`[7,1]`): `prospectiveTotalScore = 7 + 2 = 9`. `pathScoresAndCounts[0][1]` becomes `[9, 1]`.
 *   - Source `(1,1)` (`[-Infinity,0]`): Skip.
 *   - Source `(1,2)` (`[4,1]`): `prospectiveTotalScore = 4 + 2 = 6`. Less than 9, no update.
 * - `(0,0)` ('E'): `squareNumericValue = 0`.
 *   - Source `(0,1)` (`[9,1]`): `prospectiveTotalScore = 9 + 0 = 9`. `pathScoresAndCounts[0][0]` becomes `[9, 1]`.
 *   - Source `(1,0)` (`[5,1]`): `prospectiveTotalScore = 5 + 0 = 5`. Less than 9, no update.
 *   - Source `(1,1)` (`[-Infinity,0]`): Skip.
 *
 * Final Result: `pathScoresAndCounts[0][0]` is `[9, 1]`.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var pathsWithMaxScore = function (boardInput) {
  const boardSize = boardInput.length;
  const moduloValue = 1000000007;

  const pathScoresAndCounts = Array.from({ length: boardSize }, () =>
    new Array(boardSize).fill(null).map(() => [-Infinity, 0])
  );

  pathScoresAndCounts[boardSize - 1][boardSize - 1] = [0, 1];

  const possibleMoveOffsets = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  for (
    let currentGridRow = boardSize - 1;
    currentGridRow >= 0;
    currentGridRow--
  ) {
    for (
      let currentGridColumn = boardSize - 1;
      currentGridColumn >= 0;
      currentGridColumn--
    ) {
      if (boardInput[currentGridRow][currentGridColumn] === "X") {
        pathScoresAndCounts[currentGridRow][currentGridColumn] = [-Infinity, 0];
        continue;
      }

      if (
        currentGridRow === boardSize - 1 &&
        currentGridColumn === boardSize - 1
      ) {
        continue;
      }

      const squareNumericValue =
        boardInput[currentGridRow][currentGridColumn] === "E"
          ? 0
          : Number(boardInput[currentGridRow][currentGridColumn]);

      let currentMaxCollectedScore = -Infinity;
      let currentPathWayCount = 0;

      for (const [deltaRow, deltaColumn] of possibleMoveOffsets) {
        const sourceRow = currentGridRow + deltaRow;
        const sourceColumn = currentGridColumn + deltaColumn;

        if (sourceRow >= boardSize || sourceColumn >= boardSize) {
          continue;
        }

        const priorPathsCount = pathScoresAndCounts[sourceRow][sourceColumn][1];
        if (priorPathsCount === 0) {
          continue;
        }

        const priorScoreValue = pathScoresAndCounts[sourceRow][sourceColumn][0];
        const prospectiveTotalScore = priorScoreValue + squareNumericValue;

        if (prospectiveTotalScore > currentMaxCollectedScore) {
          currentMaxCollectedScore = prospectiveTotalScore;
          currentPathWayCount = priorPathsCount;
        } else if (prospectiveTotalScore === currentMaxCollectedScore) {
          currentPathWayCount =
            (currentPathWayCount + priorPathsCount) % moduloValue;
        }
      }
      pathScoresAndCounts[currentGridRow][currentGridColumn] = [
        currentMaxCollectedScore,
        currentPathWayCount,
      ];
    }
  }

  const finalScoreResult = pathScoresAndCounts[0][0];
  if (finalScoreResult[1] === 0) {
    return [0, 0];
  }
  return finalScoreResult;
};
