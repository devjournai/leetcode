/**
 * Search A 2d Matrix
 * Intuition: Rows are sorted and each row starts after the previous, so the matrix is one sorted array of length m*n; binary search that 1D index and map it back to (row, col).
 * Approach: 1. Reject empty matrices. 2. Binary search on [0, m*n-1]. 3. Map mid to row = mid / cols, col = mid % cols. 4. Compare matrix[row][col] to target and shrink left or right.
 * Dry Run: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target=3 → mid of 0..11 is 5 → value 11 > 3 → search left → hit 3 → true
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
