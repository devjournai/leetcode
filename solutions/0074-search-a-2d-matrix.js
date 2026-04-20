/**
 * Search A 2d Matrix
 * Time Complexity: O(log(m*n))
 * Space Complexity: O(1)
*/
var searchMatrix = function (matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    let leftBound = 0;
    let rightBound = rowCount * colCount - 1;

    while (leftBound <= rightBound) {
        let midPosition = Math.floor((leftBound + rightBound) / 2);
        let midRow = Math.floor(midPosition / colCount);
        let midCol = midPosition % colCount;
        let currentValue = matrix[midRow][midCol];

        if (currentValue === target) {
            return true;
        } else if (currentValue < target) {
            leftBound = midPosition + 1;
        } else {
            rightBound = midPosition - 1;
        }
    }

    return false;
};