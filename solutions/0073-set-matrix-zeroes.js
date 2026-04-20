/**
 * Set Matrix Zeroes
 * Time Complexity: O(m*n)
 * Space Complexity: O(1)
*/
var setZeroes = function (matrix) {
    const matrixRowCount = matrix.length;
    const matrixColCount = matrix[0].length;

    let shouldZeroFirstRow = false;
    let shouldZeroFirstColumn = false;

    for (const firstRowItem of matrix[0]) {
        if (firstRowItem === 0) {
            shouldZeroFirstRow = true;
            break;
        }
    }

    let currentColumnCheck = 0;
    while (currentColumnCheck < matrixRowCount) {
        if (matrix[currentColumnCheck][0] === 0) {
            shouldZeroFirstColumn = true;
            break;
        }
        currentColumnCheck++;
    }

    for (let currentInternalRow = 1; currentInternalRow < matrixRowCount; currentInternalRow++) {
        for (let currentInternalCol = 1; currentInternalCol < matrixColCount; currentInternalCol++) {
            if (matrix[currentInternalRow][currentInternalCol] === 0) {
                matrix[currentInternalRow][0] = 0;
                matrix[0][currentInternalCol] = 0;
            }
        }
    }

    let targetMatrixRow = 1;
    while (targetMatrixRow < matrixRowCount) {
        for (let targetMatrixCol = 1; targetMatrixCol < matrixColCount; targetMatrixCol++) {
            if (matrix[targetMatrixRow][0] === 0 || matrix[0][targetMatrixCol] === 0) {
                matrix[targetMatrixRow][targetMatrixCol] = 0;
            }
        }
        targetMatrixRow++;
    }

    if (shouldZeroFirstRow) {
        for (let fillFirstRowCol = 0; fillFirstRowCol < matrixColCount; fillFirstRowCol++) {
            matrix[0][fillFirstRowCol] = 0;
        }
    }

    if (shouldZeroFirstColumn) {
        let fillFirstColRow = 0;
        while (fillFirstColRow < matrixRowCount) {
            matrix[fillFirstColRow][0] = 0;
            fillFirstColRow++;
        }
    }
};