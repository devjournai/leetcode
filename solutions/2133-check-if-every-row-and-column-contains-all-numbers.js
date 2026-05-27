/**
 * Check If Every Row And Column Contains All Numbers
 * Intuition: A valid matrix requires each row and each column to contain a full set of numbers from 1 to N. Using a Set is an efficient way to track unique numbers encountered, and its size will reveal if all N unique numbers are present.
 * Approach: 1. Determine the dimension `n` of the square matrix. 2. Iterate from `0` to `n-1` using an outer loop counter. 3. Inside this loop, for each iteration, initialize two new Sets: one for the current row and one for the current column being examined. 4. Use an inner loop counter, also iterating from `0` to `n-1`, to populate these sets. For the row set, add `matrix[outerLoopCounter][innerLoopCounter]`. For the column set, add `matrix[innerLoopCounter][outerLoopCounter]`. 5. After the inner loop completes, check if the size of either the current row set or the current column set is not equal to `n`. If so, the matrix is invalid, and `false` is returned immediately. 6. If both loops complete without returning `false`, it means all rows and columns are valid, so `true` is returned.
 * Dry Run: matrix = [[1,2,3],[3,1,2],[2,3,1]]
 * n = 3
 * outerLoopIndex = 0:
 *   currentIterationRowSet = {}
 *   currentIterationColumnSet = {}
 *   innerLoopIndex = 0: currentIterationRowSet.add(matrix[0][0]=1) -> {1}; currentIterationColumnSet.add(matrix[0][0]=1) -> {1}
 *   innerLoopIndex = 1: currentIterationRowSet.add(matrix[0][1]=2) -> {1,2}; currentIterationColumnSet.add(matrix[1][0]=3) -> {1,3}
 *   innerLoopIndex = 2: currentIterationRowSet.add(matrix[0][2]=3) -> {1,2,3}; currentIterationColumnSet.add(matrix[2][0]=2) -> {1,3,2}
 *   End inner loop. currentIterationRowSet.size (3) === n (3). currentIterationColumnSet.size (3) === n (3). Continue.
 * outerLoopIndex = 1:
 *   currentIterationRowSet = {}
 *   currentIterationColumnSet = {}
 *   innerLoopIndex = 0: currentIterationRowSet.add(matrix[1][0]=3) -> {3}; currentIterationColumnSet.add(matrix[0][1]=2) -> {2}
 *   innerLoopIndex = 1: currentIterationRowSet.add(matrix[1][1]=1) -> {3,1}; currentIterationColumnSet.add(matrix[1][1]=1) -> {2,1}
 *   innerLoopIndex = 2: currentIterationRowSet.add(matrix[1][2]=2) -> {3,1,2}; currentIterationColumnSet.add(matrix[2][1]=3) -> {2,1,3}
 *   End inner loop. currentIterationRowSet.size (3) === n (3). currentIterationColumnSet.size (3) === n (3). Continue.
 * outerLoopIndex = 2:
 *   currentIterationRowSet = {}
 *   currentIterationColumnSet = {}
 *   innerLoopIndex = 0: currentIterationRowSet.add(matrix[2][0]=2) -> {2}; currentIterationColumnSet.add(matrix[0][2]=3) -> {3}
 *   innerLoopIndex = 1: currentIterationRowSet.add(matrix[2][1]=3) -> {2,3}; currentIterationColumnSet.add(matrix[1][2]=2) -> {3,2}
 *   innerLoopIndex = 2: currentIterationRowSet.add(matrix[2][2]=1) -> {2,3,1}; currentIterationColumnSet.add(matrix[2][2]=1) -> {3,2,1}
 *   End inner loop. currentIterationRowSet.size (3) === n (3). currentIterationColumnSet.size (3) === n (3). Continue.
 * All loops complete. Return true.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var checkValid = function (matrix) {
  const matrixDimension = matrix.length;

  for (
    let outerLoopIndex = 0;
    outerLoopIndex < matrixDimension;
    outerLoopIndex++
  ) {
    const currentIterationRowSet = new Set();
    const currentIterationColumnSet = new Set();

    for (
      let innerLoopIndex = 0;
      innerLoopIndex < matrixDimension;
      innerLoopIndex++
    ) {
      const rowValue = matrix[outerLoopIndex][innerLoopIndex];
      currentIterationRowSet.add(rowValue);

      const columnValue = matrix[innerLoopIndex][outerLoopIndex];
      currentIterationColumnSet.add(columnValue);
    }

    if (
      currentIterationRowSet.size !== matrixDimension ||
      currentIterationColumnSet.size !== matrixDimension
    ) {
      return false;
    }
  }

  return true;
};
