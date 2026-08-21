/**
 * Cyclically Rotating A Grid
 * Intuition: Each concentric layer is a cycle. Rotate that ring left (counterclockwise) by k mod perimeter by flattening, offsetting, and writing back.
 * Approach: 1. For each layer, collect cells down/right/up/left. 2. `effectiveRotationCount = k % perimeter`. 3. Write starting at (perimeter − k) offset into `rotatedResultMatrix`.
 * Dry Run: grid=[[40,10],[30,20]], k=1. Layer cycle [40,30,20,10] shifts to [[10,20],[40,30]].
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var rotateGrid = function (grid, k) {
  const gridRowsDimension = grid.length;
  const gridColsDimension = grid[0].length;
  const rotatedResultMatrix = grid.map((initialRow) => [...initialRow]);

  const numberOfLayers = Math.min(gridRowsDimension, gridColsDimension) / 2;

  const performLayerRotation = (
    layerTopBoundary,
    layerLeftBoundary,
    layerBottomBoundary,
    layerRightBoundary,
    totalRotations
  ) => {
    if (
      layerTopBoundary >= layerBottomBoundary ||
      layerLeftBoundary >= layerRightBoundary
    ) {
      return;
    }

    const currentPerimeterLength =
      2 *
      (layerBottomBoundary -
        layerTopBoundary +
        layerRightBoundary -
        layerLeftBoundary);
    const effectiveRotationCount = totalRotations % currentPerimeterLength;
    if (effectiveRotationCount === 0) {
      return;
    }

    const collectedLayerElements = [];

    for (
      let rowIteratorA = layerTopBoundary;
      rowIteratorA <= layerBottomBoundary;
      rowIteratorA++
    ) {
      collectedLayerElements.push(grid[rowIteratorA][layerLeftBoundary]);
    }
    for (
      let colIteratorA = layerLeftBoundary + 1;
      colIteratorA <= layerRightBoundary;
      colIteratorA++
    ) {
      collectedLayerElements.push(grid[layerBottomBoundary][colIteratorA]);
    }
    for (
      let rowIteratorB = layerBottomBoundary - 1;
      rowIteratorB >= layerTopBoundary;
      rowIteratorB--
    ) {
      collectedLayerElements.push(grid[rowIteratorB][layerRightBoundary]);
    }
    for (
      let colIteratorB = layerRightBoundary - 1;
      colIteratorB > layerLeftBoundary;
      colIteratorB--
    ) {
      collectedLayerElements.push(grid[layerTopBoundary][colIteratorB]);
    }

    const rotationStartIndex =
      (currentPerimeterLength - effectiveRotationCount) %
      currentPerimeterLength;
    let currentElementPutIndex = rotationStartIndex;

    for (
      let rowIteratorC = layerTopBoundary;
      rowIteratorC <= layerBottomBoundary;
      rowIteratorC++
    ) {
      rotatedResultMatrix[rowIteratorC][layerLeftBoundary] =
        collectedLayerElements[currentElementPutIndex % currentPerimeterLength];
      currentElementPutIndex++;
    }
    for (
      let colIteratorC = layerLeftBoundary + 1;
      colIteratorC <= layerRightBoundary;
      colIteratorC++
    ) {
      rotatedResultMatrix[layerBottomBoundary][colIteratorC] =
        collectedLayerElements[currentElementPutIndex % currentPerimeterLength];
      currentElementPutIndex++;
    }
    for (
      let rowIteratorD = layerBottomBoundary - 1;
      rowIteratorD >= layerTopBoundary;
      rowIteratorD--
    ) {
      rotatedResultMatrix[rowIteratorD][layerRightBoundary] =
        collectedLayerElements[currentElementPutIndex % currentPerimeterLength];
      currentElementPutIndex++;
    }
    for (
      let colIteratorD = layerRightBoundary - 1;
      colIteratorD > layerLeftBoundary;
      colIteratorD--
    ) {
      rotatedResultMatrix[layerTopBoundary][colIteratorD] =
        collectedLayerElements[currentElementPutIndex % currentPerimeterLength];
      currentElementPutIndex++;
    }
  };

  for (
    let currentLayerIndex = 0;
    currentLayerIndex < numberOfLayers;
    currentLayerIndex++
  ) {
    performLayerRotation(
      currentLayerIndex,
      currentLayerIndex,
      gridRowsDimension - 1 - currentLayerIndex,
      gridColsDimension - 1 - currentLayerIndex,
      k
    );
  }

  return rotatedResultMatrix;
};
