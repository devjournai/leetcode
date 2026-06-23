/**
 * Paths In Matrix Whose Sum Is Divisible By K
 * Intuition: The problem asks for the count of paths whose sum modulo K is 0. Since we only care about the remainder of the sum at each step, dynamic programming can be used. The state needs to capture not just the current cell coordinates but also the remainder of the path sum up to that point.
 * Approach: 1. Initialize a 3D DP array `dp[row][col][remainder]` to store the number of paths from `(0,0)` to `(row,col)` such that the sum of elements along the path modulo `k` equals `remainder`. All values are initialized to 0.
 * 2. Set the base case: `dp[0][0][grid[0][0] % k] = 1`, as there's one path to the starting cell `(0,0)` with its value's remainder.
 * 3. Iterate through each cell `(r, c)` in the grid from `(0,0)` to `(m-1, n-1)`.
 * 4. For each cell `(r, c)`, iterate through all possible remainders `currentRemainder` from `0` to `k-1`.
 * 5. To calculate `dp[r][c][currentRemainder]`, consider paths coming from the cell above `(r-1, c)` and the cell to the left `(r, c-1)`.
 *    a. If `r > 0` (not the first row), calculate the `previousRemainderFromAbove` such that `(previousRemainderFromAbove + grid[r][c]) % k == currentRemainder`. The formula is `previousRemainderFromAbove = (currentRemainder - (grid[r][c] % k) + k) % k`. Add `dp[r-1][c][previousRemainderFromAbove]` to `dp[r][c][currentRemainder]`.
 *    b. If `c > 0` (not the first column), calculate `previousRemainderFromLeft` similarly: `previousRemainderFromLeft = (currentRemainder - (grid[r][c] % k) + k) % k`. Add `dp[r][c-1][previousRemainderFromLeft]` to `dp[r][c][currentRemainder]`.
 * 6. Ensure all additions are performed modulo `10^9 + 7`. For the starting cell `(0,0)`, the `if` conditions will prevent any values from being added, thus preserving the base case initialization.
 * 7. The final answer is `dp[m-1][n-1][0]`, representing the number of paths to the bottom-right cell whose sum is divisible by `k` (i.e., has a remainder of 0).
 * Dry Run: grid = [[5,2],[4,3]], k = 3
 * numRows = 2, numCols = 2, pathModulo = 1e9 + 7
 * dp = Array(2).fill(Array(2).fill(Array(3).fill(0)))
 * initialValueRemainder = 5 % 3 = 2
 * dp[0][0][2] = 1
 *
 * Loop currentGridRow from 0 to 1:
 *   Loop currentGridCol from 0 to 1:
 *
 *   currentGridRow = 0, currentGridCol = 0: (Base case already handled; loops below will correctly not modify dp[0][0] from its base state).
 *     cellValueRemainder = grid[0][0] % 3 = 2
 *     Loop targetPathRemainder from 0 to 2:
 *       dp[0][0][targetPathRemainder] = (dp[0][0][targetPathRemainder] + 0) % pathModulo (since if conditions are false)
 *     dp[0][0] remains [0, 0, 1]
 *
 *   currentGridRow = 0, currentGridCol = 1: (grid[0][1] = 2)
 *     cellValueRemainder = grid[0][1] % 3 = 2
 *     Loop targetPathRemainder from 0 to 2:
 *       dp[0][1][targetPathRemainder] initially 0.
 *       if (0 > 0) false.
 *       if (1 > 0) true:
 *         remainderRequiredForLeft = (targetPathRemainder - 2 + 3) % 3
 *         pathsComingFromLeft = dp[0][0][remainderRequiredForLeft]
 *         dp[0][1][targetPathRemainder] = (0 + pathsComingFromLeft) % pathModulo
 *       targetPathRemainder = 0: remainderRequiredForLeft = (0 - 2 + 3) % 3 = 1. dp[0][0][1] = 0. So dp[0][1][0] = 0.
 *       targetPathRemainder = 1: remainderRequiredForLeft = (1 - 2 + 3) % 3 = 2. dp[0][0][2] = 1. So dp[0][1][1] = 1.
 *       targetPathRemainder = 2: remainderRequiredForLeft = (2 - 2 + 3) % 3 = 0. dp[0][0][0] = 0. So dp[0][1][2] = 0.
 *     dp[0][1] becomes [0, 1, 0]
 *
 *   currentGridRow = 1, currentGridCol = 0: (grid[1][0] = 4)
 *     cellValueRemainder = grid[1][0] % 3 = 1
 *     Loop targetPathRemainder from 0 to 2:
 *       dp[1][0][targetPathRemainder] initially 0.
 *       if (1 > 0) true:
 *         remainderRequiredForUp = (targetPathRemainder - 1 + 3) % 3
 *         pathsComingFromUp = dp[0][0][remainderRequiredForUp]
 *         dp[1][0][targetPathRemainder] = (0 + pathsComingFromUp) % pathModulo
 *       if (0 > 0) false.
 *       targetPathRemainder = 0: remainderRequiredForUp = (0 - 1 + 3) % 3 = 2. dp[0][0][2] = 1. So dp[1][0][0] = 1.
 *       targetPathRemainder = 1: remainderRequiredForUp = (1 - 1 + 3) % 3 = 0. dp[0][0][0] = 0. So dp[1][0][1] = 0.
 *       targetPathRemainder = 2: remainderRequiredForUp = (2 - 1 + 3) % 3 = 1. dp[0][0][1] = 0. So dp[1][0][2] = 0.
 *     dp[1][0] becomes [1, 0, 0]
 *
 *   currentGridRow = 1, currentGridCol = 1: (grid[1][1] = 3)
 *     cellValueRemainder = grid[1][1] % 3 = 0
 *     Loop targetPathRemainder from 0 to 2:
 *       dp[1][1][targetPathRemainder] initially 0.
 *       pathsAccumulator = 0
 *       if (1 > 0) true:
 *         remainderRequiredForUp = (targetPathRemainder - 0 + 3) % 3 = targetPathRemainder
 *         pathsComingFromUp = dp[0][1][remainderRequiredForUp]
 *         pathsAccumulator = (pathsAccumulator + pathsComingFromUp) % pathModulo
 *       if (1 > 0) true:
 *         remainderRequiredForLeft = (targetPathRemainder - 0 + 3) % 3 = targetPathRemainder
 *         pathsComingFromLeft = dp[1][0][remainderRequiredForLeft]
 *         pathsAccumulator = (pathsAccumulator + pathsComingFromLeft) % pathModulo
 *       dp[1][1][targetPathRemainder] = pathsAccumulator
 *
 *       targetPathRemainder = 0:
 *         pathsComingFromUp = dp[0][1][0] = 0. pathsAccumulator = 0.
 *         pathsComingFromLeft = dp[1][0][0] = 1. pathsAccumulator = (0 + 1) % pathModulo = 1.
 *         dp[1][1][0] = 1.
 *       targetPathRemainder = 1:
 *         pathsComingFromUp = dp[0][1][1] = 1. pathsAccumulator = 1.
 *         pathsComingFromLeft = dp[1][0][1] = 0. pathsAccumulator = (1 + 0) % pathModulo = 1.
 *         dp[1][1][1] = 1.
 *       targetPathRemainder = 2:
 *         pathsComingFromUp = dp[0][1][2] = 0. pathsAccumulator = 0.
 *         pathsComingFromLeft = dp[1][0][2] = 0. pathsAccumulator = (0 + 0) % pathModulo = 0.
 *         dp[1][1][2] = 0.
 *     dp[1][1] becomes [1, 1, 0]
 *
 * Return dp[1][1][0] = 1.
 * Time Complexity: O(m * n * k)
 * Space Complexity: O(m * n * k)
 */
