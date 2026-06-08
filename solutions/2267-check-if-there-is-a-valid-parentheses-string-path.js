/**
 * Check If There Is A Valid Parentheses String Path
 * Intuition: A valid parentheses string path must have an even total length, maintain a non-negative parentheses balance throughout its traversal, and conclude with a final balance of zero at the destination. We can systematically explore all potential paths from the start to the end using Depth-First Search (DFS). To optimize this search and prevent redundant computations or infinite loops, we employ memoization, storing visited states defined by the current cell coordinates and the accumulated parentheses balance.
 * Approach: 1. Begin with immediate invalid path checks: if the total number of cells in any path (m + n - 1) is odd, it's impossible to form a valid parentheses string, so return `false`. Similarly, if the starting cell `grid[0][0]` is `')'` or the ending cell `grid[m-1][n-1]` is `'('`, a valid path cannot exist; return `false`. 2. Initialize a `Set` named `memoizedStates` to store unique combinations of `"${rowIndex},${columnIndex},${currentBalance}"` that have already been explored, serving as our memoization table. 3. Define a recursive helper function, `explorePath`, which accepts `rowIndex`, `columnIndex`, and `currentOpenBalance` as its parameters. 4. Within `explorePath`, first handle base pruning conditions: return `false` if `rowIndex` or `columnIndex` are out of bounds (exceeding `numberOfRows` or `numberOfColumns`), or if `currentOpenBalance` ever drops below zero, signifying an invalid parentheses sequence. 5. Update `currentOpenBalance` by incrementing it if the `cellCharacter` at `grid[rowIndex][columnIndex]` is `'('`, or decrementing it if it's `')'`. 6. Construct a unique `stateIdentifier` string. Check if `memoizedStates` already contains this `stateIdentifier`. If so, return `false` because this state has been visited without leading to a solution (or already processed). Otherwise, add the `stateIdentifier` to `memoizedStates`. 7. If the current `rowIndex` and `columnIndex` match the destination (`numberOfRows - 1`, `numberOfColumns - 1`), then the path is valid only if the `currentOpenBalance` is exactly `0`; return `true` or `false` accordingly. 8. For non-destination cells, recursively attempt to move down (`explorePath(rowIndex + 1, columnIndex, currentOpenBalance)`) and to move right (`explorePath(rowIndex, columnIndex + 1, currentOpenBalance)`). The function should return `true` if either of these recursive calls yields a valid path. 9. Initiate the search by invoking `explorePath(0, 0, 0)` from the main function.
 * Dry Run:
 * grid = [["(", ")", "("], ["(", "(", ")"]]
 * numberOfRows = 2, numberOfColumns = 3
 * totalPathLength = 2 + 3 - 1 = 4 (even). Initial check passes.
 * startingChar = '('. Initial check passes.
 * endingChar = ')'. Initial check passes.
 * memoizedStates = new Set()
 *
 * Initial call: explorePath(0, 0, 0)
 *   - rowIndex = 0, columnIndex = 0, currentOpenBalance = 0
 *   - cellCharacter = grid[0][0] = '('. pathBalance becomes 1.
 *   - pathBalance (1) is not < 0.
 *   - stateIdentifier = "0,0,1". Add to memoizedStates.
 *   - Not end cell.
 *   - Calls moveDownResult = explorePath(1, 0, 1):
 *     explorePath(1, 0, 1):
 *       - rowIndex = 1, columnIndex = 0, currentOpenBalance = 1
 *       - cellCharacter = grid[1][0] = '('. pathBalance becomes 2.
 *       - pathBalance (2) is not < 0.
 *       - stateIdentifier = "1,0,2". Add to memoizedStates.
 *       - Not end cell.
 *       - Calls moveDownResultInner = explorePath(2, 0, 2): (rowIndex 2 >= numberOfRows) returns false.
 *       - Calls moveRightResultInner = explorePath(1, 1, 2):
 *         explorePath(1, 1, 2):
 *           - rowIndex = 1, columnIndex = 1, currentOpenBalance = 2
 *           - cellCharacter = grid[1][1] = '('. pathBalance becomes 3.
 *           - pathBalance (3) is not < 0.
 *           - stateIdentifier = "1,1,3". Add to memoizedStates.
 *           - Not end cell.
 *           - Calls moveDownResultDeep = explorePath(2, 1, 3): (rowIndex 2 >= numberOfRows) returns false.
 *           - Calls moveRightResultDeep = explorePath(1, 2, 3):
 *             explorePath(1, 2, 3):
 *               - rowIndex = 1, columnIndex = 2, currentOpenBalance = 3
 *               - cellCharacter = grid[1][2] = ')'. pathBalance becomes 2.
 *               - pathBalance (2) is not < 0.
 *               - stateIdentifier = "1,2,2". Add to memoizedStates.
 *               - Is end cell (1,2). pathBalance (2) is not 0. Returns false.
 *             - moveRightResultDeep is false.
 *           - moveDownResultDeep is false, moveRightResultDeep is false. explorePath(1, 1, 2) returns false.
 *         - moveRightResultInner is false.
 *       - moveDownResultInner is false, moveRightResultInner is false. explorePath(1, 0, 1) returns false.
 *   - moveDownResult is false.
 *   - Calls moveRightResult = explorePath(0, 1, 1):
 *     explorePath(0, 1, 1):
 *       - rowIndex = 0, columnIndex = 1, currentOpenBalance = 1
 *       - cellCharacter = grid[0][1] = ')'. pathBalance becomes 0.
 *       - pathBalance (0) is not < 0.
 *       - stateIdentifier = "0,1,0". Add to memoizedStates.
 *       - Not end cell.
 *       - Calls moveDownResultInnerA = explorePath(1, 1, 0):
 *         explorePath(1, 1, 0):
 *           - rowIndex = 1, columnIndex = 1, currentOpenBalance = 0
 *           - cellCharacter = grid[1][1] = '('. pathBalance becomes 1.
 *           - pathBalance (1) is not < 0.
 *           - stateIdentifier = "1,1,1". Add to memoizedStates.
 *           - Not end cell.
 *           - Calls moveDownResultDeepA = explorePath(2, 1, 1): (rowIndex 2 >= numberOfRows) returns false.
 *           - Calls moveRightResultDeepA = explorePath(1, 2, 1):
 *             explorePath(1, 2, 1):
 *               - rowIndex = 1, columnIndex = 2, currentOpenBalance = 1
 *               - cellCharacter = grid[1][2] = ')'. pathBalance becomes 0.
 *               - pathBalance (0) is not < 0.
 *               - stateIdentifier = "1,2,0". Add to memoizedStates.
 *               - Is end cell (1,2). pathBalance (0) IS 0. Returns true.
 *             - moveRightResultDeepA is true. explorePath(1, 1, 0) returns true.
 *         - moveDownResultInnerA is false, moveRightResultInnerA is true. explorePath(1, 1, 0) returns true.
 *       - moveRightResult is true.
 *   - moveDownResult is false, moveRightResult is true. explorePath(0, 0, 0) returns true.
 * Final result: true. Path: (0,0) -> (0,1) -> (1,1) -> (1,2) forming "()()", which is valid.
 * Time Complexity: O(m * n * (m + n))
 * Space Complexity: O(m * n * (m + n))
 */
