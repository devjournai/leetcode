/**
 * Minimum Moves To Spread Stones Over Grid
 * Intuition: The problem requires moving excess stones to empty cells to achieve one stone per cell. Since the grid is 3x3 and has exactly 9 stones, the total number of excess stones will precisely match the total number of empty cells. Given the small grid size (maximum 8 excess stones/empty cells), a brute-force approach trying all permutations of matching excess stones to empty cells is feasible. The cost of moving a stone is its Manhattan distance.
 * Approach: 1. **Identify Sources and Targets**: Iterate through the 3x3 grid. If a cell `(r, c)` has `k > 1` stones, it contributes `k-1` "excess" stones. Store the coordinates `(r, c)` `k-1` times in a `excessSources` list. If a cell `(r, c)` has `0` stones, it is an "empty" cell. Store `(r, c)` once in an `emptyTargets` list. Cells with exactly one stone are ignored as they are already correctly placed. 2. **Permutation via Backtracking**: Implement a recursive function, `recurseAndCalculate(currentSourceIndex, accumulatedMoves)`, to explore all possible assignments. 3. **Base Case**: If `currentSourceIndex` equals the total number of excess stones (i.e., `excessSources.length`), all stones have been assigned. Update the `minTotalMoves` with `accumulatedMoves` and return. 4. **Recursive Step**: For the stone at `excessSources[currentSourceIndex]`, iterate through each available target cell in `emptyTargets`. 5. **Assignment and Recurse**: For an available target cell, calculate the Manhattan distance from the current source stone's location. Mark the target cell as unavailable (e.g., set its entry in `emptyTargets` to `null`). Recursively call `recurseAndCalculate` for the next source stone (`currentSourceIndex + 1`) and updated `accumulatedMoves`. 6. **Backtrack**: After the recursive call returns, unmark the target cell (restore its coordinates in `emptyTargets`) to allow other permutations to use it.
 * Dry Run:
 * Input: `grid = [[1,1,1], [1,0,1], [1,2,1]]`
 *
 * 1. **Initialization**:
 *    - `excessSources = []`
 *    - `emptyTargets = []`
 *    - `rowPointer = 0, columnPointer = 0` to `2,2`:
 *      - `grid[1][1]` is 0: `emptyTargets.push([1,1])`
 *      - `grid[2][1]` is 2: `excessCount = 1`. `tempExcessAdder = 0` to `0`. `excessSources.push([2,1])`.
 *    - After loops: `excessSources = [[2,1]]`, `emptyTargets = [[1,1]]`
 *    - `minTotalMoves = Infinity`
 *
 * 2. **Call `recurseAndCalculate(0, 0)`**:
 *    - `currentSourceIndex = 0`, `accumulatedMoves = 0`
 *    - `currentSourceCoords = [2,1]` (`excessSources[0]`)
 *    - Loop `targetIterationIndex = 0` to `emptyTargets.length - 1` (i.e., `0`):
 *      - `targetIterationIndex = 0`
 *      - `currentTargetCoords = emptyTargets[0]` which is `[1,1]` (not `null`).
 *      - `sourceRowCoord = 2`, `sourceColCoord = 1`
 *      - `targetRowCoord = 1`, `targetColCoord = 1`
 *      - `manhattanDistance = Math.abs(2-1) + Math.abs(1-1) = 1 + 0 = 1`
 *      - `savedTargetData = [1,1]`
 *      - `emptyTargets[0] = null` (marks `[1,1]` as used)
 *      - **Recursive Call: `recurseAndCalculate(1, 0 + 1)`**
 *        - `currentSourceIndex = 1`. This equals `excessSources.length`.
 *        - **Base Case Hit!** `minTotalMoves = Math.min(Infinity, 1) = 1`
 *        - Return.
 *      - **Backtrack**: `emptyTargets[0] = savedTargetData` (restores `[1,1]`)
 *    - Loop finishes.
 *
 * 3. Initial `recurseAndCalculate` call returns.
 * 4. `minimumMoves` returns `minTotalMoves`.
 * Result: 1
 * Time Complexity: O(N! * N)
 * Space Complexity: O(N)
 */
var minimumMoves = function (grid) {
  const excessSources = [];
  const emptyTargets = [];

  let rowPointer = 0;
  while (rowPointer < 3) {
    let columnPointer = 0;
    while (columnPointer < 3) {
      if (grid[rowPointer][columnPointer] > 1) {
        let excessCount = grid[rowPointer][columnPointer] - 1;
        let tempExcessAdder = 0;
        while (tempExcessAdder < excessCount) {
          excessSources.push([rowPointer, columnPointer]);
          tempExcessAdder++;
        }
      } else if (grid[rowPointer][columnPointer] === 0) {
        emptyTargets.push([rowPointer, columnPointer]);
      }
      columnPointer++;
    }
    rowPointer++;
  }

  let minTotalMoves = Infinity;

  function recurseAndCalculate(currentSourceIndex, accumulatedMoves) {
    if (currentSourceIndex === excessSources.length) {
      minTotalMoves = Math.min(minTotalMoves, accumulatedMoves);
      return;
    }

    const currentSourceCoords = excessSources[currentSourceIndex];
    const sourceRowCoord = currentSourceCoords[0];
    const sourceColCoord = currentSourceCoords[1];

    for (
      let targetIterationIndex = 0;
      targetIterationIndex < emptyTargets.length;
      targetIterationIndex++
    ) {
      const currentTargetCoords = emptyTargets[targetIterationIndex];

      if (currentTargetCoords) {
        const targetRowCoord = currentTargetCoords[0];
        const targetColCoord = currentTargetCoords[1];

        const manhattanDistance =
          Math.abs(sourceRowCoord - targetRowCoord) +
          Math.abs(sourceColCoord - targetColCoord);

        const savedTargetData = emptyTargets[targetIterationIndex];
        emptyTargets[targetIterationIndex] = null;

        recurseAndCalculate(
          currentSourceIndex + 1,
          accumulatedMoves + manhattanDistance,
        );

        emptyTargets[targetIterationIndex] = savedTargetData;
      }
    }
  }

  recurseAndCalculate(0, 0);
  return minTotalMoves;
};
