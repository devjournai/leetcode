/**
 * Count Negative Numbers in a Sorted Matrix
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
*/
var countNegatives = function (grid) {
    const rowsQuantity = grid.length;
    if (rowsQuantity === 0) {
        return 0;
    }

    const columnsQuantity = grid[0].length;
    if (columnsQuantity === 0) {
        return 0;
    }

    let totalNegativeNumbers = 0;
    let currentRowPointer = rowsQuantity - 1;
    let currentColumnPointer = 0;

    while (currentRowPointer >= 0 && currentColumnPointer < columnsQuantity) {
        if (grid[currentRowPointer][currentColumnPointer] < 0) {
            totalNegativeNumbers += (columnsQuantity - currentColumnPointer);
            currentRowPointer--;
        } else {
            currentColumnPointer++;
        }
    }

    return totalNegativeNumbers;
};