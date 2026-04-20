/**
 * Spiral Matrix
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
*/
var spiralOrder = function (matrixInput) {
    const resultCollection = [];
    const numRows = matrixInput.length;
    if (numRows === 0) {
        return resultCollection;
    }
    const numCols = matrixInput[0].length;
    const totalElements = numRows * numCols;

    let currentRowStart = 0;
    let currentRowEnd = numRows - 1;
    let currentColStart = 0;
    let currentColEnd = numCols - 1;

    while (resultCollection.length < totalElements) {
        for (let pointerRight = currentColStart; pointerRight <= currentColEnd; pointerRight++) {
            resultCollection.push(matrixInput[currentRowStart][pointerRight]);
        }
        currentRowStart++;

        if (resultCollection.length === totalElements) break;

        for (let pointerDown = currentRowStart; pointerDown <= currentRowEnd; pointerDown++) {
            resultCollection.push(matrixInput[pointerDown][currentColEnd]);
        }
        currentColEnd--;

        if (resultCollection.length === totalElements) break;

        for (let pointerLeft = currentColEnd; pointerLeft >= currentColStart; pointerLeft--) {
            resultCollection.push(matrixInput[currentRowEnd][pointerLeft]);
        }
        currentRowEnd--;

        if (resultCollection.length === totalElements) break;

        for (let pointerUp = currentRowEnd; pointerUp >= currentRowStart; pointerUp--) {
            resultCollection.push(matrixInput[pointerUp][currentColStart]);
        }
        currentColStart++;
    }

    return resultCollection;
};