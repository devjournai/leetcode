/**
 * The Knights Tour
 * Intuition: A knight's tour can be found using a backtracking algorithm. To make this approach practical and efficient, especially for larger boards, Warnsdorff's Rule heuristic is employed. This rule prioritizes the next move to a cell that has the fewest possible subsequent moves to unvisited cells. This strategy helps to prevent the knight from getting trapped in an isolated part of the board, thereby guiding the search towards a solution more effectively.
 * Approach: 1. Initialize an `m` by `n` `boardGrid` where each cell is marked with -1, indicating an unvisited state. 2. Define `deltaMoves`, an array representing the 8 possible L-shaped movements of a knight as row and column offsets. 3. Implement a nested `checkValidity` function to determine if a given cell `(row, col)` is within board boundaries and currently unvisited. 4. Implement a nested `calculateDegree` function, which, for a given `(row, col)`, counts how many valid (in-bounds and unvisited) cells a knight can move to from that position. This is used by Warnsdorff's Rule. 5. Create a recursive `backtrackKnightsTour` function that takes the `currentPathRow`, `currentPathCol`, and `moveStepCount`. 6. Inside `backtrackKnightsTour`, mark `boardGrid[currentPathRow][currentPathCol]` with `moveStepCount`. 7. If `moveStepCount` equals `totalRows * totalCols - 1`, it means all cells have been visited, so a tour is complete; return `true`. 8. Generate `candidatesWithDegrees`: an array of all possible next moves from the current position. For each potential move `(nextCandidateRow, nextCandidateCol)`, calculate its `degreeOfCandidate` using `calculateDegree` and store it as `[nextCandidateRow, nextCandidateCol, degreeOfCandidate]`. 9. Sort `candidatesWithDegrees` in ascending order based on their `degreeOfCandidate` (Warnsdorff's Rule). 10. Iterate through the `candidatesWithDegrees`. For each `chosenNextRow`, `chosenNextCol`, recursively call `backtrackKnightsTour` with the new position and `moveStepCount + 1`. If the recursive call `recursiveResult` returns `true`, propagate `true` upwards to indicate a successful tour. 11. If no recursive call from the current position leads to a solution, backtrack by resetting `boardGrid[currentPathRow][currentPathCol]` to -1 and return `false`. 12. Initiate the tour by calling `backtrackKnightsTour` with the starting `r`, `c`, and an initial `moveStepCount` of 0. Finally, return the populated `boardGrid`.
 * Dry Run: m=3, n=3, r=0, c=0
 * Initial boardGrid: [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
 * backtrackKnightsTour(0, 0, 0):
 *   boardGrid[0][0] = 0
 *   moveStepCount (0) != (3*3-1)
 *   Generate candidates from (0,0):
 *     (2,1): calculateDegree(2,1) -> 1 (can only move to (0,2) on a 3x3, assuming (0,0) is visited)
 *     (1,2): calculateDegree(1,2) -> 1 (can only move to (2,0) on a 3x3, assuming (0,0) is visited)
 *   candidatesWithDegrees: [[2,1,1], [1,2,1]] (order might vary if degrees are equal)
 *   Sorts to: [[2,1,1], [1,2,1]] (or equivalent)
 *   Try first candidate (2,1):
 *     recursiveResult = backtrackKnightsTour(2, 1, 1):
 *       boardGrid[2][1] = 1
 *       moveStepCount (1) != (3*3-1)
 *       Generate candidates from (2,1):
 *         (0,2): calculateDegree(0,2) -> 1 (can only move to (1,0) on a 3x3, given (0,0),(2,1) visited)
 *       candidatesWithDegrees: [[0,2,1]]
 *       Sorts to: [[0,2,1]]
 *       Try first candidate (0,2):
 *         recursiveResult = backtrackKnightsTour(0, 2, 2):
 *           ... this process continues. For a 3x3 board, a knight's tour is impossible. Eventually, a path will reach a cell with no valid unvisited next moves, leading to backtracking. All paths will eventually return false.
 * The function will ultimately return `boardGrid` in its final state (which, for 3x3, would likely still contain -1s if no full tour is found and the algorithm completes exploring all paths).
 * Time Complexity: O(8^(M*N))
 * Space Complexity: O(M*N)
 */
var tourOfKnight = function (m, n, r, c) {
  const totalRows = m;
  const totalCols = n;
  const boardGrid = new Array(totalRows)
    .fill(null)
    .map(() => new Array(totalCols).fill(-1));
  const deltaMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  function checkValidity(checkGridRow, checkGridCol) {
    const isRowValid = checkGridRow >= 0 && checkGridRow < totalRows;
    const isColValid = checkGridCol >= 0 && checkGridCol < totalCols;
    if (!isRowValid || !isColValid) {
      return false;
    }
    const isCellUnvisited = boardGrid[checkGridRow][checkGridCol] === -1;
    return isCellUnvisited;
  }

  function calculateDegree(degreeCountRow, degreeCountCol) {
    let accessibleCount = 0;
    for (const [deltaRSecond, deltaCSecond] of deltaMoves) {
      const neighborRow = degreeCountRow + deltaRSecond;
      const neighborCol = degreeCountCol + deltaCSecond;
      if (checkValidity(neighborRow, neighborCol)) {
        accessibleCount++;
      }
    }
    return accessibleCount;
  }

  function backtrackKnightsTour(currentPathRow, currentPathCol, moveStepCount) {
    boardGrid[currentPathRow][currentPathCol] = moveStepCount;

    if (moveStepCount === totalRows * totalCols - 1) {
      return true;
    }

    const candidatesWithDegrees = [];
    for (const [deltaRFirst, deltaCFirst] of deltaMoves) {
      const nextCandidateRow = currentPathRow + deltaRFirst;
      const nextCandidateCol = currentPathCol + deltaCFirst;
      if (checkValidity(nextCandidateRow, nextCandidateCol)) {
        const degreeOfCandidate = calculateDegree(
          nextCandidateRow,
          nextCandidateCol
        );
        candidatesWithDegrees.push([
          nextCandidateRow,
          nextCandidateCol,
          degreeOfCandidate,
        ]);
      }
    }

    candidatesWithDegrees.sort(
      (compareA, compareB) => compareA[2] - compareB[2]
    );

    for (const candidateInfo of candidatesWithDegrees) {
      const chosenNextRow = candidateInfo[0];
      const chosenNextCol = candidateInfo[1];

      const recursiveResult = backtrackKnightsTour(
        chosenNextRow,
        chosenNextCol,
        moveStepCount + 1
      );
      if (recursiveResult) {
        return true;
      }
    }

    boardGrid[currentPathRow][currentPathCol] = -1;
    return false;
  }

  backtrackKnightsTour(r, c, 0);
  return boardGrid;
};
