/**
 * Where Will The Ball Fall
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
