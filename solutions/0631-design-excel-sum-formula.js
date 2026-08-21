/**
 * Design Excel Sum Formula
 * Intuition: Store cell values in a grid and keep formula sources plus reverse dependencies. After a `set` or `sum`, recompute each dependent formula from current grid values and recurse.
 * Approach: 1. Constructor builds `valueGrid`, `formulaDefinitions`, and `cellDependencies`. 2. `set` drops any formula on the cell, writes `val`, then `propagateCellUpdates`. 3. `get` reads the grid. 4. `sum` expands ranges/`A1` tokens into source coords, rewires dependencies, writes `computeFormulaValue`, and propagates. 5. Propagation recomputes every dependent formula from its sources.
 * Dry Run: Excel(2,'B'); set(1,'A',2); set(1,'B',3); sum(2,'A',['A1','B1']) → 5. Then set(1,'A',4) → cell 2A recomputes to 7 via `cellDependencies`.
 * Time Complexity: O(H * W)
 * Space Complexity: O((H * W)^2)
 */
var Excel = function (height, width) {
  this.sheetRowsCount = height;
  this.sheetColsCount = width.charCodeAt(0) - "A".charCodeAt(0) + 1;
  this.valueGrid = Array(this.sheetRowsCount)
    .fill(0)
    .map(() => Array(this.sheetColsCount).fill(0));
  this.formulaDefinitions = new Map();
  this.cellDependencies = new Map();
  this.charAToNumOffset = "A".charCodeAt(0);

  this.getColumnIndex = function (columnCharacter) {
    return columnCharacter.charCodeAt(0) - this.charAToNumOffset;
  };

  this.getCellIdentifier = function (rowIndex, colIndex) {
    const charRepresentation = String.fromCharCode(
      colIndex + this.charAToNumOffset
    );
    const rowRepresentation = rowIndex + 1;
    return `${rowRepresentation}:${charRepresentation}`;
  };

  this.parseCellIdentifier = function (identifierString) {
    const identifierParts = identifierString.split(":");
    const parsedRow = parseInt(identifierParts[0]);
    const parsedCharColumn = identifierParts[1];
    return { row: parsedRow, columnChar: parsedCharColumn };
  };

  this.computeFormulaValue = function (formulaSourceCells) {
    let currentFormulaTotal = 0;
    for (const cellCoordPair of formulaSourceCells) {
      const currentFormulaRowIndex = cellCoordPair[0];
      const currentFormulaColIndex = cellCoordPair[1];
      currentFormulaTotal +=
        this.valueGrid[currentFormulaRowIndex][currentFormulaColIndex];
    }
    return currentFormulaTotal;
  };

  this.propagateCellUpdates = function (sourceRow, sourceColumnChar) {
    const sourceCellId = this.getCellIdentifier(
      sourceRow - 1,
      this.getColumnIndex(sourceColumnChar)
    );
    if (!this.cellDependencies.has(sourceCellId)) {
      return;
    }

    const dependentCellIds = Array.from(
      this.cellDependencies.get(sourceCellId)
    );
    for (const dependentId of dependentCellIds) {
      const parsedDependentCoords = this.parseCellIdentifier(dependentId);
      const dependentCellRow = parsedDependentCoords.row;
      const dependentCellColChar = parsedDependentCoords.columnChar;
      const dependentCellColIndex = this.getColumnIndex(dependentCellColChar);

      const dependentCellFormulaSources =
        this.formulaDefinitions.get(dependentId);
      if (dependentCellFormulaSources) {
        const newComputedSum = this.computeFormulaValue(
          dependentCellFormulaSources
        );
        this.valueGrid[dependentCellRow - 1][dependentCellColIndex] =
          newComputedSum;
        this.propagateCellUpdates(dependentCellRow, dependentCellColChar);
      }
    }
  };
};

