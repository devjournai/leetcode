/**
 * First Completely Painted Row Or Column
 * Intuition: To efficiently determine the first completely painted row or column, we need to quickly find the matrix coordinates of each number in the 'arr' array and keep track of the count of painted cells for each row and column.
 * Approach:
 * 1. Calculate the dimensions (number of rows and columns) of the input matrix.
 * 2. Initialize two arrays, `rowCompletionCounters` and `colCompletionCounters`, both filled with zeros. These will store the count of painted cells for each row and column, respectively.
 * 3. Create a `valueCoordinateMap` (a Map data structure) to store the `[row, column]` coordinates for each unique integer present in the matrix. This enables O(1) lookup of cell positions given a number.
 * 4. Iterate through the `mat` matrix using nested loops. For each cell, store its value as a key and its `[row, column]` coordinates as the value in the `valueCoordinateMap`.
 * 5. Iterate through the `arr` array using a single loop. For each number `currentPaintedNumber` at index `arrCurrentIndex`:
 *    a. Retrieve its `[row, column]` coordinates (`targetRow`, `targetCol`) from the `valueCoordinateMap`.
 *    b. Increment the count in `rowCompletionCounters` for `targetRow`.
 *    c. Increment the count in `colCompletionCounters` for `targetCol`.
 *    d. Check if the updated count for `targetRow` equals the total number of columns in the matrix (meaning the row is completely painted).
 *    e. Check if the updated count for `targetCol` equals the total number of rows in the matrix (meaning the column is completely painted).
 *    f. If either of these conditions is met, return `arrCurrentIndex` immediately, as this is the smallest index where a row or column is fully painted.
 * Dry Run:
 * arr = [1, 3, 4, 2], mat = [[1, 2], [3, 4]]
 *
 * 1. Initialize:
 *    totalRows = 2, totalCols = 2
 *    rowCompletionCounters = [0, 0]
 *    colCompletionCounters = [0, 0]
 *    valueCoordinateMap = {}
 *
 * 2. Populate valueCoordinateMap (from mat):
 *    mat[0][0] = 1 -> valueCoordinateMap.set(1, [0, 0])
 *    mat[0][1] = 2 -> valueCoordinateMap.set(2, [0, 1])
 *    mat[1][0] = 3 -> valueCoordinateMap.set(3, [1, 0])
 *    mat[1][1] = 4 -> valueCoordinateMap.set(4, [1, 1])
 *    valueCoordinateMap: {1:[0,0], 2:[0,1], 3:[1,0], 4:[1,1]}
 *
 * 3. Process arr:
 *    arrCurrentIndex = 0, currentPaintedNumber = arr[0] = 1:
 *      cellLocation = valueCoordinateMap.get(1) = [0, 0]
 *      targetRow = 0, targetCol = 0
 *      rowCompletionCounters[0] becomes 1.
 *      colCompletionCounters[0] becomes 1.
 *      Is 1 === totalCols (2)? No. Is 1 === totalRows (2)? No.
 *
 *    arrCurrentIndex = 1, currentPaintedNumber = arr[1] = 3:
 *      cellLocation = valueCoordinateMap.get(3) = [1, 0]
 *      targetRow = 1, targetCol = 0
 *      rowCompletionCounters[1] becomes 1.
 *      colCompletionCounters[0] becomes 2.
 *      Is rowCompletionCounters[1] (1) === totalCols (2)? No.
 *      Is colCompletionCounters[0] (2) === totalRows (2)? Yes! Column 0 is complete.
 *      Return arrCurrentIndex = 1.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var firstCompleteIndex = function (arr, mat) {
  const totalRows = mat.length;
  const totalCols = mat[0].length;

  const rowCompletionCounters = new Array(totalRows).fill(0);
  const colCompletionCounters = new Array(totalCols).fill(0);
  const valueCoordinateMap = new Map();

  for (let rowIdx = 0; rowIdx < totalRows; rowIdx++) {
    for (let colIdx = 0; colIdx < totalCols; colIdx++) {
      const cellValue = mat[rowIdx][colIdx];
      valueCoordinateMap.set(cellValue, [rowIdx, colIdx]);
    }
  }

  for (
    let arrCurrentIndex = 0;
    arrCurrentIndex < arr.length;
    arrCurrentIndex++
  ) {
    const currentPaintedNumber = arr[arrCurrentIndex];
    const cellLocation = valueCoordinateMap.get(currentPaintedNumber);
    const targetRow = cellLocation[0];
    const targetCol = cellLocation[1];

    rowCompletionCounters[targetRow]++;
    colCompletionCounters[targetCol]++;

    if (
      rowCompletionCounters[targetRow] === totalCols ||
      colCompletionCounters[targetCol] === totalRows
    ) {
      return arrCurrentIndex;
    }
  }
};
