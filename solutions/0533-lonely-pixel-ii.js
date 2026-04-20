/**
 * Lonely Pixel II
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
