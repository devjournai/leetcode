/**
 * Rotating The Box
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var rotateTheBox = function (boxGrid) {
  const initialRows = boxGrid.length;
  const initialCols = boxGrid[0].length;

  const destinationMatrix = Array.from({ length: initialCols }, () =>
    new Array(initialRows).fill("."),
  );

  const obstacleChar = "*";
  const stoneChar = "#";

  for (
    let initialRowIndex = 0;
    initialRowIndex < initialRows;
    initialRowIndex++
  ) {
    let currentLandingSpot = initialCols - 1;
    for (
      let initialColIndex = initialCols - 1;
      initialColIndex >= 0;
      initialColIndex--
    ) {
      if (boxGrid[initialRowIndex][initialColIndex] === obstacleChar) {
        const targetRowForObstacle = initialColIndex;
        const targetColForObstacle = initialRows - 1 - initialRowIndex;
        destinationMatrix[targetRowForObstacle][targetColForObstacle] =
          obstacleChar;
        currentLandingSpot = initialColIndex - 1;
      } else if (boxGrid[initialRowIndex][initialColIndex] === stoneChar) {
        const targetRowForStone = currentLandingSpot;
        const targetColForStone = initialRows - 1 - initialRowIndex;
        destinationMatrix[targetRowForStone][targetColForStone] = stoneChar;
        currentLandingSpot--;
      }
    }
  }

  return destinationMatrix;
};
