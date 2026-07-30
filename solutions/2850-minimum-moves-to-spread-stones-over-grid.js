/**
 * Minimum Moves to Spread Stones Over Grid
 *
 * Intuition:
 * Every cell must finally contain exactly one stone.
 *
 * Cells with:
 *
 *      value > 1
 *
 * have extra stones that must be moved.
 *
 * Cells with:
 *
 *      value = 0
 *
 * need one stone.
 *
 * Since moving a stone to an adjacent cell costs one move, the cost of moving
 * a stone from:
 *
 *      (r1, c1)
 *
 * to
 *
 *      (r2, c2)
 *
 * is simply the Manhattan distance:
 *
 *      |r1 - r2| + |c1 - c2|
 *
 * The number of extra stones is at most 8, so we can try every possible
 * assignment of extra stones to empty cells using backtracking.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Collect all extra stones.
 *
 *      If a cell has x stones,
 *      it contributes (x - 1) extra stones.
 *
 * 2. Collect all empty cells.
 *
 * 3. Use DFS/backtracking.
 *
 *      For each empty cell:
 *
 *          Try assigning every unused extra stone.
 *
 *          Cost =
 *
 *              Manhattan distance
 *              +
 *              recursive cost
 *
 *      Keep the minimum.
 *
 * 4. Return the minimum total cost.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * grid =
 * [
 *   [1,1,0],
 *   [1,1,1],
 *   [1,2,1]
 * ]
 *
 * Extra stones:
 *
 *      [(2,1)]
 *
 * Empty cells:
 *
 *      [(0,2)]
 *
 * Distance:
 *
 *      |2-0| + |1-2|
 *      = 3
 *
 * Answer:
 *
 *      3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(m!)
 * Space Complexity: O(m)
 */

var minimumMoves = function (grid) {
  const extraStones = [];
  const emptyCells = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === 0) {
        emptyCells.push([row, col]);
      } else if (grid[row][col] > 1) {
        for (let count = 1; count < grid[row][col]; count++) {
          extraStones.push([row, col]);
        }
      }
    }
  }

  const used = new Array(extraStones.length).fill(false);

  const dfs = (index) => {
    if (index === emptyCells.length) {
      return 0;
    }

    let minimumCost = Infinity;

    const [targetRow, targetCol] = emptyCells[index];

    for (let i = 0; i < extraStones.length; i++) {
      if (used[i]) {
        continue;
      }

      used[i] = true;

      const [stoneRow, stoneCol] = extraStones[i];

      const distance =
        Math.abs(stoneRow - targetRow) + Math.abs(stoneCol - targetCol);

      minimumCost = Math.min(minimumCost, distance + dfs(index + 1));

      used[i] = false;
    }

    return minimumCost;
  };

  return dfs(0);
};
