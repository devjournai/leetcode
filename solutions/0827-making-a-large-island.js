/**
 * Making A Large Island
 * Intuition: Paint each island with a unique id ≥2 and record sizes. Flipping one 0 joins up to four neighboring distinct islands plus 1.
 * Approach: 1. DFS paint 1s to ids, store sizes, track max existing. 2. All-zero grid → 1. 3. For each 0, unique neighbor ids (Set), sum mapped sizes + 1, update max.
 * Dry Run: [[1,0],[0,1]]. Two size-1 islands; flipping a 0 neighbors both → 3.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var largestIsland = function (gridInput) {
  const gridDimension = gridInput.length;

  if (gridDimension === 0) {
    return 0;
  }

  const depthFirstSearch = (
    currentGrid,
    identifierToUse,
    currentRowPosition,
    currentColPosition
  ) => {
    if (
      currentRowPosition < 0 ||
      currentRowPosition >= gridDimension ||
      currentColPosition < 0 ||
      currentColPosition >= gridDimension ||
      currentGrid[currentRowPosition][currentColPosition] === 0 ||
      currentGrid[currentRowPosition][currentColPosition] === identifierToUse
    ) {
      return 0;
    }

    currentGrid[currentRowPosition][currentColPosition] = identifierToUse;

    return (
      1 +
      (depthFirstSearch(
        currentGrid,
        identifierToUse,
        currentRowPosition + 1,
        currentColPosition
      ) +
        depthFirstSearch(
          currentGrid,
          identifierToUse,
          currentRowPosition - 1,
          currentColPosition
        ) +
        depthFirstSearch(
          currentGrid,
          identifierToUse,
          currentRowPosition,
          currentColPosition + 1
        ) +
        depthFirstSearch(
          currentGrid,
          identifierToUse,
          currentRowPosition,
          currentColPosition - 1
        ))
    );
  };

  const islandSizeMapping = new Map();
  let nextAvailableIdentifier = 2;
  let currentMaxIslandSize = -1;

  for (let outerGridRow = 0; outerGridRow < gridDimension; outerGridRow++) {
    for (let innerGridCol = 0; innerGridCol < gridDimension; innerGridCol++) {
      if (gridInput[outerGridRow][innerGridCol] === 1) {
        const islandArea = depthFirstSearch(
          gridInput,
          nextAvailableIdentifier,
          outerGridRow,
          innerGridCol
        );
        islandSizeMapping.set(nextAvailableIdentifier, islandArea);
        nextAvailableIdentifier++;
        currentMaxIslandSize = Math.max(currentMaxIslandSize, islandArea);
      }
    }
  }

  // If no '1's were initially found, changing one '0' creates an island of size 1.
  // If currentMaxIslandSize is still -1, it means the grid was all 0s.
  // The largest island will be 1 (by flipping one 0).
  if (currentMaxIslandSize === -1) {
    currentMaxIslandSize = 1;
  }

  islandSizeMapping.set(0, 0);

  for (let zeroScanRow = 0; zeroScanRow < gridDimension; zeroScanRow++) {
    for (
      let zeroScanColumn = 0;
      zeroScanColumn < gridDimension;
      zeroScanColumn++
    ) {
      if (gridInput[zeroScanRow][zeroScanColumn] === 0) {
        const uniqueNeighbors = new Set();

        const neighborDirectionRow = [-1, 1, 0, 0];
        const neighborDirectionCol = [0, 0, -1, 1];

        for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
          const neighborRowCoord =
            zeroScanRow + neighborDirectionRow[directionIndex];
          const neighborColCoord =
            zeroScanColumn + neighborDirectionCol[directionIndex];

          if (
            neighborRowCoord >= 0 &&
            neighborRowCoord < gridDimension &&
            neighborColCoord >= 0 &&
            neighborColCoord < gridDimension
          ) {
            uniqueNeighbors.add(gridInput[neighborRowCoord][neighborColCoord]);
          }
        }

        let potentialIslandSize = 1;
        for (const islandIdentifier of uniqueNeighbors) {
          potentialIslandSize += islandSizeMapping.get(islandIdentifier);
        }

        currentMaxIslandSize = Math.max(
          currentMaxIslandSize,
          potentialIslandSize
        );
      }
    }
  }

  return currentMaxIslandSize;
};