var hasValidPath = function (grid) {
  const numberOfRows = grid.length;
  const numberOfColumns = grid[0].length;

  const totalPathLength = numberOfRows + numberOfColumns - 1;
  if (totalPathLength % 2 !== 0) {
    return false;
  }

  const startingChar = grid[0][0];
  if (startingChar === ")") {
    return false;
  }

  const endingChar = grid[numberOfRows - 1][numberOfColumns - 1];
  if (endingChar === "(") {
    return false;
  }

  const memoizedStates = new Set();

  const explorePath = (rowIndex, columnIndex, currentOpenBalance) => {
    if (rowIndex >= numberOfRows || columnIndex >= numberOfColumns) {
      return false;
    }

    let pathBalance = currentOpenBalance;
    const cellCharacter = grid[rowIndex][columnIndex];
    pathBalance += cellCharacter === "(" ? 1 : -1;

    if (pathBalance < 0) {
      return false;
    }

    const stateIdentifier = `${rowIndex},${columnIndex},${pathBalance}`;
    if (memoizedStates.has(stateIdentifier)) {
      return false;
    }
    memoizedStates.add(stateIdentifier);

    if (rowIndex === numberOfRows - 1 && columnIndex === numberOfColumns - 1) {
      return pathBalance === 0;
    }

    const moveDownResult = explorePath(rowIndex + 1, columnIndex, pathBalance);
    const moveRightResult = explorePath(rowIndex, columnIndex + 1, pathBalance);

    return moveDownResult || moveRightResult;
  };

  return explorePath(0, 0, 0);
};
