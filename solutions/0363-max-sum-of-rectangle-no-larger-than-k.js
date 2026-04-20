/**
 * Max Sum Of Rectangle No Larger Than K
 * Time Complexity: O(R^2 * C^2)
 * Space Complexity: O(R)
*/
var maxSumSubmatrix = function (matrix, k) {
    let overallMaximumSum = -Infinity;
    const totalRows = matrix.length;
    const totalColumns = matrix[0].length;

    for (let leftColumnIndex = 0; leftColumnIndex < totalColumns; leftColumnIndex++) {
        const currentColumnAggregate = new Array(totalRows).fill(0);
        for (let rightColumnIndex = leftColumnIndex; rightColumnIndex < totalColumns; rightColumnIndex++) {
            for (let rowIteratorIndex = 0; rowIteratorIndex < totalRows; rowIteratorIndex++) {
                currentColumnAggregate[rowIteratorIndex] += matrix[rowIteratorIndex][rightColumnIndex];
            }

            const seenPrefixSums = new Set();
            seenPrefixSums.add(0);
            let currentRunningSum = 0;
            let maximumRectangleSumForCurrentRange = -Infinity;

            for (const colSumElement of currentColumnAggregate) {
                currentRunningSum += colSumElement;

                for (const storedPrefixValue of seenPrefixSums) {
                    const candidateRectangleSum = currentRunningSum - storedPrefixValue;
                    if (candidateRectangleSum <= k) {
                        maximumRectangleSumForCurrentRange = Math.max(maximumRectangleSumForCurrentRange, candidateRectangleSum);
                    }
                }
                seenPrefixSums.add(currentRunningSum);
            }
            overallMaximumSum = Math.max(overallMaximumSum, maximumRectangleSumForCurrentRange);
        }
    }

    return overallMaximumSum;
};