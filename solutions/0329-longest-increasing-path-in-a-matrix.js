/**
 * Longest Increasing Path In A Matrix
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
*/
var longestIncreasingPath = function (matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return 0;
    }

    const matrixHeight = matrix.length;
    const matrixWidth = matrix[0].length;

    const pathMemo = Array.from({ length: matrixHeight }, () => Array(matrixWidth).fill(0));

    const directionOffsets = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    let maxOverallPath = 0;

    const calculateLongestPath = (currentRowPosition, currentColPosition) => {
        if (pathMemo[currentRowPosition][currentColPosition] !== 0) {
            return pathMemo[currentRowPosition][currentColPosition];
        }

        let pathLengthFromHere = 1;

        for (const directionPair of directionOffsets) {
            const nextRowPosition = currentRowPosition + directionPair[0];
            const nextColPosition = currentColPosition + directionPair[1];

            const isValidRow = nextRowPosition >= 0 && nextRowPosition < matrixHeight;
            const isValidCol = nextColPosition >= 0 && nextColPosition < matrixWidth;

            if (isValidRow && isValidCol && matrix[nextRowPosition][nextColPosition] > matrix[currentRowPosition][currentColPosition]) {
                const neighborPathResult = calculateLongestPath(nextRowPosition, nextColPosition);
                pathLengthFromHere = Math.max(pathLengthFromHere, 1 + neighborPathResult);
            }
        }

        pathMemo[currentRowPosition][currentColPosition] = pathLengthFromHere;
        return pathLengthFromHere;
    };

    for (let rIdx = 0; rIdx < matrixHeight; rIdx++) {
        for (let cIdx = 0; cIdx < matrixWidth; cIdx++) {
            const currentPathValue = calculateLongestPath(rIdx, cIdx);
            maxOverallPath = Math.max(maxOverallPath, currentPathValue);
        }
    }

    return maxOverallPath;
};