var numberOfPaths = function (grid, k) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const pathModulo = 1e9 + 7;

  const dynamicProgrammingTable = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => Array(k).fill(0)),
  );

  const initialGridValueRemainder = grid[0][0] % k;
  dynamicProgrammingTable[0][0][initialGridValueRemainder] = 1;

  for (let currentGridRow = 0; currentGridRow < numRows; currentGridRow++) {
    for (let currentGridCol = 0; currentGridCol < numCols; currentGridCol++) {
      const cellValueModuloK = grid[currentGridRow][currentGridCol] % k;

      for (
        let targetPathRemainder = 0;
        targetPathRemainder < k;
        targetPathRemainder++
      ) {
        let pathsAccumulator = 0;

        if (currentGridRow > 0) {
          const remainderRequiredForUp =
            (targetPathRemainder - cellValueModuloK + k) % k;
          const pathsComingFromUp =
            dynamicProgrammingTable[currentGridRow - 1][currentGridCol][
              remainderRequiredForUp
            ];
          pathsAccumulator =
            (pathsAccumulator + pathsComingFromUp) % pathModulo;
        }

        if (currentGridCol > 0) {
          const remainderRequiredForLeft =
            (targetPathRemainder - cellValueModuloK + k) % k;
          const pathsComingFromLeft =
            dynamicProgrammingTable[currentGridRow][currentGridCol - 1][
              remainderRequiredForLeft
            ];
          pathsAccumulator =
            (pathsAccumulator + pathsComingFromLeft) % pathModulo;
        }

        // For (0,0), pathsAccumulator will be 0.
        // We add pathsAccumulator to the existing DP value.
        // For (0,0) with initialGridValueRemainder, dp[0][0][initialGridValueRemainder] is 1, so (1+0)%M = 1.
        // For (0,0) with other targetPathRemainder, dp[0][0][otherRemainder] is 0, so (0+0)%M = 0.
        // This preserves the base case and correctly updates other cells.
        dynamicProgrammingTable[currentGridRow][currentGridCol][
          targetPathRemainder
        ] =
          (dynamicProgrammingTable[currentGridRow][currentGridCol][
            targetPathRemainder
          ] +
            pathsAccumulator) %
          pathModulo;
      }
    }
  }

  return dynamicProgrammingTable[numRows - 1][numCols - 1][0];
};
