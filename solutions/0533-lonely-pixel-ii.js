/**
 * Lonely Pixel II
 * Intuition: A black is valid when its row and column each have exactly `target` blacks and every row that has a black in that column is identical. Count row patterns that already have `target` blacks, then score whole columns.
 * Approach: 1. Count blacks per row/col; for rows with count===target, increment `patternMap` of the joined row. 2. For each column with count===target, find a black in a row with count===target whose pattern appears exactly `target` times; add `target` and break that column.
 * Dry Run: picture rows ["WBB","WBB"], target=2.
 *   - Both rows identical with 2 blacks; cols 1 and 2 have 2 blacks. Each such col adds 2. Return 4.
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
var findBlackPixel = function (picture, target) {
  const dimensionOne = picture.length;
  const dimensionTwo = picture[0].length;

  const rPixelCounts = new Array(dimensionOne).fill(0);
  const cPixelCounts = new Array(dimensionTwo).fill(0);
  const patternMap = new Map();

  for (let primaryIdx = 0; primaryIdx < dimensionOne; primaryIdx++) {
    let currentBlackCount = 0;
    for (let secondaryIdx = 0; secondaryIdx < dimensionTwo; secondaryIdx++) {
      if (picture[primaryIdx][secondaryIdx] === "B") {
        currentBlackCount++;
        cPixelCounts[secondaryIdx]++;
      }
    }
    rPixelCounts[primaryIdx] = currentBlackCount;
    if (currentBlackCount === target) {
      const rowString = picture[primaryIdx].join("");
      patternMap.set(rowString, (patternMap.get(rowString) || 0) + 1);
    }
  }

  let finalCount = 0;
  for (let colIterator = 0; colIterator < dimensionTwo; colIterator++) {
    if (cPixelCounts[colIterator] === target) {
      for (let rowIterator = 0; rowIterator < dimensionOne; rowIterator++) {
        if (
          picture[rowIterator][colIterator] === "B" &&
          rPixelCounts[rowIterator] === target
        ) {
          const rowSignature = picture[rowIterator].join("");
          if (patternMap.get(rowSignature) === target) {
            finalCount += target;
            break;
          }
        }
      }
    }
  }

  return finalCount;
};
