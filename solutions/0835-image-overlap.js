/**
 * Image Overlap
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
