/**
 * Minimum Number of Flips to Make Binary Grid Palindromic II
 * Intuition: Both rows and columns must be palindromes, and the number of 1s must be divisible by 4. Independent 4-cycles, middle-row/column pairs, and the center cell are handled separately.
 * Approach: 1. For each 4-cell orbit, flip to all 0s or all 1s, whichever is cheaper. 2. Count mismatched pairs and ones on the middle row/column. 3. If no mismatches and ones % 4 == 2, add 2 flips; else add the mismatch count. 4. Flip a center 1 to 0 if both dimensions are odd.
 * Dry Run: grid = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]. Corner orbit ones = 2, cost 2. Middle pairs mismatch, add 2. Center is 1, add 1. Answer 5? Independent check: actually corner 4-cells of 3x3 exclude center. Follow code on this grid: m=n=3, one orbit (0,0): cells 1,0,0,1 ones=2 cost 2. Middle row pair (0,0) mismatch 0; wait left=0 right=0. Middle col pair top=0 bottom=0. mismatched=0, middleOnes=0, center=1. Answer 3.
 * Time Complexity: O(m n)
 * Space Complexity: O(1)
 */
var minFlips = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  let flips = 0;
  let middleOnes = 0;
  let mismatchedPairs = 0;

  for (let i = 0; i < Math.floor(rowCount / 2); i++) {
    for (let j = 0; j < Math.floor(columnCount / 2); j++) {
      const ones =
        grid[i][j] +
        grid[i][columnCount - 1 - j] +
        grid[rowCount - 1 - i][j] +
        grid[rowCount - 1 - i][columnCount - 1 - j];
      flips += Math.min(ones, 4 - ones);
    }
  }

  if (rowCount % 2 === 1) {
    const middleRow = Math.floor(rowCount / 2);
    for (let j = 0; j < Math.floor(columnCount / 2); j++) {
      const leftCell = grid[middleRow][j];
      const rightCell = grid[middleRow][columnCount - 1 - j];
      mismatchedPairs += leftCell ^ rightCell;
      middleOnes += leftCell + rightCell;
    }
  }

  if (columnCount % 2 === 1) {
    const middleColumn = Math.floor(columnCount / 2);
    for (let i = 0; i < Math.floor(rowCount / 2); i++) {
      const topCell = grid[i][middleColumn];
      const bottomCell = grid[rowCount - 1 - i][middleColumn];
      mismatchedPairs += topCell ^ bottomCell;
      middleOnes += topCell + bottomCell;
    }
  }

  if (mismatchedPairs === 0) {
    if (middleOnes % 4 === 2) {
      flips += 2;
    }
  } else {
    flips += mismatchedPairs;
  }

  if (rowCount % 2 === 1 && columnCount % 2 === 1) {
    flips += grid[Math.floor(rowCount / 2)][Math.floor(columnCount / 2)];
  }

  return flips;
};
