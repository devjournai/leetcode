/**
 * Strange Printer II
 * Intuition: Each color must be printed as a solid rectangle. Other colors inside that rectangle must be printed later → edges; a cycle means impossible.
 * Approach: 1. Bounding box per color. 2. Any different color in the box is a dependency. 3. DFS cycle detect. 4. Printable iff acyclic.
 * Dry Run: nested rectangles of color 1 then 2.
 *   - 2 depends on 1; acyclic → true.
 * Time Complexity: O(C * M * N)
 * Space Complexity: O(C^2)
 */
var isPrintable = function (targetGrid) {
  const gridHeight = targetGrid.length;
  const gridWidth = targetGrid[0].length;
  const colorDimensionMap = new Map();

  for (let colorCode = 1; colorCode <= 60; colorCode++) {
    let minRowCoord = gridHeight;
    let maxRowCoord = -1;
    let minColCoord = gridWidth;
    let maxColCoord = -1;

    for (let rCoord = 0; rCoord < gridHeight; rCoord++) {
      for (let cCoord = 0; cCoord < gridWidth; cCoord++) {
        if (targetGrid[rCoord][cCoord] === colorCode) {
          minRowCoord = Math.min(minRowCoord, rCoord);
          maxRowCoord = Math.max(maxRowCoord, rCoord);
          minColCoord = Math.min(minColCoord, cCoord);
          maxColCoord = Math.max(maxColCoord, cCoord);
        }
      }
    }
    if (maxRowCoord >= 0) {
      colorDimensionMap.set(colorCode, [
        minRowCoord,
        maxRowCoord,
        minColCoord,
        maxColCoord,
      ]);
    }
  }

  const colorDependenciesGraph = new Map();
  for (const [parentColor, boundsArray] of colorDimensionMap.entries()) {
    const [lowerRowBound, upperRowBound, lowerColBound, upperColBound] =
      boundsArray;
    const currentDependencies = new Set();
    for (let rowScan = lowerRowBound; rowScan < upperRowBound + 1; rowScan++) {
      for (
        let colScan = lowerColBound;
        colScan < upperColBound + 1;
        colScan++
      ) {
        const coveredColor = targetGrid[rowScan][colScan];
        if (coveredColor !== parentColor) {
          currentDependencies.add(coveredColor);
        }
      }
    }
    colorDependenciesGraph.set(parentColor, currentDependencies);
  }

  const globalVisitedColors = new Set();
  const currentRecursionPath = new Set();

  function hasCycleInGraph(startColor) {
    if (currentRecursionPath.has(startColor)) {
      return true;
    }
    if (globalVisitedColors.has(startColor)) {
      return false;
    }

    globalVisitedColors.add(startColor);
    currentRecursionPath.add(startColor);

    const dependentsForCurrent = colorDependenciesGraph.get(startColor);
    if (dependentsForCurrent) {
      for (const dependentColor of dependentsForCurrent) {
        if (hasCycleInGraph(dependentColor)) {
          return true;
        }
      }
    }

    currentRecursionPath.delete(startColor);
    return false;
  }

  for (const actualColor of colorDimensionMap.keys()) {
    if (hasCycleInGraph(actualColor)) {
      return false;
    }
  }

  return true;
};
