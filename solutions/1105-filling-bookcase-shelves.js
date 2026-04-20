/**
 * Filling Bookcase Shelves
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minHeightShelves = function (bookDimensions, shelfMaximumWidth) {
  const totalBooks = bookDimensions.length;
  const minimumTotalHeights = new Array(totalBooks + 1).fill(0);

  for (let bookCountIdx = 1; bookCountIdx <= totalBooks; bookCountIdx++) {
    const currentBookActualIndex = bookCountIdx - 1;
    let shelfCurrentWidth = bookDimensions[currentBookActualIndex][0];
    let shelfCurrentMaximumHeight = bookDimensions[currentBookActualIndex][1];

    minimumTotalHeights[bookCountIdx] =
      minimumTotalHeights[bookCountIdx - 1] + shelfCurrentMaximumHeight;

    for (
      let previousBookToCombineIndex = currentBookActualIndex - 1;
      previousBookToCombineIndex >= 0;
      previousBookToCombineIndex--
    ) {
      const addedBookThickness = bookDimensions[previousBookToCombineIndex][0];
      const addedBookHeight = bookDimensions[previousBookToCombineIndex][1];

      if (shelfCurrentWidth + addedBookThickness <= shelfMaximumWidth) {
        shelfCurrentWidth += addedBookThickness;
        shelfCurrentMaximumHeight = Math.max(
          shelfCurrentMaximumHeight,
          addedBookHeight,
        );

        minimumTotalHeights[bookCountIdx] = Math.min(
          minimumTotalHeights[bookCountIdx],
          minimumTotalHeights[previousBookToCombineIndex] +
            shelfCurrentMaximumHeight,
        );
      } else {
        break;
      }
    }
  }

  return minimumTotalHeights[totalBooks];
};
