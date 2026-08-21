/**
 * Where Will The Ball Fall
 * Intuition: A ball at column c follows the diagonal board cell. It falls through iff the neighbor it is directed into has the same slash (no V stuck); otherwise it is blocked.
 * Approach: 1. For each `initialColumn`, walk rows: `potentialNextColumn = col + grid[row][col]`. 2. If out of bounds or `grid[row][col] !== grid[row][next]`, set -1. 3. Store the landing column in `outcomeArray`.
 * Dry Run: grid = [[1,1,1,-1,-1]]
 * Ball 0: 0→1 same 1 → lands 1. Ball 2: 2 + 1 = 3 but grid[2]=1 ≠ grid[3]=-1 → -1.
 * Time Complexity: O(m * n)
 * Space Complexity: O(n)
 */
var findBall = function (grid) {
  const gridRowCount = grid.length;
  const gridColCount = grid[0].length;
  const outcomeArray = new Array(gridColCount);

  for (let initialColumn = 0; initialColumn < gridColCount; initialColumn++) {
    let currentBallColumn = initialColumn;

    for (
      let currentBallRow = 0;
      currentBallRow < gridRowCount;
      currentBallRow++
    ) {
      const potentialNextColumn =
        currentBallColumn + grid[currentBallRow][currentBallColumn];

      if (
        potentialNextColumn < 0 ||
        potentialNextColumn >= gridColCount ||
        grid[currentBallRow][currentBallColumn] !==
          grid[currentBallRow][potentialNextColumn]
      ) {
        currentBallColumn = -1;
        break;
      }

      currentBallColumn = potentialNextColumn;
    }

    outcomeArray[initialColumn] = currentBallColumn;
  }

  return outcomeArray;
};
