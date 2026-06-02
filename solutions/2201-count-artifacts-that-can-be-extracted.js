/**
 * Count Artifacts That Can Be Extracted
 * Intuition: To extract an artifact, every grid cell it occupies must be excavated. We can pre-mark all excavated cells in a grid for efficient lookup, then iterate through each artifact to verify if all its constituent cells are marked as excavated.
 * Approach: 1. Create a 2D boolean array, `excavationStatusGrid`, of size `n` by `n` to represent the grid, initially marking all cells as not excavated (false). 2. Iterate through the `dig` array, and for each dug cell `[row, col]`, set `excavationStatusGrid[row][col]` to `true`. 3. Initialize a counter `totalExtractedArtifacts` to zero. 4. Iterate through the `artifacts` array. For each artifact `[r1, c1, r2, c2]`, calculate the `expectedCellCount` it covers. Then, iterate through all cells `(r, c)` within its boundaries. If `excavationStatusGrid[r][c]` is `true`, increment a `currentArtifactDugCells` counter. 5. After checking all cells for an artifact, if `currentArtifactDugCells` equals `expectedCellCount`, increment `totalExtractedArtifacts`. 6. Return `totalExtractedArtifacts`.
 * Dry Run: n = 2, artifacts = [[0,0,0,0], [1,1,1,1]], dig = [[0,0], [1,1]]
 * 1. nGridDimension = 2.
 * 2. excavationStatusGrid = [[false, false], [false, false]].
 * 3. totalExtractedArtifacts = 0.
 * 4. Process dig:
 *    - digPointer = 0: currentDigSite = [0,0]. digRowCoord = 0, digColCoord = 0. excavationStatusGrid[0][0] = true.
 *      excavationStatusGrid becomes [[true, false], [false, false]].
 *    - digPointer = 1: nextDigSite = [1,1]. nextDigRowCoord = 1, nextDigColCoord = 1. excavationStatusGrid[1][1] = true.
 *      excavationStatusGrid becomes [[true, false], [false, true]].
 * 5. Process artifacts:
 *    - artifactPointer = 0: currentArtifactLayout = [0,0,0,0].
 *      artifactUpperRow = 0, artifactUpperCol = 0, artifactLowerRow = 0, artifactLowerCol = 0.
 *      expectedCellCount = (0-0+1) * (0-0+1) = 1.
 *      currentArtifactDugCells = 0.
 *      Inner loops (rowScan = 0, colScan = 0): excavationStatusGrid[0][0] is true. currentArtifactDugCells becomes 1.
 *      currentArtifactDugCells (1) === expectedCellCount (1). Increment totalExtractedArtifacts. totalExtractedArtifacts = 1.
 *    - artifactPointer = 1: nextArtifactLayout = [1,1,1,1].
 *      nextArtifactUpperRow = 1, nextArtifactUpperCol = 1, nextArtifactLowerRow = 1, nextArtifactLowerCol = 1.
 *      expectedCellCount = (1-1+1) * (1-1+1) = 1.
 *      currentArtifactDugCells = 0.
 *      Inner loops (rowScan = 1, colScan = 1): excavationStatusGrid[1][1] is true. currentArtifactDugCells becomes 1.
 *      currentArtifactDugCells (1) === expectedCellCount (1). Increment totalExtractedArtifacts. totalExtractedArtifacts = 2.
 * 6. Return totalExtractedArtifacts (2).
 * Time Complexity: O(n^2 + D + A * C_max)
 * Space Complexity: O(n^2)
 */
var digArtifacts = function (n, artifacts, dig) {
  const excavationStatusGrid = Array(n)
    .fill(0)
    .map(() => Array(n).fill(false));
  let totalExtractedArtifacts = 0;

  for (let digPointer = 0; digPointer < dig.length; digPointer++) {
    const currentDigSite = dig[digPointer];
    const digRowCoord = currentDigSite[0];
    const digColCoord = currentDigSite[1];
    excavationStatusGrid[digRowCoord][digColCoord] = true;
  }

  for (
    let artifactPointer = 0;
    artifactPointer < artifacts.length;
    artifactPointer++
  ) {
    const currentArtifactLayout = artifacts[artifactPointer];
    const artifactUpperRow = currentArtifactLayout[0];
    const artifactUpperCol = currentArtifactLayout[1];
    const artifactLowerRow = currentArtifactLayout[2];
    const artifactLowerCol = currentArtifactLayout[3];

    const expectedCellCount =
      (artifactLowerRow - artifactUpperRow + 1) *
      (artifactLowerCol - artifactUpperCol + 1);
    let currentArtifactDugCells = 0;

    for (
      let rowScan = artifactUpperRow;
      rowScan <= artifactLowerRow;
      rowScan++
    ) {
      for (
        let colScan = artifactUpperCol;
        colScan <= artifactLowerCol;
        colScan++
      ) {
        if (excavationStatusGrid[rowScan][colScan]) {
          currentArtifactDugCells++;
        }
      }
    }

    if (currentArtifactDugCells === expectedCellCount) {
      totalExtractedArtifacts++;
    }
  }

  return totalExtractedArtifacts;
};
