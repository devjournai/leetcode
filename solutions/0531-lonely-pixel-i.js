/**
 * Lonely Pixel I
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var findLonelyPixel = function (picture) {
  const gridHeight = picture.length;
  if (gridHeight === 0) {
    return 0;
  }
  const gridWidth = picture[0].length;

  const rowBlackPixelCounts = new Array(gridHeight).fill(0);
  const colBlackPixelCounts = new Array(gridWidth).fill(0);
  const blackPixelCoordinates = [];

  for (let currentGridRow = 0; currentGridRow < gridHeight; currentGridRow++) {
    for (let currentGridCol = 0; currentGridCol < gridWidth; currentGridCol++) {
      if (picture[currentGridRow][currentGridCol] === "B") {
        rowBlackPixelCounts[currentGridRow]++;
        colBlackPixelCounts[currentGridCol]++;
        blackPixelCoordinates.push([currentGridRow, currentGridCol]);
      }
    }
  }

  let totalLonelyBlackPixels = 0;

  for (
    let coordinateIndex = 0;
    coordinateIndex < blackPixelCoordinates.length;
    coordinateIndex++
  ) {
    const checkRow = blackPixelCoordinates[coordinateIndex][0];
    const checkCol = blackPixelCoordinates[coordinateIndex][1];

    if (
      rowBlackPixelCounts[checkRow] === 1 &&
      colBlackPixelCounts[checkCol] === 1
    ) {
      totalLonelyBlackPixels++;
    }
  }

  return totalLonelyBlackPixels;
};
