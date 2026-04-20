/**
 * Grid Illumination
 * Time Complexity: O(L + Q)
 * Space Complexity: O(L + Q)
 */
var gridIllumination = function (n, lamps, queries) {
  const rowIlluminationCounts = new Map();
  const columnIlluminationCounts = new Map();
  const diagonalOneIlluminationCounts = new Map();
  const diagonalTwoIlluminationCounts = new Map();
  const activeLampCoordinates = new Set();

  for (const lampPlacement of lamps) {
    const currentLampRow = lampPlacement[0];
    const currentLampColumn = lampPlacement[1];
    const lampCoordinateString = `${currentLampRow},${currentLampColumn}`;

    if (!activeLampCoordinates.has(lampCoordinateString)) {
      activeLampCoordinates.add(lampCoordinateString);

      rowIlluminationCounts.set(
        currentLampRow,
        (rowIlluminationCounts.get(currentLampRow) || 0) + 1,
      );
      columnIlluminationCounts.set(
        currentLampColumn,
        (columnIlluminationCounts.get(currentLampColumn) || 0) + 1,
      );
      diagonalOneIlluminationCounts.set(
        currentLampRow - currentLampColumn,
        (diagonalOneIlluminationCounts.get(
          currentLampRow - currentLampColumn,
        ) || 0) + 1,
      );
      diagonalTwoIlluminationCounts.set(
        currentLampRow + currentLampColumn,
        (diagonalTwoIlluminationCounts.get(
          currentLampRow + currentLampColumn,
        ) || 0) + 1,
      );
    }
  }

  const adjacentCellOffsets = [
    [0, 0],
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1],
  ];

  const queryResultArray = new Array(queries.length);

  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
    const currentQuery = queries[queryIndex];
    const queryTargetRow = currentQuery[0];
    const queryTargetColumn = currentQuery[1];

    const isIlluminated =
      rowIlluminationCounts.get(queryTargetRow) > 0 ||
      columnIlluminationCounts.get(queryTargetColumn) > 0 ||
      diagonalOneIlluminationCounts.get(queryTargetRow - queryTargetColumn) >
        0 ||
      diagonalTwoIlluminationCounts.get(queryTargetRow + queryTargetColumn) > 0;

    queryResultArray[queryIndex] = isIlluminated ? 1 : 0;

    for (const offsetPair of adjacentCellOffsets) {
      const rowOffsetDelta = offsetPair[0];
      const columnOffsetDelta = offsetPair[1];

      const neighborRowCoordinate = queryTargetRow + rowOffsetDelta;
      const neighborColumnCoordinate = queryTargetColumn + columnOffsetDelta;
      const neighborCoordinateString = `${neighborRowCoordinate},${neighborColumnCoordinate}`;

      if (
        neighborRowCoordinate >= 0 &&
        neighborRowCoordinate < n &&
        neighborColumnCoordinate >= 0 &&
        neighborColumnCoordinate < n &&
        activeLampCoordinates.has(neighborCoordinateString)
      ) {
        activeLampCoordinates.delete(neighborCoordinateString);

        rowIlluminationCounts.set(
          neighborRowCoordinate,
          rowIlluminationCounts.get(neighborRowCoordinate) - 1,
        );
        columnIlluminationCounts.set(
          neighborColumnCoordinate,
          columnIlluminationCounts.get(neighborColumnCoordinate) - 1,
        );
        diagonalOneIlluminationCounts.set(
          neighborRowCoordinate - neighborColumnCoordinate,
          diagonalOneIlluminationCounts.get(
            neighborRowCoordinate - neighborColumnCoordinate,
          ) - 1,
        );
        diagonalTwoIlluminationCounts.set(
          neighborRowCoordinate + neighborColumnCoordinate,
          diagonalTwoIlluminationCounts.get(
            neighborRowCoordinate + neighborColumnCoordinate,
          ) - 1,
        );
      }
    }
  }

  return queryResultArray;
};
