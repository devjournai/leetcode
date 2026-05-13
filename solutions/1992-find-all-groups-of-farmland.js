/**
 * Find All Groups Of Farmland
 * Intuition: Farmland groups are rectangular and non-adjacent. When iterating through the matrix, the first '1' encountered must be the top-left corner of a new group. From this point, expand downwards and rightwards to find the bottom-right corner.
 * Approach: 1. Initialize an empty list to store farmland group coordinates. 2. Iterate through each cell of the input matrix. 3. If a cell contains '1', identify it as the top-left corner (r1, c1) of a new group. 4. From this (r1, c1), extend downwards to find r2 (the bottom row index) and extend rightwards to find c2 (the rightmost column index). 5. Store the group [r1, c1, r2, c2] in the result list. 6. To prevent re-processing, mark all cells within this identified group (from r1 to r2, and c1 to c2) as '0'. 7. Continue iterating until all cells are checked.
 * Dry Run: land = [[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]
 *   - matrixRowsCount = 4, matrixColsCount = 4, farmlandGroups = []
 *   - iterateRow = 0, iterateCol = 0: farmlandMatrix[0][0] is 1.
 *     - topLeftRow = 0, topLeftCol = 0.
 *     - expandRowLimit = 0, expandColLimit = 0.
 *     - Expand expandRowLimit: land[1][0] is 1 -> expandRowLimit = 1. land[2][0] is 0 -> stop. expandRowLimit = 1.
 *     - Expand expandColLimit: land[0][1] is 1 -> expandColLimit = 1. land[0][2] is 0 -> stop. expandColLimit = 1.
 *     - farmlandGroups.push([0, 0, 1, 1]).
 *     - Mark land[0..1][0..1] as 0. farmlandMatrix becomes [[0,0,0,0],[0,0,0,0],[0,0,1,1],[0,0,1,1]].
 *   - iterateRow = 0, iterateCol = 1 to 3: Cells are 0.
 *   - iterateRow = 1, iterateCol = 0 to 3: Cells are 0.
 *   - iterateRow = 2, iterateCol = 0, 1: Cells are 0.
 *   - iterateRow = 2, iterateCol = 2: farmlandMatrix[2][2] is 1.
 *     - topLeftRow = 2, topLeftCol = 2.
 *     - expandRowLimit = 2, expandColLimit = 2.
 *     - Expand expandRowLimit: land[3][2] is 1 -> expandRowLimit = 3. land[4][2] out of bounds -> stop. expandRowLimit = 3.
 *     - Expand expandColLimit: land[2][3] is 1 -> expandColLimit = 3. land[2][4] out of bounds -> stop. expandColLimit = 3.
 *     - farmlandGroups.push([2, 2, 3, 3]).
 *     - Mark land[2..3][2..3] as 0. farmlandMatrix becomes all 0s.
 *   - Continue iteration, no more 1s.
 *   - Return [[0, 0, 1, 1], [2, 2, 3, 3]].
 * Time Complexity: O(m*n)
 * Space Complexity: O(k)
 */
var findFarmland = function (land) {
  const matrixRowsCount = land.length;
  const matrixColsCount = land[0].length;
  const farmlandGroups = [];

  for (let iterateRow = 0; iterateRow < matrixRowsCount; iterateRow++) {
    for (let iterateCol = 0; iterateCol < matrixColsCount; iterateCol++) {
      if (land[iterateRow][iterateCol] === 1) {
        const topLeftRow = iterateRow;
        const topLeftCol = iterateCol;

        let expandRowLimit = topLeftRow;
        let expandColLimit = topLeftCol;

        while (
          expandRowLimit + 1 < matrixRowsCount &&
          land[expandRowLimit + 1][topLeftCol] === 1
        ) {
          expandRowLimit++;
        }

        while (
          expandColLimit + 1 < matrixColsCount &&
          land[topLeftRow][expandColLimit + 1] === 1
        ) {
          expandColLimit++;
        }

        farmlandGroups.push([
          topLeftRow,
          topLeftCol,
          expandRowLimit,
          expandColLimit,
        ]);

        for (
          let markRowPtr = topLeftRow;
          markRowPtr <= expandRowLimit;
          markRowPtr++
        ) {
          for (
            let markColPtr = topLeftCol;
            markColPtr <= expandColLimit;
            markColPtr++
          ) {
            land[markRowPtr][markColPtr] = 0;
          }
        }
      }
    }
  }

  return farmlandGroups;
};
