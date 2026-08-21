/**
 * Escape The Spreading Fire
 * Intuition: The problem asks for the maximum delay before moving, which implies a monotonic property: if a delay `D` allows reaching the safehouse, any delay `D' < D` also allows it. This monotonicity enables binary search on the possible delay values.
 * Approach: 1. Implement a helper function `checkReachability(delayDuration)` that determines if it's possible to reach the safehouse safely after `delayDuration` minutes. 2. `checkReachability` itself relies on two Breadth-First Search (BFS) traversals. The first BFS (`calculateFireSpreadTimes`) computes the minimum time for fire to reach every grass cell, considering multiple initial fire sources. 3. The second BFS (`simulatePersonPath`) then simulates the person's movement starting at `(0,0)` after `delayDuration` minutes. A cell `(r, c)` can be entered at `personArrivalTime` if `personArrivalTime` is strictly less than `fireArrivalTime[r][c]`. A special condition applies to the safehouse `(m-1, n-1)`: it can be entered if `personArrivalTime` is less than or *equal to* `fireArrivalTime[m-1][n-1]`. 4. The main function performs a binary search for `delayDuration` in the range `[0, 10^9]`. If `checkReachability(midDelay)` returns true, it means `midDelay` is achievable, so we try for a larger delay (move `lowDelayBound = midDelay + 1`) and update our potential answer. Otherwise, `midDelay` is too long, and we must reduce it (move `highDelayBound = midDelay - 1`).
 * Dry Run:
 * grid = [[0,2,0,0,0,0,0],[0,0,0,2,2,1,0],[0,2,0,0,1,2,0],[0,0,2,2,2,0,2],[0,0,0,0,0,0,0]]
 * m=5, n=7. Starting point: (0,0). Safehouse: (4,6). Initial fires at (1,5) and (2,4).
 *
 * Binary search for `delayDuration`:
 * Initialize `binarySearchLow = 0`, `binarySearchHigh = 1000000000`, `finalAchievedDelay = -1`.
 *
 * Iteration 1: `middleAttemptDelay = (0 + 10^9) / 2 = 500000000`.
 * `checkReachability(500000000)`:
 *   `calculateFireSpreadTimes`: This BFS determines when fire reaches each cell.
 *     e.g., `fireArrivalTimes[1][5] = 0`, `fireArrivalTimes[2][4] = 0`.
 *     `fireArrivalTimes[0][0]` will be `Infinity`. `fireArrivalTimes[4][6]` will be some finite value (e.g., 6 after spreading).
 *   `simulatePersonPath(500000000, fireArrivalTimes)`:
 *     First, check if `delayDuration >= fireArrivalTimes[0][0]`. Since `fireArrivalTimes[0][0]` is `Infinity`, `500000000 >= Infinity` is false. Continue.
 *     Person starts at `(0,0)` at time `500000000`.
 *     Any path from `(0,0)` to `(4,6)` takes at least `m-1 + n-1 = 4+6 = 10` steps.
 *     So, minimum arrival time at `(4,6)` for person is `500000000 + 10 = 500000010`.
 *     Since `fireArrivalTimes[4][6]` is small (e.g., 6), `500000010 > 6`. The safehouse is engulfed long before the person arrives.
 *     `simulatePersonPath` will return `false`.
 * `checkReachability(500000000)` returns `false`.
 *   Update: `binarySearchHigh = 500000000 - 1 = 499999999`.
 *
 * Iterations continue reducing `binarySearchHigh`.
 * Let's assume after several iterations, we reach:
 * `binarySearchLow = 0`, `binarySearchHigh = 3`. `finalAchievedDelay = -1` (or some previously found value).
 *
 * Iteration k: `middleAttemptDelay = (0 + 3) / 2 = 1`.
 * `checkReachability(1)`:
 *   `calculateFireSpreadTimes`: Same `fireArrivalTimes` as before.
 *   `simulatePersonPath(1, fireArrivalTimes)`:
 *     First, check `1 >= fireArrivalTimes[0][0]`. Assume `fireArrivalTimes[0][0]` is `Infinity`. `1 >= Infinity` is false. Continue.
 *     Person starts at `(0,0)` at time `1`.
 *     Let's trace a path: `(0,0)` at `t=1`.
 *     Move to `(1,0)` at `t=2`. Check `fireArrivalTimes[1][0]`. Assume it's `Infinity` or sufficiently large (e.g., 5). `2 < 5`. Valid.
 *     ...
 *     Suppose person reaches `(4,6)` at `personArrivalTime = 1 + pathLength = 1 + 10 = 11`.
 *     Assume `fireArrivalTimes[4][6]` is 6.
 *     Check safehouse condition: `11 <= 6` is `false`. So this path fails.
 *     If `simulatePersonPath` cannot find *any* path where person arrival `T_p` satisfies `T_p < T_f` for intermediate cells and `T_p <= T_f` for safehouse, it returns `false`.
 * Let's assume `checkReachability(1)` returns `false` in this specific example (actual fire spread might be different).
 *   Update: `binarySearchHigh = 1 - 1 = 0`.
 *
 * Iteration k+1: `binarySearchLow = 0`, `binarySearchHigh = 0`. `middleAttemptDelay = (0 + 0) / 2 = 0`.
 * `checkReachability(0)`:
 *   `calculateFireSpreadTimes`: Same `fireArrivalTimes`.
 *   `simulatePersonPath(0, fireArrivalTimes)`:
 *     First, check `0 >= fireArrivalTimes[0][0]`. Assume `fireArrivalTimes[0][0]` is `Infinity`. `0 >= Infinity` is false. Continue.
 *     Person starts at `(0,0)` at time `0`.
 *     Assume `fireArrivalTimes[4][6]` is 6.
 *     Person reaches `(4,6)` at `personArrivalTime = 0 + pathLength = 10`.
 *     Check safehouse: `10 <= 6` is `false`. Returns `false`.
 *   Update: `binarySearchHigh = 0 - 1 = -1`.
 *
 * Loop condition `binarySearchLow <= binarySearchHigh` becomes `0 <= -1` which is false. Loop terminates.
 * `finalAchievedDelay` is still `-1`.
 * Return `-1`. (This outcome for the dry run is consistent with a potentially impossible escape).
 *
 * Time Complexity: O(M * N * log(MAX_DELAY_VALUE))
 * Space Complexity: O(M * N)
 */
