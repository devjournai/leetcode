/**
 * Number Of Valid Move Combinations On Chessboard
 * Intuition: The problem involves selecting one valid move (including staying put) for each of N pieces, and then checking if the entire set of N moves leads to any collision at any point in time during the simultaneous movement. Since N is small (up to 4), this suggests a backtracking approach to enumerate all possible move combinations, followed by a simulation to validate each combination.
 * Approach:
 * 1. Define piece movement rules: Create a map `pieceMovementVectors` that stores the possible `[dr, dc]` vectors for 'rook', 'bishop', and 'queen'. These vectors represent one unit of movement in a specific direction.
 * 2. Implement a recursive backtracking function, `exploreMoveCombinations`, to generate all possible destination choices for each piece. This function takes the `currentPieceIndex`, a list of chosen direction vectors (`accumulatedDirectionVectors`), and a list of chosen number of steps (`accumulatedStepCounts`) as arguments.
 * 3. Base Case for `exploreMoveCombinations`: If `currentPieceIndex` equals `numberOfPieces`, it means all `N` pieces have had their moves chosen. At this point, call a helper function `verifyNoCollisions` to check if this specific combination of moves is valid. Add 1 to the total count if valid, 0 otherwise.
 * 4. Recursive Step for `exploreMoveCombinations`:
 *    a. First, consider the option where the current piece stays put. This means choosing `[0, 0]` as the direction vector and `0` as the number of steps. Make a recursive call with `currentPieceIndex + 1`, extending the `accumulatedDirectionVectors` and `accumulatedStepCounts`.
 *    b. Second, for each valid movement direction `[dr, dc]` defined for the current piece type (obtained from `pieceMovementVectors[pieces[currentPieceIndex]]`):
 *       i. Initialize `currentRow` and `currentCol` to the piece's starting position `initialPositions[currentPieceIndex]`.
 *       ii. Initialize `stepsTaken` to 0.
 *       iii. Enter a `while` loop: While the next potential position (`currentRow + dr`, `currentCol + dc`) is within the 8x8 board boundaries:
 *          1. Update `currentRow = currentRow + dr` and `currentCol = currentCol + dc`.
 *          2. Increment `stepsTaken`.
 *          3. Make a recursive call with `currentPieceIndex + 1`, extending `accumulatedDirectionVectors` with `[dr, dc]` and `accumulatedStepCounts` with `stepsTaken`.
 *    c. Sum the results from all recursive calls (staying put and moving in all valid ways).
 * 5. Implement `verifyNoCollisions` function: This function takes the `potentialDirectionVectors` and `potentialStepCounts` for all `N` pieces.
 *    a. Determine the `maximumMovementDuration` by finding the maximum value in `potentialStepCounts`. This determines how many time units (seconds) need to be simulated.
 *    b. Iterate `currentSimulationTime` from 0 up to `maximumMovementDuration`.
 *    c. For each `currentSimulationTime`:
 *       i. Initialize a `Set` called `occupiedCoordinates` to store unique string representations of `(row, col)` coordinates.
 *       ii. For each piece `pieceIterator` from 0 to `numberOfPieces - 1`:
 *          1. Retrieve the piece's initial position `[initialRow, initialCol]`, its chosen direction `[chosenDeltaRow, chosenDeltaCol]`, and its chosen total steps `chosenTotalSteps`.
 *          2. Calculate the `effectiveStepsThisTurn` the piece takes by `Math.min(currentSimulationTime, chosenTotalSteps)`. This ensures pieces stop at their destination.
 *          3. Calculate the piece's `presentRow` and `presentCol` at `currentSimulationTime`: `(initialRow + chosenDeltaRow * effectiveStepsThisTurn, initialCol + chosenDeltaCol * effectiveStepsThisTurn)`.
 *          4. Create a unique `positionKey` string from `presentRow` and `presentCol`.
 *          5. If `occupiedCoordinates` already contains `positionKey`, a collision has occurred; return `false`.
 *          6. Add `positionKey` to `occupiedCoordinates`.
 *    d. If the loops complete without any collisions, return `true`.
 * 6. Implement a helper function `isWithinBoardBounds(boardRow, boardCol)` to check if a given `(boardRow, boardCol)` coordinate is between 1 and 8 (inclusive) for both row and column.
 * Dry Run:
 * Input: pieces = ["rook"], positions = [[1,1]]
 * 1. `numberOfPieces = 1`, `initialPositions = [[1,1]]`.
 * 2. Call `exploreMoveCombinations(0, [], [])`. `totalPossibleCombinations` is initialized to 0.
 *    a. `currentPieceIndex = 0`. Piece type is "rook", starting at [1,1].
 *    b. First option: Stay put. `accumulatedDirectionVectors = [[0,0]]`, `accumulatedStepCounts = [0]`.
 *       Recursive call `exploreMoveCombinations(1, [[0,0]], [0])`.
 *       i. `currentPieceIndex = 1`. Base case reached. Call `verifyNoCollisions([[0,0]], [0])`.
 *          1. `maximumMovementDuration = 0`.
 *          2. `currentSimulationTime = 0`.
 *             a. `occupiedCoordinates = Set {}`.
 *             b. Piece `pieceIterator = 0`: `initialRow=1, initialCol=1`, `chosenDeltaRow=0, chosenDeltaCol=0`, `chosenTotalSteps=0`.
 *             c. `effectiveStepsThisTurn = min(0,0) = 0`.
 *             d. `presentRow=1 + 0*0 = 1`, `presentCol=1 + 0*0 = 1`.
 *             e. `positionKey = "1,1"`. `occupiedCoordinates` does not have "1,1". Add "1,1".
 *          3. Loop finishes. `verifyNoCollisions` returns `true`.
 *       ii. `exploreMoveCombinations` adds `1` to `totalPossibleCombinations`. (`totalPossibleCombinations = 1`).
 *    c. Second option: Move for 'rook' from [1,1]. `pieceMovementVectors` for 'rook' are `[[0,1], [0,-1], [1,0], [-1,0]]`.
 *       i. Direction `[0,1]` (move right):
 *          1. `stepsTaken = 0`. `currentRow = 1, currentCol = 1`. `isWithinBoardBounds(1+0, 1+1)` is true.
 *             `currentRow` becomes 1, `currentCol` becomes 2. `stepsTaken` becomes 1.
 *             Recursive call `exploreMoveCombinations(1, [[0,1]], [1])`. This eventually returns 1 (for the valid path 1,1 -> 1,2).
 *             `totalPossibleCombinations` increments by 1. (`totalPossibleCombinations = 2`).
 *          2. `stepsTaken = 1`. `currentRow = 1, currentCol = 2`. `isWithinBoardBounds(1+0, 2+1)` is true.
 *             `currentRow` becomes 1, `currentCol` becomes 3. `stepsTaken` becomes 2.
 *             Recursive call `exploreMoveCombinations(1, [[0,1]], [2])`. This eventually returns 1.
 *             `totalPossibleCombinations` increments by 1. (`totalPossibleCombinations = 3`).
 *          ... This process continues until `stepsTaken = 7`, reaching destination `(1,8)`. (7 such moves in this direction).
 *          Total `totalPossibleCombinations` for this direction: 7. Current `totalPossibleCombinations = 1 + 7 = 8`.
 *          When `stepsTaken = 7`, `currentRow=1, currentCol=8`. `isWithinBoardBounds(1+0, 8+1)` is false. Loop terminates for `[0,1]`.
 *       ii. Direction `[0,-1]` (move left):
 *          1. `stepsTaken = 0`. `currentRow = 1, currentCol = 1`. `isWithinBoardBounds(1+0, 1-1)` is false (as 0 is out of bounds). Loop terminates immediately. (0 moves in this direction).
 *       iii. Direction `[1,0]` (move down):
 *          1. Similar to moving right, `stepsTaken` goes from 1 to 7, reaching `(8,1)`. (7 moves in this direction).
 *          `totalPossibleCombinations` increments by 7. Current `totalPossibleCombinations = 8 + 7 = 15`.
 *       iv. Direction `[-1,0]` (move up):
 *          1. Similar to moving left, `isWithinBoardBounds(1-1, 1+0)` is false. Loop terminates. (0 moves in this direction).
 * 3. The initial call `exploreMoveCombinations(0, [], [])` returns `15`.
 * Time Complexity: O(C^N * N * S)
 * Space Complexity: O(N * S + N^2)
 */
