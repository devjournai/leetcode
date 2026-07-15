/**
 * Find A Good Subset Of The Matrix
 * Intuition: The problem asks for *any* good subset. The condition for a good subset of length `k` is that each column sum must be at most `floor(k/2)`.
 * If `k=1`, `floor(1/2) = 0`. This means an all-zero row forms a good subset.
 * If `k=2`, `floor(2/2) = 1`. This means two rows `r1` and `r2` form a good subset if for every column `j`, `r1[j] + r2[j] <= 1`. In binary terms, this means there is no column `j` where both `r1[j]` and `r2[j]` are `1`. This is equivalent to `(mask_r1 & mask_r2) === 0` if rows are represented as bitmasks.
 * The constraints (`n` up to 5) suggest using bitmasks for rows. Since the problem asks for *any* good subset, checking for subsets of size 1 and 2 covers the most straightforward cases and is sufficient for this problem, especially given `n` is so small (`2^5 = 32` unique row patterns).
 * Approach:
 * 1. Initialize `numRows` and `numCols` from the input `grid`.
 * 2. Create a `Map` called `rowPatternToOriginalIndex` to store each unique row's bitmask and its original row index (`mask -> index`).
 * 3. Iterate `rowIterator` from `0` to `numRows - 1`:
 *    a. For each row, calculate its `currentMask` by setting bits corresponding to `1`s in the row.
 *    b. If `currentMask` is `0`, it means this row is an all-zero row. Return `[rowIterator]` immediately as this is a good subset of size 1.
 *    c. Store the `currentMask` and `rowIterator` in `rowPatternToOriginalIndex`. If a mask already exists, any associated index is fine, so `Map.set` will store the latest one encountered.
 * 4. After processing all rows, iterate through all unique mask-index pairs stored in `rowPatternToOriginalIndex` using nested loops (`firstMaskEntry`, `secondMaskEntry`).
 * 5. For each pair, check if their bitwise AND (`firstMaskValue & secondMaskValue`) is `0`.
 *    a. If it is `0`, these two rows form a good subset of size 2. Create an array with their original indices (`firstMaskIndex`, `secondMaskIndex`), sort it to meet the output requirement, and return it.
 * 6. If no good subset of size 1 or 2 is found after all checks, return an empty array `[]`.
 * Dry Run: grid = [[0,1,1,0],[0,0,0,1],[1,1,0,0]]
 * numRows = 3, numCols = 4
 * rowPatternToOriginalIndex = new Map()
 *
 * rowIterator = 0: grid[0] = [0,1,1,0]
 *   currentMask = (1 << 1) | (1 << 2) = 2 | 4 = 6 (binary 0110). Not 0.
 *   rowPatternToOriginalIndex.set(6, 0) => Map { 6 => 0 }
 *
 * rowIterator = 1: grid[1] = [0,0,0,1]
 *   currentMask = (1 << 3) = 8 (binary 1000). Not 0.
 *   rowPatternToOriginalIndex.set(8, 1) => Map { 6 => 0, 8 => 1 }
 *
 * rowIterator = 2: grid[2] = [1,1,0,0]
 *   currentMask = (1 << 0) | (1 << 1) = 1 | 2 = 3 (binary 0011). Not 0.
 *   rowPatternToOriginalIndex.set(3, 2) => Map { 6 => 0, 8 => 1, 3 => 2 }
 *
 * End of first loop. No all-zero row found.
 *
 * Start nested loops through rowPatternToOriginalIndex:
 * firstMaskEntry = [6, 0] (firstMaskValue = 6, firstMaskIndex = 0)
 *   secondMaskEntry = [6, 0] (secondMaskValue = 6, secondMaskIndex = 0)
 *     (6 & 6) = 6. Not 0.
 *   secondMaskEntry = [8, 1] (secondMaskValue = 8, secondMaskIndex = 1)
 *     (6 & 8) = (0110_2 & 1000_2) = 0. Condition met!
 *     Create resultIndices = [firstMaskIndex, secondMaskIndex] = [0, 1].
 *     Sort resultIndices => [0, 1].
 *     Return [0, 1].
 *
 * Time Complexity: O(m * n + (min(m, 2^n))^2)
 * Space Complexity: O(min(m, 2^n))
 */
var goodSubsetofBinaryMatrix = function (grid) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const rowPatternToOriginalIndex = new Map();

  for (let rowIterator = 0; rowIterator < numRows; rowIterator++) {
    let currentMask = 0;
    for (let colIterator = 0; colIterator < numCols; colIterator++) {
      if (grid[rowIterator][colIterator] === 1) {
        currentMask |= 1 << colIterator;
      }
    }
    if (currentMask === 0) {
      return [rowIterator];
    }
    rowPatternToOriginalIndex.set(currentMask, rowIterator);
  }

  for (const [firstMaskValue, firstMaskIndex] of rowPatternToOriginalIndex) {
    for (const [
      secondMaskValue,
      secondMaskIndex,
    ] of rowPatternToOriginalIndex) {
      if ((firstMaskValue & secondMaskValue) === 0) {
        const resultIndices = [firstMaskIndex, secondMaskIndex];
        resultIndices.sort((a, b) => a - b);
        return resultIndices;
      }
    }
  }

  return [];
};
