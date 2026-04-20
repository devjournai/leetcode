/**
 * Rank Transform Of A Matrix
 * Time Complexity: O(R * C * log(R * C))
 * Space Complexity: O(R * C)
 */
var matrixRankTransform = function (matrix) {
  const matrixDimensionRows = matrix.length;
  const matrixDimensionCols = matrix[0].length;
  const finalRankMatrix = Array.from({ length: matrixDimensionRows }, () =>
    new Array(matrixDimensionCols).fill(0),
  );

  const disjointSetParents = new Array(
    matrixDimensionRows * matrixDimensionCols,
  ).fill(-1);

  const findSetRepresentative = (nodeIdentifier) => {
    if (disjointSetParents[nodeIdentifier] < 0) {
      return nodeIdentifier;
    }
    disjointSetParents[nodeIdentifier] = findSetRepresentative(
      disjointSetParents[nodeIdentifier],
    );
    return disjointSetParents[nodeIdentifier];
  };

  const uniteSets = (identifierA, identifierB) => {
    let rootOfA = findSetRepresentative(identifierA);
    let rootOfB = findSetRepresentative(identifierB);

    if (rootOfA !== rootOfB) {
      if (disjointSetParents[rootOfA] < disjointSetParents[rootOfB]) {
        disjointSetParents[rootOfA] += disjointSetParents[rootOfB];
        disjointSetParents[rootOfB] = rootOfA;
      } else {
        disjointSetParents[rootOfB] += disjointSetParents[rootOfA];
        disjointSetParents[rootOfA] = rootOfB;
      }
    }
  };

  for (
    let rowIndexIterator = 0;
    rowIndexIterator < matrixDimensionRows;
    rowIndexIterator++
  ) {
    const rowGroupingMap = new Map();
    for (
      let columnIndexIterator = 0;
      columnIndexIterator < matrixDimensionCols;
      columnIndexIterator++
    ) {
      const cellValue = matrix[rowIndexIterator][columnIndexIterator];
      if (!rowGroupingMap.has(cellValue)) {
        rowGroupingMap.set(cellValue, []);
      }
      rowGroupingMap
        .get(cellValue)
        .push([rowIndexIterator, columnIndexIterator]);
    }
    for (const coordinateList of rowGroupingMap.values()) {
      for (let listIndex = 1; listIndex < coordinateList.length; listIndex++) {
        const [firstR, firstC] = coordinateList[0];
        const [secondR, secondC] = coordinateList[listIndex];
        uniteSets(
          firstR * matrixDimensionCols + firstC,
          secondR * matrixDimensionCols + secondC,
        );
      }
    }
  }

  for (
    let colIndexIterator = 0;
    colIndexIterator < matrixDimensionCols;
    colIndexIterator++
  ) {
    const colGroupingMap = new Map();
    for (
      let rIndexIterator = 0;
      rIndexIterator < matrixDimensionRows;
      rIndexIterator++
    ) {
      const cellValueCurrent = matrix[rIndexIterator][colIndexIterator];
      if (!colGroupingMap.has(cellValueCurrent)) {
        colGroupingMap.set(cellValueCurrent, []);
      }
      colGroupingMap
        .get(cellValueCurrent)
        .push([rIndexIterator, colIndexIterator]);
    }
    for (const currentCoordList of colGroupingMap.values()) {
      for (
        let coordListPointer = 1;
        coordListPointer < currentCoordList.length;
        coordListPointer++
      ) {
        const [initialR, initialC] = currentCoordList[0];
        const [laterR, laterC] = currentCoordList[coordListPointer];
        uniteSets(
          initialR * matrixDimensionCols + initialC,
          laterR * matrixDimensionCols + laterC,
        );
      }
    }
  }

  const allMatrixElements = [];
  for (
    let rowCellIndex = 0;
    rowCellIndex < matrixDimensionRows;
    rowCellIndex++
  ) {
    for (
      let colCellIndex = 0;
      colCellIndex < matrixDimensionCols;
      colCellIndex++
    ) {
      allMatrixElements.push([
        matrix[rowCellIndex][colCellIndex],
        rowCellIndex,
        colCellIndex,
      ]);
    }
  }
  allMatrixElements.sort((elementA, elementB) => elementA[0] - elementB[0]);

  const maxRankInRows = new Array(matrixDimensionRows).fill(0);
  const maxRankInColumns = new Array(matrixDimensionCols).fill(0);

  let processingIndex = 0;
  while (processingIndex < allMatrixElements.length) {
    const currentElementValue = allMatrixElements[processingIndex][0];
    const componentCoordGroups = new Map();
    const elementsInCurrentValueGroup = [];

    let scanIndex = processingIndex;
    while (
      scanIndex < allMatrixElements.length &&
      allMatrixElements[scanIndex][0] === currentElementValue
    ) {
      const [, elementRow, elementCol] = allMatrixElements[scanIndex];
      const rootNodeIdentifier = findSetRepresentative(
        elementRow * matrixDimensionCols + elementCol,
      );
      if (!componentCoordGroups.has(rootNodeIdentifier)) {
        componentCoordGroups.set(rootNodeIdentifier, []);
      }
      componentCoordGroups
        .get(rootNodeIdentifier)
        .push([elementRow, elementCol]);
      elementsInCurrentValueGroup.push([elementRow, elementCol]);
      scanIndex++;
    }
    processingIndex = scanIndex;

    for (const componentMembers of componentCoordGroups.values()) {
      let maxRankAcrossComponents = 0;
      for (const [memberRow, memberCol] of componentMembers) {
        maxRankAcrossComponents = Math.max(
          maxRankAcrossComponents,
          maxRankInRows[memberRow],
          maxRankInColumns[memberCol],
        );
      }
      const computedRank = maxRankAcrossComponents + 1;
      for (const [memberRow, memberCol] of componentMembers) {
        finalRankMatrix[memberRow][memberCol] = computedRank;
      }
    }

    // Update global max ranks after all components for the current value are processed
    // This is crucial for correctness because elements of the same value in different components
    // must not influence each other's rank calculation based on previously updated ranks for *this* value.
    // They should only depend on ranks from *smaller* values.
    for (const [memberRow, memberCol] of elementsInCurrentValueGroup) {
      const cellRank = finalRankMatrix[memberRow][memberCol];
      maxRankInRows[memberRow] = Math.max(maxRankInRows[memberRow], cellRank);
      maxRankInColumns[memberCol] = Math.max(
        maxRankInColumns[memberCol],
        cellRank,
      );
    }
  }

  return finalRankMatrix;
};
