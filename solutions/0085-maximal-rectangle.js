/**
 * Maximal Rectangle
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(cols)
*/
var maximalRectangle = function (matrixGiven) {
    if (!matrixGiven || matrixGiven.length === 0 || matrixGiven[0].length === 0) {
        return 0;
    }

    const totalRows = matrixGiven.length;
    const totalCols = matrixGiven[0].length;
    let maxRectangleFound = 0;

    const heightsTracker = new Array(totalCols).fill(0);

    for (let rowIterator = 0; rowIterator < totalRows; rowIterator++) {
        for (let colIterator = 0; colIterator < totalCols; colIterator++) {
            const cellValue = matrixGiven[rowIterator][colIterator];
            if (cellValue === '1') {
                heightsTracker[colIterator]++;
            } else {
                heightsTracker[colIterator] = 0;
            }
        }

        let currentHistogramMax = 0;
        const monotonicStack = [];

        for (let barPosition = 0; barPosition <= totalCols; barPosition++) {
            const effectiveHeight = (barPosition === totalCols) ? 0 : heightsTracker[barPosition];

            while (monotonicStack.length > 0 && effectiveHeight < heightsTracker[monotonicStack[monotonicStack.length - 1]]) {
                const poppedPosition = monotonicStack.pop();
                const heightFromPopped = heightsTracker[poppedPosition];
                const stackTopForWidth = monotonicStack.length > 0 ? monotonicStack[monotonicStack.length - 1] : -1;
                const calculatedWidth = barPosition - stackTopForWidth - 1;
                const areaCandidate = heightFromPopped * calculatedWidth;
                currentHistogramMax = Math.max(currentHistogramMax, areaCandidate);
            }
            monotonicStack.push(barPosition);
        }
        maxRectangleFound = Math.max(maxRectangleFound, currentHistogramMax);
    }

    return maxRectangleFound;
};