var maximumMinutes = function (grid) {
  const numberOfRows = grid.length;
  const numberOfColumns = grid[0].length;
  const movementDeltas = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const maximumPossibleResult = 1000000000;

  function isValidLocation(
    checkLocationRow,
    checkLocationColumn,
    rowsTotal,
    columnsTotal,
    currentGridReference
  ) {
    return (
      checkLocationRow >= 0 &&
      checkLocationRow < rowsTotal &&
      checkLocationColumn >= 0 &&
      checkLocationColumn < columnsTotal &&
      currentGridReference[checkLocationRow][checkLocationColumn] !== 2
    );
  }

  function calculateFireSpreadTimes() {
    const fireArrivalTimes = new Array(numberOfRows)
      .fill(null)
      .map(() => new Array(numberOfColumns).fill(Infinity));
    const fireFrontier = [];

    for (let gridRowIndex = 0; gridRowIndex < numberOfRows; gridRowIndex++) {
      for (
        let gridColumnIndex = 0;
        gridColumnIndex < numberOfColumns;
        gridColumnIndex++
      ) {
        if (grid[gridRowIndex][gridColumnIndex] === 1) {
          fireFrontier.push([gridRowIndex, gridColumnIndex, 0]);
          fireArrivalTimes[gridRowIndex][gridColumnIndex] = 0;
        }
      }
    }

    let firePointer = 0;
    while (firePointer < fireFrontier.length) {
      const [
        currentFireCoordinateRow,
        currentFireCoordinateColumn,
        currentFireCoordinateTime,
      ] = fireFrontier[firePointer++];

      for (const [
        deltaCoordinateRow,
        deltaCoordinateColumn,
      ] of movementDeltas) {
        const nextFireCoordinateRow =
          currentFireCoordinateRow + deltaCoordinateRow;
        const nextFireCoordinateColumn =
          currentFireCoordinateColumn + deltaCoordinateColumn;

        if (
          isValidLocation(
            nextFireCoordinateRow,
            nextFireCoordinateColumn,
            numberOfRows,
            numberOfColumns,
            grid
          ) &&
          fireArrivalTimes[nextFireCoordinateRow][nextFireCoordinateColumn] ===
            Infinity
        ) {
          fireArrivalTimes[nextFireCoordinateRow][nextFireCoordinateColumn] =
            currentFireCoordinateTime + 1;
          fireFrontier.push([
            nextFireCoordinateRow,
            nextFireCoordinateColumn,
            currentFireCoordinateTime + 1,
          ]);
        }
      }
    }

    return fireArrivalTimes;
  }

  function checkReachability(delayDuration) {
    const firePropagationTimes = calculateFireSpreadTimes();
    const personPathVisited = new Array(numberOfRows)
      .fill(null)
      .map(() => new Array(numberOfColumns).fill(false));
    const personMoveQueue = [];

    if (grid[0][0] === 2) {
      return false;
    }

    if (delayDuration >= firePropagationTimes[0][0]) {
      return false;
    }

    personMoveQueue.push([0, 0, delayDuration]);
    personPathVisited[0][0] = true;

    let personPointer = 0;
    while (personPointer < personMoveQueue.length) {
      const [
        currentPersonCoordinateRow,
        currentPersonCoordinateColumn,
        currentPersonCurrentTravelTime,
      ] = personMoveQueue[personPointer++];

      for (const [deltaPersonRow, deltaPersonColumn] of movementDeltas) {
        const nextPersonCoordinateRow =
          currentPersonCoordinateRow + deltaPersonRow;
        const nextPersonCoordinateColumn =
          currentPersonCoordinateColumn + deltaPersonColumn;

        if (
          !isValidLocation(
            nextPersonCoordinateRow,
            nextPersonCoordinateColumn,
            numberOfRows,
            numberOfColumns,
            grid
          ) ||
          personPathVisited[nextPersonCoordinateRow][nextPersonCoordinateColumn]
        ) {
          continue;
        }

        const nextPersonTravelTime = currentPersonCurrentTravelTime + 1;

        if (
          nextPersonCoordinateRow === numberOfRows - 1 &&
          nextPersonCoordinateColumn === numberOfColumns - 1
        ) {
          if (
            nextPersonTravelTime <=
            firePropagationTimes[nextPersonCoordinateRow][
              nextPersonCoordinateColumn
            ]
          ) {
            return true;
          }
        } else {
          if (
            nextPersonTravelTime <
            firePropagationTimes[nextPersonCoordinateRow][
              nextPersonCoordinateColumn
            ]
          ) {
            personPathVisited[nextPersonCoordinateRow][
              nextPersonCoordinateColumn
            ] = true;
            personMoveQueue.push([
              nextPersonCoordinateRow,
              nextPersonCoordinateColumn,
              nextPersonTravelTime,
            ]);
          }
        }
      }
    }

    return false;
  }

  let binarySearchLow = 0;
  let binarySearchHigh = maximumPossibleResult;
  let finalAchievedDelay = -1;

  while (binarySearchLow <= binarySearchHigh) {
    const middleAttemptDelay = Math.floor(
      (binarySearchLow + binarySearchHigh) / 2
    );

    if (checkReachability(middleAttemptDelay)) {
      finalAchievedDelay = middleAttemptDelay;
      binarySearchLow = middleAttemptDelay + 1;
    } else {
      binarySearchHigh = middleAttemptDelay - 1;
    }
  }

  return finalAchievedDelay;
};
