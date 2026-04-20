/**
 * Kth Smallest Element In A Sorted Matrix
 * Time Complexity: O(N * log(MAX_VAL - MIN_VAL))
 * Space Complexity: O(1)
*/
var kthSmallest = function (matrixParam, kParam) {
    const matrixDimension = matrixParam.length;

    let searchRangeLow = matrixParam[0][0];
    let searchRangeHigh = matrixParam[matrixDimension - 1][matrixDimension - 1];
    let finalKthElement = matrixParam[0][0];

    const evaluateCountAndMax = (currentTarget) => {
        let elementsBelowTarget = 0;
        let maximumFound = -Infinity;

        let rowIndexIterator = 0;
        let colIndexIterator = matrixDimension - 1;

        while (rowIndexIterator < matrixDimension && colIndexIterator >= 0) {
            if (matrixParam[rowIndexIterator][colIndexIterator] <= currentTarget) {
                elementsBelowTarget += (colIndexIterator + 1);
                maximumFound = Math.max(maximumFound, matrixParam[rowIndexIterator][colIndexIterator]);
                rowIndexIterator++;
            } else {
                colIndexIterator--;
            }
        }
        return [elementsBelowTarget, maximumFound];
    };

    while (searchRangeLow <= searchRangeHigh) {
        const pivotValue = searchRangeLow + Math.floor((searchRangeHigh - searchRangeLow) / 2);
        const [currentElementsCount, largestValueSeen] = evaluateCountAndMax(pivotValue);

        if (currentElementsCount < kParam) {
            searchRangeLow = pivotValue + 1;
        } else {
            finalKthElement = largestValueSeen;
            searchRangeHigh = pivotValue - 1;
        }
    }

    return finalKthElement;
};