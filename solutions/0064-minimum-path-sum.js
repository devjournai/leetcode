/**
 * Minimum Path Sum
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
*/
var minPathSum = function (grid) {
    const totalRows = grid.length;
    const totalColumns = grid[0].length;

    const dpStorage = Array(totalRows).fill(null).map(() => Array(totalColumns).fill(0));

    dpStorage[0][0] = grid[0][0];

    for (let colIterator = 1; colIterator < totalColumns; colIterator++) {
        dpStorage[0][colIterator] = dpStorage[0][colIterator - 1] + grid[0][colIterator];
    }

    for (let rowIterator = 1; rowIterator < totalRows; rowIterator++) {
        dpStorage[rowIterator][0] = dpStorage[rowIterator - 1][0] + grid[rowIterator][0];
    }

    for (let computeRow = 1; computeRow < totalRows; computeRow++) {
        for (let computeCol = 1; computeCol < totalColumns; computeCol++) {
            const valueFromAbove = dpStorage[computeRow - 1][computeCol];
            const valueFromLeft = dpStorage[computeRow][computeCol - 1];
            dpStorage[computeRow][computeCol] = grid[computeRow][computeCol] + Math.min(valueFromAbove, valueFromLeft);
        }
    }

    return dpStorage[totalRows - 1][totalColumns - 1];
};