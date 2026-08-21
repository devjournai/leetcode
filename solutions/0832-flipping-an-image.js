/**
 * Flipping An Image
 * Intuition: Reverse each row and invert bits in one two-pointer pass: swap the pair while XOR-flipping via `1 - value`, and invert the middle cell when pointers meet.
 * Approach: 1. For each row, set `leftBoundPointer`/`rightBoundPointer`. 2. While left ≤ right, if equal set that cell to `1 - left`; else write `1 - right` on the left and `1 - left` on the right. 3. Move pointers inward. 4. Return `image` in place.
 * Dry Run: image = [[1,1,0],[1,0,1],[0,0,0]].
 *   Row [1,1,0]: swap+invert → [1,0,0]. Row [1,0,1] → [0,1,0]. Row [0,0,0] → [1,1,1]. Result [[1,0,0],[0,1,0],[1,1,1]].
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
