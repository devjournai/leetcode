/**
 * Image Overlap
 * Intuition: Collect 1-cells in both images. Each pair of ones implies a translation `(dRow, dCol)` that would stack them; the most frequent translation is the largest overlap.
 * Approach: 1. Gather `imageOneOnes` and `imageTwoOnes`. Empty either → 0. 2. For every pair, key `${row2-row1},${col2-col1}` in `overlapCounts`. 3. Track `maximumOverlap`. 4. Return it.
 * Dry Run: img1 ones at (0,0),(0,1),(1,1),(2,1); img2 at (1,1),(1,2),(2,2).
 *   Translation (1,1) maps three ones → 3.
 * Time Complexity: O(N^4)
 * Space Complexity: O(N^2)
 */
var largestOverlap = function (img1, img2) {
  const imageSize = img1.length;
  const imageOneOnes = [];
  const imageTwoOnes = [];

  for (let rowIndex = 0; rowIndex < imageSize; rowIndex++) {
    for (let colIndex = 0; colIndex < imageSize; colIndex++) {
      if (img1[rowIndex][colIndex] === 1) {
        imageOneOnes.push([rowIndex, colIndex]);
      }
      if (img2[rowIndex][colIndex] === 1) {
        imageTwoOnes.push([rowIndex, colIndex]);
      }
    }
  }

  if (imageOneOnes.length === 0 || imageTwoOnes.length === 0) {
    return 0;
  }

  const overlapCounts = new Map();
  let maximumOverlap = 0;

  for (const pointOne of imageOneOnes) {
    const rowOne = pointOne[0];
    const colOne = pointOne[1];
    for (const pointTwo of imageTwoOnes) {
      const rowTwo = pointTwo[0];
      const colTwo = pointTwo[1];

      const diffRow = rowTwo - rowOne;
      const diffCol = colTwo - colOne;
      const translationKey = `${diffRow},${diffCol}`;

      const currentOverlapVal = (overlapCounts.get(translationKey) || 0) + 1;
      overlapCounts.set(translationKey, currentOverlapVal);
      maximumOverlap = Math.max(maximumOverlap, currentOverlapVal);
    }
  }

  return maximumOverlap;
};