Excel.prototype.set = function (row, column, val) {
  const targetColIdx = this.getColumnIndex(column);
  const targetCellId = this.getCellIdentifier(row - 1, targetColIdx);

  if (this.formulaDefinitions.has(targetCellId)) {
    const previousFormulaSources = this.formulaDefinitions.get(targetCellId);
    for (const oldFormulaSource of previousFormulaSources) {
      const oldSourceRowIdx = oldFormulaSource[0];
      const oldSourceColIdx = oldFormulaSource[1];
      const oldSourceCellId = this.getCellIdentifier(
        oldSourceRowIdx,
        oldSourceColIdx
      );
      if (this.cellDependencies.has(oldSourceCellId)) {
        this.cellDependencies.get(oldSourceCellId).delete(targetCellId);
      }
    }
    this.formulaDefinitions.delete(targetCellId);
  }

  this.valueGrid[row - 1][targetColIdx] = val;
  this.propagateCellUpdates(row, column);
};

Excel.prototype.get = function (row, column) {
  const getColIndex = this.getColumnIndex(column);
  return this.valueGrid[row - 1][getColIndex];
};

Excel.prototype.sum = function (row, column, numbers) {
  const sumTargetColIdx = this.getColumnIndex(column);
  const sumTargetCellId = this.getCellIdentifier(row - 1, sumTargetColIdx);
  const formulaSourceCoordinates = [];

  for (const numberString of numbers) {
    const colonPosition = numberString.indexOf(":");
    if (colonPosition !== -1) {
      const rangeStartString = numberString.substring(0, colonPosition);
      const rangeEndString = numberString.substring(colonPosition + 1);

      const startCharRange = rangeStartString[0];
      const startRowRange = parseInt(rangeStartString.substring(1));
      const endCharRange = rangeEndString[0];
      const endRowRange = parseInt(rangeEndString.substring(1));

      const startColRangeIdx = this.getColumnIndex(startCharRange);
      const endColRangeIdx = this.getColumnIndex(endCharRange);

      for (
        let currentRangeRow = startRowRange - 1;
        currentRangeRow <= endRowRange - 1;
        currentRangeRow++
      ) {
        for (
          let currentRangeCol = startColRangeIdx;
          currentRangeCol <= endColRangeIdx;
          currentRangeCol++
        ) {
          formulaSourceCoordinates.push([currentRangeRow, currentRangeCol]);
        }
      }
    } else {
      const singleChar = numberString[0];
      const singleRow = parseInt(numberString.substring(1));
      const singleColIdx = this.getColumnIndex(singleChar);
      formulaSourceCoordinates.push([singleRow - 1, singleColIdx]);
    }
  }

  if (this.formulaDefinitions.has(sumTargetCellId)) {
    const oldFormulaSourceList = this.formulaDefinitions.get(sumTargetCellId);
    for (const previousSourceCoord of oldFormulaSourceList) {
      const prevSourceRowIdx = previousSourceCoord[0];
      const prevSourceColIdx = previousSourceCoord[1];
      const prevSourceCellId = this.getCellIdentifier(
        prevSourceRowIdx,
        prevSourceColIdx
      );
      if (this.cellDependencies.has(prevSourceCellId)) {
        this.cellDependencies.get(prevSourceCellId).delete(sumTargetCellId);
      }
    }
  }

  this.formulaDefinitions.set(sumTargetCellId, formulaSourceCoordinates);

  for (const newSourceCoord of formulaSourceCoordinates) {
    const newSourceRowIdx = newSourceCoord[0];
    const newSourceColIdx = newSourceCoord[1];
    const newSourceCellId = this.getCellIdentifier(
      newSourceRowIdx,
      newSourceColIdx
    );
    if (!this.cellDependencies.has(newSourceCellId)) {
      this.cellDependencies.set(newSourceCellId, new Set());
    }
    this.cellDependencies.get(newSourceCellId).add(sumTargetCellId);
  }

  const calculatedResult = this.computeFormulaValue(formulaSourceCoordinates);
  this.valueGrid[row - 1][sumTargetColIdx] = calculatedResult;
  this.propagateCellUpdates(row, column);
  return calculatedResult;
};
