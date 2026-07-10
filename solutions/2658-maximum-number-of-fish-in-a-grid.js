/**
 * Maximum Number Of Fish In A Grid
 * Intuition: The problem asks for the largest sum of fish in a connected component of water cells. This is a classic graph traversal problem (specifically, finding connected components and their sums) on a 2D grid.
 * Approach: 1. Initialize a variable `overallMaxFish` to keep track of the maximum fish found across all ponds. 2. Iterate through each cell of the grid using nested `for` loops. 3. If a cell contains fish (its value is greater than 0), it signifies the start of a new, unexplored pond. From this cell, initiate a Depth First Search (DFS) traversal. 4. The DFS helper function (`explorePond`) calculates the total fish in the current connected pond. It does this by summing the fish in the current cell and then recursively calling itself for all valid, unvisited adjacent water cells. Crucially, it marks each visited cell as 0 (land) to prevent re-visiting and recounting, ensuring each fish is counted exactly once per pond and avoiding infinite loops. 5. After the DFS completes for a pond, `overallMaxFish` is updated with the maximum between its current value and the total fish harvested from the just-explored pond. 6. After the nested loops have processed every cell in the grid, `overallMaxFish` will hold the maximum number of fish a fisher can catch from any optimal starting cell.
 * Dry Run: grid = [[0, 2, 1], [4, 0, 0], [1, 0, 3]]
 * 1. Initialize `overallMaxFish = 0`.
 * 2. Determine `gridRows = 3`, `gridCols = 3`.
 * 3. Outer loops begin:
 *    - (rowIterator=0, colIterator=0): `grid[0][0]` is 0. Skip.
 *    - (rowIterator=0, colIterator=1): `grid[0][1]` is 2 (>0). Call `explorePond(0, 1)`.
 *        - `explorePond(0, 1)` execution:
 *            - `fishCountHere` initialized to `grid[0][1]` which is 2.
 *            - `grid[0][1]` is set to 0. Grid state: `[[0, 0, 1], [4, 0, 0], [1, 0, 3]]`.
 *            - Recursive call `explorePond(0, 2)` for right neighbor:
 *                - `explorePond(0, 2)`: `fishCountHere` is 1. `grid[0][2]` becomes 0. Grid state: `[[0, 0, 0], [4, 0, 0], [1, 0, 3]]`. All its neighbors are out-of-bounds or 0. Returns 1.
 *            - Recursive calls for other neighbors (up, left, down) return 0 (out of bounds or already 0).
 *            - `explorePond(0, 1)` returns `2 + 1 + 0 + 0 + 0 = 3`.
 *    - Back in main loop: `currentPondHarvest = 3`. `overallMaxFish = Math.max(0, 3) = 3`.
 *    - (rowIterator=0, colIterator=2): `grid[0][2]` is 0 (already visited/set to 0). Skip.
 *    - (rowIterator=1, colIterator=0): `grid[1][0]` is 4 (>0). Call `explorePond(1, 0)`.
 *        - `explorePond(1, 0)` execution:
 *            - `fishCountHere` initialized to `grid[1][0]` which is 4.
 *            - `grid[1][0]` is set to 0. Grid state: `[[0, 0, 0], [0, 0, 0], [1, 0, 3]]`.
 *            - All its neighbors are out-of-bounds or 0. Returns 4.
 *    - Back in main loop: `currentPondHarvest = 4`. `overallMaxFish = Math.max(3, 4) = 4`.
 *    - (rowIterator=1, colIterator=1): `grid[1][1]` is 0. Skip.
 *    - (rowIterator=1, colIterator=2): `grid[1][2]` is 0. Skip.
 *    - (rowIterator=2, colIterator=0): `grid[2][0]` is 1 (>0). Call `explorePond(2, 0)`.
 *        - `explorePond(2, 0)` execution:
 *            - `fishCountHere` initialized to `grid[2][0]` which is 1.
 *            - `grid[2][0]` is set to 0. Grid state: `[[0, 0, 0], [0, 0, 0], [0, 0, 3]]`.
 *            - All its neighbors are out-of-bounds or 0. Returns 1.
 *    - Back in main loop: `currentPondHarvest = 1`. `overallMaxFish = Math.max(4, 1) = 4`.
 *    - (rowIterator=2, colIterator=1): `grid[2][1]` is 0. Skip.
 *    - (rowIterator=2, colIterator=2): `grid[2][2]` is 3 (>0). Call `explorePond(2, 2)`.
 *        - `explorePond(2, 2)` execution:
 *            - `fishCountHere` initialized to `grid[2][2]` which is 3.
 *            - `grid[2][2]` is set to 0. Grid state: `[[0, 0, 0], [0, 0, 0], [0, 0, 0]]`.
 *            - All its neighbors are out-of-bounds or 0. Returns 3.
 *    - Back in main loop: `currentPondHarvest = 3`. `overallMaxFish = Math.max(4, 3) = 4`.
 * 4. All cells have been iterated through.
 * 5. Return `overallMaxFish` which is 4.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var findMaxFish = function (grid) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;
  let overallMaxFish = 0;

  const explorePond = (currentR, currentC) => {
    if (
      currentR < 0 ||
      currentR >= gridRows ||
      currentC < 0 ||
      currentC >= gridCols ||
      grid[currentR][currentC] === 0
    ) {
      return 0;
    }

    let fishCountHere = grid[currentR][currentC];
    grid[currentR][currentC] = 0;

    fishCountHere += explorePond(currentR + 1, currentC);
    fishCountHere += explorePond(currentR, currentC + 1);
    fishCountHere += explorePond(currentR - 1, currentC);
    fishCountHere += explorePond(currentR, currentC - 1);

    return fishCountHere;
  };

  for (let rowIterator = 0; rowIterator < gridRows; rowIterator++) {
    for (let colIterator = 0; colIterator < gridCols; colIterator++) {
      if (grid[rowIterator][colIterator] > 0) {
        let currentPondHarvest = explorePond(rowIterator, colIterator);
        overallMaxFish = Math.max(overallMaxFish, currentPondHarvest);
      }
    }
  }

  return overallMaxFish;
};
