/**
* Check If There Is A Path With Equal Number Of 0s And 1s
* Intuition: To find a path with an equal number of 0s and 1s, we can represent 0s as -1 and 1s as +1. The goal then becomes finding a path from (0,0) to (m-1, n-1) where the cumulative sum (balance) of these values along the path is exactly 0. This is a pathfinding problem on a grid, suitable for Depth-First Search (DFS) with memoization. A crucial observation is that the total length of any valid path is `m + n - 1`. If this total path length is odd, it's impossible to have an equal count of 0s and 1s, so we can immediately return false. Furthermore, during traversal, if the absolute value of the current balance exceeds the maximum possible change in balance for the remaining steps, that path cannot lead to a balance of zero, allowing for early pruning.
* Approach: 1. Calculate the total fixed path length from (0,0) to (m-1, n-1), which is `numRowsTotal + numColsTotal - 1`. If this length is an odd number, no path can have an equal number of 0s and 1s, so return `false`. 2. Initialize a `memoizedStates` set to store visited states in the format `"${currentGridRow},${currentGridCol},${currentBalanceValue}"` to prevent redundant computations and cycles. 3. Define a recursive helper function `traversePath(currentGridRow, currentGridCol, currentBalanceValue)`. 4. Inside `traversePath`: a. If `currentGridRow` is `numRowsTotal - 1` and `currentGridCol` is `numColsTotal - 1` (destination reached), return `currentBalanceValue === 0`. b. Form a `stateIdentifier` string. If `memoizedStates` already contains this `stateIdentifier`, return `false`. Otherwise, add it to `memoizedStates`. c. Calculate `remainingStepsForPath` to the destination. If `Math.abs(currentBalanceValue)` is greater than `remainingStepsForPath`, return `false` (pruning). d. Initialize a boolean `foundPossiblePath` to `false`. e. Try moving down: If `currentGridRow + 1` is within `numRowsTotal`, calculate `balanceAfterMoveDown` and recursively call `traversePath`. If this call returns `true`, set `foundPossiblePath` to `true`. f. If `foundPossiblePath` is still `false` (meaning the path downwards didn't lead to a solution), try moving right: If `currentGridCol + 1` is within `numColsTotal`, calculate `balanceAfterMoveRight` and recursively call `traversePath`. If this call returns `true`, set `foundPossiblePath` to `true`. g. Return `foundPossiblePath`. 5. Compute the `initialBalanceState` based on `matrixGrid[0][0]` and initiate the DFS by calling `traversePath(0, 0, initialBalanceState)`.
* Dry Run: `grid = [[0,1,0,0],[0,1,0,0],[0,1,1,0]]`
        - `numRowsTotal = 3`, `numColsTotal = 4`. `maximumPathLength = 3 + 4 - 1 = 6`. `6 % 2 === 0`, condition passes.
        - `initialBalanceState = -1` (since `matrixGrid[0][0]` is 0).
        - Call `traversePath(0, 0, -1)`:
            - Not at end. `stateIdentifier = "0,0,-1"`. Add to `memoizedStates`.
            - `remainingStepsForPath = (3-1-0) + (4-1-0) = 5`. `abs(-1) <= 5`, pruning passes.
            - `foundPossiblePath = false`.
            - **Try Down (to 1,0):** `matrixGrid[1][0] = 0`. `balanceAfterMoveDown = -1 + (-1) = -2`.
                - Call `traversePath(1, 0, -2)`: (This path eventually returns `false` after exploring its branches and pruning, as shown in thought process. It leads to `foundPossiblePath` remaining `false` for `traversePath(0,0,-1)`'s down branch)
            - `foundPossiblePath` is still `false`.
            - **Try Right (to 0,1):** `matrixGrid[0][1] = 1`. `balanceAfterMoveRight = -1 + 1 = 0`.
                - Call `traversePath(0, 1, 0)`:
                    - Not at end. `stateIdentifier = "0,1,0"`. Add to `memoizedStates`.
                    - `remainingStepsForPath = (3-1-0) + (4-1-1) = 4`. `abs(0) <= 4`, pruning passes.
                    - `foundPossiblePath = false`.
                    - **Try Down (to 1,1):** `matrixGrid[1][1] = 1`. `balanceAfterMoveDown = 0 + 1 = 1`.
                        - Call `traversePath(1, 1, 1)`:
                            - Not at end. `stateIdentifier = "1,1,1"`. Add to `memoizedStates`.
                            - `remainingStepsForPath = (3-1-1) + (4-1-1) = 3`. `abs(1) <= 3`, pruning passes.
                            - `foundPossiblePath = false`.
                            - **Try Down (to 2,1):** `matrixGrid[2][1] = 1`. `balanceAfterMoveDown = 1 + 1 = 2`.
                                - Call `traversePath(2, 1, 2)`: (This path eventually returns `false` due to pruning, `abs(3)>1` at (2,2,3), as shown in thought process).
                            - `foundPossiblePath` is still `false`.
                            - **Try Right (to 1,2):** `matrixGrid[1][2] = 0`. `balanceAfterMoveRight = 1 + (-1) = 0`.
                                - Call `traversePath(1, 2, 0)`:
                                    - Not at end. `stateIdentifier = "1,2,0"`. Add to `memoizedStates`.
                                    - `remainingStepsForPath = (3-1-1) + (4-1-2) = 2`. `abs(0) <= 2`, pruning passes.
                                    - `foundPossiblePath = false`.
                                    - **Try Down (to 2,2):** `matrixGrid[2][2] = 1`. `balanceAfterMoveDown = 0 + 1 = 1`.
                                        - Call `traversePath(2, 2, 1)`:
                                            - Not at end. `stateIdentifier = "2,2,1"`. Add to `memoizedStates`.
                                            - `remainingStepsForPath = (3-1-2) + (4-1-2) = 1`. `abs(1) <= 1`, pruning passes.
                                            - `foundPossiblePath = false`.
                                            - **Try Right (to 2,3):** `matrixGrid[2][3] = 0`. `balanceAfterMoveRight = 1 + (-1) = 0`.
                                                - Call `traversePath(2, 3, 0)`:
                                                    - At end (`currentGridRow = 2`, `currentGridCol = 3`).
                                                    - Return `currentBalanceValue === 0` (i.e., `0 === 0`), which is `true`.
                                            - `foundPossiblePath` becomes `true`. Return `true`.
                                    - `foundPossiblePath` becomes `true`. Return `true`.
                            - `foundPossiblePath` becomes `true`. Return `true`.
                    - `foundPossiblePath` becomes `true`. Return `true`.
            - `foundPossiblePath` becomes `true`. Return `true`.
        - The initial call `traversePath(0, 0, -1)` returns `true`.
* Time Complexity: O(M * N * (M + N))
* Space Complexity: O(M * N * (M + N))
*/
var isThereAPath = function (grid) {
  const numRowsTotal = grid.length;
  const numColsTotal = grid[0].length;
  const maximumPathLength = numRowsTotal + numColsTotal - 1;

  if (maximumPathLength % 2 !== 0) {
    return false;
  }

  const memoizedStates = new Set();
  const initialBalanceState = grid[0][0] === 1 ? 1 : -1;
  const matrixGrid = grid;

  function traversePath(currentGridRow, currentGridCol, currentBalanceValue) {
    if (
      currentGridRow === numRowsTotal - 1 &&
      currentGridCol === numColsTotal - 1
    ) {
      return currentBalanceValue === 0;
    }

    const stateIdentifier = `${currentGridRow},${currentGridCol},${currentBalanceValue}`;
    if (memoizedStates.has(stateIdentifier)) {
      return false;
    }
    memoizedStates.add(stateIdentifier);

    const remainingStepsForPath =
      numRowsTotal - 1 - currentGridRow + (numColsTotal - 1 - currentGridCol);
    if (Math.abs(currentBalanceValue) > remainingStepsForPath) {
      return false;
    }

    let foundPossiblePath = false;

    const nextRowCoord = currentGridRow + 1;
    if (nextRowCoord < numRowsTotal) {
      const balanceAfterMoveDown =
        currentBalanceValue +
        (matrixGrid[nextRowCoord][currentGridCol] === 1 ? 1 : -1);
      foundPossiblePath = traversePath(
        nextRowCoord,
        currentGridCol,
        balanceAfterMoveDown
      );
    }

    if (!foundPossiblePath) {
      const nextColCoord = currentGridCol + 1;
      if (nextColCoord < numColsTotal) {
        const balanceAfterMoveRight =
          currentBalanceValue +
          (matrixGrid[currentGridRow][nextColCoord] === 1 ? 1 : -1);
        foundPossiblePath = traversePath(
          currentGridRow,
          nextColCoord,
          balanceAfterMoveRight
        );
      }
    }

    return foundPossiblePath;
  }

  return traversePath(0, 0, initialBalanceState);
};
