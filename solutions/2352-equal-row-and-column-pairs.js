/**
 * Equal Row And Column Pairs
 * Intuition: The most straightforward way to find equal row and column pairs is to compare every single row with every single column, element by element.
 * Approach: 1. Initialize a counter for equal pairs. 2. Determine the dimension of the square grid. 3. Iterate through each row of the grid. 4. For each row, iterate through each column of the grid. 5. For the current row and column, assume they are equal and perform an element-wise comparison using a third nested loop. 6. If any element comparison fails, mark them as unequal and break the innermost loop. 7. If after comparing all elements the row and column are still marked as equal, increment the pair counter. 8. Return the final count.
 * Dry Run: grid = [[3,2,1],[1,7,6],[2,7,7]]
 * matrixDimension = 3
 * totalPairs = 0
 *
 * outerRowIterator = 0 (Current Row: [3,2,1])
 *   innerColumnIterator = 0 (Current Col: [3,1,2])
 *     isMatch = true
 *     elementChecker = 0: grid[0][0] (3) == grid[0][0] (3) -> true
 *     elementChecker = 1: grid[0][1] (2) == grid[1][0] (1) -> false. isMatch = false. Break.
 *   (isMatch is false, totalPairs remains 0)
 *
 *   innerColumnIterator = 1 (Current Col: [2,7,7])
 *     isMatch = true
 *     elementChecker = 0: grid[0][0] (3) == grid[0][1] (2) -> false. isMatch = false. Break.
 *   (isMatch is false, totalPairs remains 0)
 *
 *   innerColumnIterator = 2 (Current Col: [1,6,7])
 *     isMatch = true
 *     elementChecker = 0: grid[0][0] (3) == grid[0][2] (1) -> false. isMatch = false. Break.
 *   (isMatch is false, totalPairs remains 0)
 *
 * outerRowIterator = 1 (Current Row: [1,7,6])
 *   innerColumnIterator = 0 (Current Col: [3,1,2])
 *     isMatch = true
 *     elementChecker = 0: grid[1][0] (1) == grid[0][0] (3) -> false. isMatch = false. Break.
 *   (isMatch is false, totalPairs remains 0)
 *
 *   innerColumnIterator = 1 (Current Col: [2,7,7])
 *     isMatch = true
 *     elementChecker = 0: grid[1][0] (1) == grid[0][1] (2) -> false. isMatch = false. Break.
 *   (isMatch is false, totalPairs remains 0)
 *
 *   innerColumnIterator = 2 (Current Col: [1,6,7])
 *     isMatch = true
 *     elementChecker = 0: grid[1][0] (1) == grid[0][2] (1) -> true
 *     elementChecker = 1: grid[1][1] (7) == grid[1][2] (6) -> false. isMatch = false. Break.
 *   (isMatch is false, totalPairs remains 0)
 *
 * outerRowIterator = 2 (Current Row: [2,7,7])
 *   innerColumnIterator = 0 (Current Col: [3,1,2])
 *     isMatch = true
 *     elementChecker = 0: grid[2][0] (2) == grid[0][0] (3) -> false. isMatch = false. Break.
 *   (isMatch is false, totalPairs remains 0)
 *
 *   innerColumnIterator = 1 (Current Col: [2,7,7])
 *     isMatch = true
 *     elementChecker = 0: grid[2][0] (2) == grid[0][1] (2) -> true
 *     elementChecker = 1: grid[2][1] (7) == grid[1][1] (7) -> true
 *     elementChecker = 2: grid[2][2] (7) == grid[2][1] (7) -> true
 *   (isMatch is true, totalPairs becomes 1)
 *
 *   innerColumnIterator = 2 (Current Col: [1,6,7])
 *     isMatch = true
 *     elementChecker = 0: grid[2][0] (2) == grid[0][2] (1) -> false. isMatch = false. Break.
 *   (isMatch is false, totalPairs remains 1)
 *
 * Return totalPairs = 1.
 * Time Complexity: O(N^3)
 * Space Complexity: O(1)
 */
var equalPairs = function (grid) {
  const matrixDimension = grid.length;
  let totalPairs = 0;

  for (
    let outerRowIterator = 0;
    outerRowIterator < matrixDimension;
    outerRowIterator++
  ) {
    for (
      let innerColumnIterator = 0;
      innerColumnIterator < matrixDimension;
      innerColumnIterator++
    ) {
      let isMatch = true;
      for (
        let elementChecker = 0;
        elementChecker < matrixDimension;
        elementChecker++
      ) {
        if (
          grid[outerRowIterator][elementChecker] !==
          grid[elementChecker][innerColumnIterator]
        ) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) {
        totalPairs++;
      }
    }
  }

  return totalPairs;
};
