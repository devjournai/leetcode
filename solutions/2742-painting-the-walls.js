/**
 * Painting The Walls
 * Intuition: This problem can be modeled as a dynamic programming problem. We need to decide for each wall whether to paint it with a paid painter or not. The key insight is that when a paid painter paints a wall, they take `time[i]` units of time, during which a free painter can paint `time[i]` *additional* walls. So, painting wall `i` with the paid painter effectively covers `time[i] + 1` walls (the current wall + `time[i]` free walls) at a cost of `cost[i]`. The goal is to cover `n` walls with minimum cost.
 * Approach:
 * 1. Initialize a 2D DP table, `minCostTable`, of size `(n + 1) x (n + 1)`. `minCostTable[i][j]` will store the minimum cost to paint `j` walls considering the first `i` walls as options for the paid painter.
 * 2. Fill the `minCostTable` with a large value (infinity) to represent unreachable states. Set `minCostTable[0][0] = 0`, as painting 0 walls with 0 options costs 0.
 * 3. Iterate through each wall from `0` to `n - 1` using an outer loop (`wallConsideration`).
 * 4. For each `wallConsideration`, iterate through all possible numbers of walls already covered, from `0` to `n` using an inner loop (`coveredQuantity`).
 * 5. Inside the inner loop, if `minCostTable[wallConsideration][coveredQuantity]` is infinity, skip this state as it's unreachable.
 * 6. Consider two choices for the current `wallConsideration`:
 *    a. **Don't paint the current wall with the paid painter**: The cost and number of walls covered remain the same. Update `minCostTable[wallConsideration + 1][coveredQuantity]` with the minimum of its current value and `minCostTable[wallConsideration][coveredQuantity]`.
 *    b. **Paint the current wall with the paid painter**: The cost increases by `wallCosts[wallConsideration]`. The number of walls covered increases by `wallTimes[wallConsideration] + 1` (1 for the current wall, `wallTimes[wallConsideration]` for free walls). Calculate `nextWallsToCoverCount = Math.min(totalWallsCount, coveredQuantity + wallTimes[wallConsideration] + 1)`. Update `minCostTable[wallConsideration + 1][nextWallsToCoverCount]` with the minimum of its current value and `minCostTable[wallConsideration][coveredQuantity] + wallCosts[wallConsideration]`.
 * 7. After iterating through all walls, the minimum cost to paint `n` walls will be `minCostTable[n][n]`.
 * Dry Run:
 * Input: `wallCosts = [1, 2, 3]`, `wallTimes = [1, 2, 3]`
 * `totalWallsCount = 3`. `minCostTable` is 4x4.
 * Initialize `minCostTable[0][0] = 0`, others `Infinity`.
 *
 * `wallConsideration = 0` (cost=1, time=1):
 *   `coveredQuantity = 0` (`minCostTable[0][0]=0`):
 *     - Option A (skip): `minCostTable[1][0] = min(Inf, 0) = 0`.
 *     - Option B (paint): `nextWallsToCoverCount = min(3, 0 + 1 + 1) = 2`. `minCostTable[1][2] = min(Inf, 0 + 1) = 1`.
 *   `minCostTable` after wall 0: `[1][0]=0, [1][2]=1`.
 *
 * `wallConsideration = 1` (cost=2, time=2):
 *   `coveredQuantity = 0` (`minCostTable[1][0]=0`):
 *     - Option A (skip): `minCostTable[2][0] = min(Inf, 0) = 0`.
 *     - Option B (paint): `nextWallsToCoverCount = min(3, 0 + 2 + 1) = 3`. `minCostTable[2][3] = min(Inf, 0 + 2) = 2`.
 *   `coveredQuantity = 2` (`minCostTable[1][2]=1`):
 *     - Option A (skip): `minCostTable[2][2] = min(Inf, 1) = 1`.
 *     - Option B (paint): `nextWallsToCoverCount = min(3, 2 + 2 + 1) = 3`. `minCostTable[2][3] = min(2, 1 + 2) = 2`.
 *   `minCostTable` after wall 1: `[2][0]=0, [2][2]=1, [2][3]=2`.
 *
 * `wallConsideration = 2` (cost=3, time=3):
 *   `coveredQuantity = 0` (`minCostTable[2][0]=0`):
 *     - Option A (skip): `minCostTable[3][0] = min(Inf, 0) = 0`.
 *     - Option B (paint): `nextWallsToCoverCount = min(3, 0 + 3 + 1) = 3`. `minCostTable[3][3] = min(Inf, 0 + 3) = 3`.
 *   `coveredQuantity = 2` (`minCostTable[2][2]=1`):
 *     - Option A (skip): `minCostTable[3][2] = min(Inf, 1) = 1`.
 *     - Option B (paint): `nextWallsToCoverCount = min(3, 2 + 3 + 1) = 3`. `minCostTable[3][3] = min(3, 1 + 3) = 3`.
 *   `coveredQuantity = 3` (`minCostTable[2][3]=2`):
 *     - Option A (skip): `minCostTable[3][3] = min(3, 2) = 2`.
 *     - Option B (paint): `nextWallsToCoverCount = min(3, 3 + 3 + 1) = 3`. `minCostTable[3][3] = min(2, 2 + 3) = 2`.
 *
 * Final Result: `minCostTable[3][3] = 2`.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var paintWalls = function (cost, time) {
  const totalWallsCount = cost.length;
  const minCostTable = new Array(totalWallsCount + 1)
    .fill()
    .map(() => new Array(totalWallsCount + 1).fill(Infinity));
  const infinityValue = Infinity; // Using a distinct variable for Infinity

  minCostTable[0][0] = 0;

  const wallCosts = cost;
  const wallTimes = time;

  for (
    let wallConsideration = 0;
    wallConsideration < totalWallsCount;
    wallConsideration++
  ) {
    for (
      let coveredQuantity = 0;
      coveredQuantity <= totalWallsCount;
      coveredQuantity++
    ) {
      if (minCostTable[wallConsideration][coveredQuantity] === infinityValue) {
        continue;
      }

      // Option 1: Do NOT paint the current wall with the paid painter
      // The cost remains the same, and the number of walls covered also remains the same.
      minCostTable[wallConsideration + 1][coveredQuantity] = Math.min(
        minCostTable[wallConsideration + 1][coveredQuantity],
        minCostTable[wallConsideration][coveredQuantity]
      );

      // Option 2: Paint the current wall with the paid painter
      // The cost increases by wallCosts[wallConsideration].
      // The number of walls covered increases by 1 (for the current wall) + wallTimes[wallConsideration] (for free walls).
      const nextWallsToCoverCount = Math.min(
        totalWallsCount,
        coveredQuantity + wallTimes[wallConsideration] + 1
      );
      minCostTable[wallConsideration + 1][nextWallsToCoverCount] = Math.min(
        minCostTable[wallConsideration + 1][nextWallsToCoverCount],
        minCostTable[wallConsideration][coveredQuantity] +
          wallCosts[wallConsideration]
      );
    }
  }

  return minCostTable[totalWallsCount][totalWallsCount];
};
