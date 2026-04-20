/**
 * Flipping An Image
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var flipAndInvertImage = function (image) {
  const matrixRows = image.length;

  for (let rowIterator = 0; rowIterator < matrixRows; rowIterator++) {
    let currentRowReference = image[rowIterator];
    let rowCellCount = currentRowReference.length;

    let leftBoundPointer = 0;
    let rightBoundPointer = rowCellCount - 1;

    while (leftBoundPointer <= rightBoundPointer) {
      let leftCellOriginalValue = currentRowReference[leftBoundPointer];
      let rightCellOriginalValue = currentRowReference[rightBoundPointer];

      if (leftBoundPointer === rightBoundPointer) {
        currentRowReference[leftBoundPointer] = 1 - leftCellOriginalValue;
      } else {
        currentRowReference[leftBoundPointer] = 1 - rightCellOriginalValue;
        currentRowReference[rightBoundPointer] = 1 - leftCellOriginalValue;
      }

      leftBoundPointer++;
      rightBoundPointer--;
    }
  }

  return image;
};
