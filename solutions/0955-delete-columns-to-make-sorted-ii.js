/**
 * Delete Columns to Make Sorted II
 * Time Complexity: O(n * m^2)
 * Space Complexity: O(n * m)
*/
var minDeletionSize = function (strs) {
    const rowCount = strs.length;
    const columnCount = strs[0].length;

    let currentAccumulatedPrefixes = new Array(rowCount).fill('');
    let columnsRemovedTotal = 0;

    for (let currentColumnIndex = 0; currentColumnIndex < columnCount; currentColumnIndex++) {
        const potentialNextPrefixes = currentAccumulatedPrefixes.slice();
        let isColumnKeepable = true;

        let currentRowIndex = 0;
        while (currentRowIndex < rowCount) {
            potentialNextPrefixes[currentRowIndex] += strs[currentRowIndex][currentColumnIndex];

            if (
                currentRowIndex > 0 &&
                potentialNextPrefixes[currentRowIndex] <
                potentialNextPrefixes[currentRowIndex - 1]
            ) {
                isColumnKeepable = false;
                break;
            }
            currentRowIndex++;
        }

        if (isColumnKeepable) {
            currentAccumulatedPrefixes = potentialNextPrefixes;
        } else {
            columnsRemovedTotal++;
        }
    }

    return columnsRemovedTotal;
};
