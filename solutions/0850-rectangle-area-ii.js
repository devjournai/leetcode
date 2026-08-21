/**
 * Rectangle Area Ii
 * Intuition: Compress unique x/y edges into a discrete grid. Mark every unit cell covered by any rectangle, then sum (Δx * Δy) of marked cells mod 1e9+7 (union without double-counting).
 * Approach: 1. Collect all x/y, sort, map to indices. 2. `coverageGrid[xi][yi]=1` for each rect's index range. 3. For each marked cell add width*height, mod MOD. 4. Return area.
 * Dry Run: [[0,0,2,2],[1,0,2,3],[1,0,3,1]]. Unique x 0,1,2,3 y 0,1,2,3. Covered union area 6.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var rectangleArea = function (rectangles) {
  const MOD = 1e9 + 7;
  const allXCoordinates = new Set();
  const allYCoordinates = new Set();
  const rectangleInputData = rectangles;

  for (const [
    bottomLeftX,
    bottomLeftY,
    topRightX,
    topRightY,
  ] of rectangleInputData) {
    allXCoordinates.add(bottomLeftX);
    allXCoordinates.add(topRightX);
    allYCoordinates.add(bottomLeftY);
    allYCoordinates.add(topRightY);
  }

  const sortedXUnique = [...allXCoordinates].sort(
    (coordA, coordB) => coordA - coordB
  );
  const sortedYUnique = [...allYCoordinates].sort(
    (coordA, coordB) => coordA - coordB
  );

  const xMapIndices = new Map();
  const yMapIndices = new Map();

  for (let xCoordIndex = 0; xCoordIndex < sortedXUnique.length; xCoordIndex++) {
    xMapIndices.set(sortedXUnique[xCoordIndex], xCoordIndex);
  }

  for (let yCoordIndex = 0; yCoordIndex < sortedYUnique.length; yCoordIndex++) {
    yMapIndices.set(sortedYUnique[yCoordIndex], yCoordIndex);
  }

  const gridDimensionX = sortedXUnique.length;
  const gridDimensionY = sortedYUnique.length;
  const coverageGrid = Array(gridDimensionX)
    .fill(0)
    .map(() => Array(gridDimensionY).fill(0));

  for (const [rectX1, rectY1, rectX2, rectY2] of rectangleInputData) {
    let startXIndex = xMapIndices.get(rectX1);
    let endXIndex = xMapIndices.get(rectX2);
    let startYIndex = yMapIndices.get(rectY1);
    let endYIndex = yMapIndices.get(rectY2);

    for (
      let currentXGridIdx = startXIndex;
      currentXGridIdx < endXIndex;
      currentXGridIdx++
    ) {
      for (
        let currentYGridIdx = startYIndex;
        currentYGridIdx < endYIndex;
        currentYGridIdx++
      ) {
        coverageGrid[currentXGridIdx][currentYGridIdx] = 1;
      }
    }
  }

  let accumulatedArea = 0;

  for (
    let scanXIndex = 0;
    scanXIndex < sortedXUnique.length - 1;
    scanXIndex++
  ) {
    for (
      let scanYIndex = 0;
      scanYIndex < sortedYUnique.length - 1;
      scanYIndex++
    ) {
      if (coverageGrid[scanXIndex][scanYIndex]) {
        const segmentWidth =
          sortedXUnique[scanXIndex + 1] - sortedXUnique[scanXIndex];
        const segmentHeight =
          sortedYUnique[scanYIndex + 1] - sortedYUnique[scanYIndex];
        const segmentArea = segmentWidth * segmentHeight;
        accumulatedArea = (accumulatedArea + segmentArea) % MOD;
      }
    }
  }

  return accumulatedArea;
};