var countCombinations = function (pieces, positions) {
  const numberOfPieces = pieces.length;
  const boardDimension = 8;

  const pieceMovementVectors = {
    rook: [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ],
    bishop: [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ],
    queen: [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ],
  };

  function isWithinBoardBounds(boardRow, boardCol) {
    return (
      boardRow >= 1 &&
      boardRow <= boardDimension &&
      boardCol >= 1 &&
      boardCol <= boardDimension
    );
  }

  function verifyNoCollisions(potentialDirectionVectors, potentialStepCounts) {
    const maximumMovementDuration = Math.max(...potentialStepCounts);

    for (
      let currentSimulationTime = 0;
      currentSimulationTime <= maximumMovementDuration;
      currentSimulationTime++
    ) {
      const occupiedCoordinates = new Set();
      for (
        let pieceIterator = 0;
        pieceIterator < numberOfPieces;
        pieceIterator++
      ) {
        const [initialRow, initialCol] = positions[pieceIterator];
        const [chosenDeltaRow, chosenDeltaCol] =
          potentialDirectionVectors[pieceIterator];
        const chosenTotalSteps = potentialStepCounts[pieceIterator];

        const effectiveStepsThisTurn = Math.min(
          currentSimulationTime,
          chosenTotalSteps,
        );
        const presentRow = initialRow + chosenDeltaRow * effectiveStepsThisTurn;
        const presentCol = initialCol + chosenDeltaCol * effectiveStepsThisTurn;

        const positionKey = `${presentRow},${presentCol}`;
        if (occupiedCoordinates.has(positionKey)) {
          return false;
        }
        occupiedCoordinates.add(positionKey);
      }
    }

    return true;
  }

  function exploreMoveCombinations(
    currentPieceIndex,
    accumulatedDirectionVectors,
    accumulatedStepCounts,
  ) {
    if (currentPieceIndex === numberOfPieces) {
      return verifyNoCollisions(
        accumulatedDirectionVectors,
        accumulatedStepCounts,
      )
        ? 1
        : 0;
    }

    let totalPossibleCombinations = 0;
    const [startRow, startCol] = positions[currentPieceIndex];
    const pieceSpecificVectors =
      pieceMovementVectors[pieces[currentPieceIndex]];

    // Option 1: Piece stays put
    totalPossibleCombinations += exploreMoveCombinations(
      currentPieceIndex + 1,
      [...accumulatedDirectionVectors, [0, 0]],
      [...accumulatedStepCounts, 0],
    );

    // Option 2: Piece moves in various directions
    for (const [deltaR, deltaC] of pieceSpecificVectors) {
      let currentRow = startRow;
      let currentCol = startCol;
      let stepsTaken = 0;

      while (isWithinBoardBounds(currentRow + deltaR, currentCol + deltaC)) {
        currentRow += deltaR;
        currentCol += deltaC;
        stepsTaken++;
        totalPossibleCombinations += exploreMoveCombinations(
          currentPieceIndex + 1,
          [...accumulatedDirectionVectors, [deltaR, deltaC]],
          [...accumulatedStepCounts, stepsTaken],
        );
      }
    }

    return totalPossibleCombinations;
  }

  return exploreMoveCombinations(0, [], []);
};
