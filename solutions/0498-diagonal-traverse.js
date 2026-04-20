/**
 * Diagonal Traverse
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var findDiagonalOrder = function (mat) {
    if (!mat || mat.length === 0 || mat[0].length === 0) {
        return [];
    }

    const numRows = mat.length;
    const numCols = mat[0].length;
    const totalElements = numRows * numCols;
    const traversalResult = new Array(totalElements);

    let currentRow = 0;
    let currentCol = 0;
    let isMovingUpRight = true;

    for (let elementCounter = 0; elementCounter < totalElements; elementCounter++) {
        traversalResult[elementCounter] = mat[currentRow][currentCol];

        if (isMovingUpRight) {
            if (currentCol === numCols - 1) {
                currentRow++;
                isMovingUpRight = false;
            } else if (currentRow === 0) {
                currentCol++;
                isMovingUpRight = false;
            } else {
                currentRow--;
                currentCol++;
            }
        } else {
            if (currentRow === numRows - 1) {
                currentCol++;
                isMovingUpRight = true;
            } else if (currentCol === 0) {
                currentRow++;
                isMovingUpRight = true;
            } else {
                currentRow++;
                currentCol--;
            }
        }
    }

    return traversalResult;
};