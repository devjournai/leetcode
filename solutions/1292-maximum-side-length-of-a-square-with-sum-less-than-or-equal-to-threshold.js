/**
 * Maximum Side Length of a Square with Sum Less than or Equal to Threshold
 * Time Complexity: O(m * n * log(min(m, n)))
 * Space Complexity: O(m * n)
*/
var maxSideLength = function (inputMatrix, sumThreshold) {
    const matrixRows = inputMatrix.length;
    if (matrixRows === 0) {
        return 0;
    }
    const matrixCols = inputMatrix[0].length;
    if (matrixCols === 0) {
        return 0;
    }

    const prefixSumGrid = Array(matrixRows + 1).fill(null).map(() => Array(matrixCols + 1).fill(0));

    for (let currentR = 0; currentR < matrixRows; currentR++) {
        for (let currentC = 0; currentC < matrixCols; currentC++) {
            prefixSumGrid[currentR + 1][currentC + 1] =
                inputMatrix[currentR][currentC] +
                prefixSumGrid[currentR][currentC + 1] +
                prefixSumGrid[currentR + 1][currentC] -
                prefixSumGrid[currentR][currentC];
        }
    }

    let minSideSearch = 1;
    let maxSideSearch = Math.min(matrixRows, matrixCols);
    let finalMaxSideLength = 0;

    const checkSquareValidity = (sideToVerify) => {
        for (let checkRowIter = 0; checkRowIter <= matrixRows - sideToVerify; checkRowIter++) {
            for (let checkColIter = 0; checkColIter <= matrixCols - sideToVerify; checkColIter++) {
                const bottomRowIdx = checkRowIter + sideToVerify;
                const bottomColIdx = checkColIter + sideToVerify;

                const currentSquareSum =
                    prefixSumGrid[bottomRowIdx][bottomColIdx] -
                    prefixSumGrid[checkRowIter][bottomColIdx] -
                    prefixSumGrid[bottomRowIdx][checkColIter] +
                    prefixSumGrid[checkRowIter][checkColIter];

                if (currentSquareSum <= sumThreshold) {
                    return true;
                }
            }
        }
        return false;
    };

    while (minSideSearch <= maxSideSearch) {
        const potentialSide = Math.floor((minSideSearch + maxSideSearch) / 2);
        if (checkSquareValidity(potentialSide)) {
            finalMaxSideLength = potentialSide;
            minSideSearch = potentialSide + 1;
        } else {
            maxSideSearch = potentialSide - 1;
        }
    }

    return finalMaxSideLength;
};