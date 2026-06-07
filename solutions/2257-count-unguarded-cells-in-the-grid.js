/**
 * Count Unguarded Cells In The Grid
 * Intuition: The problem requires identifying cells visible to guards, which are blocked by walls or other guards. A direct simulation of guard vision on a grid representing cell states is a natural approach.
 * Approach: 1. Initialize an m x n grid with a default state (0 for unguarded). 2. Populate the grid by marking wall locations with a specific value (1) and guard locations with another (2). 3. For each guard, simulate its line of sight in the four cardinal directions (north, east, south, west). During this simulation, if an empty cell (state 0) is encountered before a wall or another guard, mark it as "guarded" (3). Stop the line-of-sight scan when a wall or another guard is met, as they obstruct vision. 4. After processing all guards, iterate through the entire grid and count all cells that are still in the initial "unguarded" state (0).
 * Dry Run: m = 4, n = 4, guards = [[0,0]], walls = [[0,1], [2,2]]
 * Initial grid (0s):
 * 0 0 0 0
 * 0 0 0 0
 * 0 0 0 0
 * 0 0 0 0
 *
 * After placing walls (1) and guards (2):
 * 2 1 0 0
 * 0 0 0 0
 * 0 0 1 0
 * 0 0 0 0
 *
 * Process guard at [0,0]:
 * - North: No cells to the north.
 * - East: Cell [0,1] is a wall (1). Vision blocked.
 * - South:
 *   - Cell [1,0] is 0 -> mark 3. Grid: [1,0]=3
 *   - Cell [2,0] is 0 -> mark 3. Grid: [2,0]=3
 *   - Cell [3,0] is 0 -> mark 3. Grid: [3,0]=3
 * - West: No cells to the west.
 *
 * Grid after processing guard [0,0]:
 * 2 1 0 0
 * 3 0 0 0
 * 3 0 1 0
 * 3 0 0 0
 *
 * Final count of cells with value 0:
 * [0,2], [0,3]
 * [1,1], [1,2], [1,3]
 * [2,1], [2,3]
 * [3,1], [3,2], [3,3]
 * Total 10 unguarded cells.
 * Time Complexity: O(m * n + G * (m + n))
 * Space Complexity: O(m * n)
 */
var countUnguarded = function (m, n, guards, walls) {
  const gridState = Array.from({ length: m }, () => Array(n).fill(0));

  for (const currentWallCoord of walls) {
    const wallX = currentWallCoord[0];
    const wallY = currentWallCoord[1];
    gridState[wallX][wallY] = 1;
  }

  for (const currentGuardCoord of guards) {
    const guardX = currentGuardCoord[0];
    const guardY = currentGuardCoord[1];
    gridState[guardX][guardY] = 2;
  }

  for (const iteratingGuardCoord of guards) {
    const guardCurrentRow = iteratingGuardCoord[0];
    const guardCurrentCol = iteratingGuardCoord[1];

    for (
      let northTravelRow = guardCurrentRow - 1;
      northTravelRow >= 0;
      northTravelRow--
    ) {
      if (
        gridState[northTravelRow][guardCurrentCol] === 1 ||
        gridState[northTravelRow][guardCurrentCol] === 2
      ) {
        break;
      }
      if (gridState[northTravelRow][guardCurrentCol] === 0) {
        gridState[northTravelRow][guardCurrentCol] = 3;
      }
    }

    for (
      let southTravelRow = guardCurrentRow + 1;
      southTravelRow < m;
      southTravelRow++
    ) {
      if (
        gridState[southTravelRow][guardCurrentCol] === 1 ||
        gridState[southTravelRow][guardCurrentCol] === 2
      ) {
        break;
      }
      if (gridState[southTravelRow][guardCurrentCol] === 0) {
        gridState[southTravelRow][guardCurrentCol] = 3;
      }
    }

    for (
      let westTravelCol = guardCurrentCol - 1;
      westTravelCol >= 0;
      westTravelCol--
    ) {
      if (
        gridState[guardCurrentRow][westTravelCol] === 1 ||
        gridState[guardCurrentRow][westTravelCol] === 2
      ) {
        break;
      }
      if (gridState[guardCurrentRow][westTravelCol] === 0) {
        gridState[guardCurrentRow][westTravelCol] = 3;
      }
    }

    for (
      let eastTravelCol = guardCurrentCol + 1;
      eastTravelCol < n;
      eastTravelCol++
    ) {
      if (
        gridState[guardCurrentRow][eastTravelCol] === 1 ||
        gridState[guardCurrentRow][eastTravelCol] === 2
      ) {
        break;
      }
      if (gridState[guardCurrentRow][eastTravelCol] === 0) {
        gridState[guardCurrentRow][eastTravelCol] = 3;
      }
    }
  }

  let unguardedCellTally = 0;
  for (let finalRowIndex = 0; finalRowIndex < m; finalRowIndex++) {
    for (let finalColIndex = 0; finalColIndex < n; finalColIndex++) {
      if (gridState[finalRowIndex][finalColIndex] === 0) {
        unguardedCellTally++;
      }
    }
  }

  return unguardedCellTally;
};
