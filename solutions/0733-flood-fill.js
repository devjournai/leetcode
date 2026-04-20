/**
 * Flood Fill
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var floodFill = function (image, sr, sc, newColor) {
  const gridRowsDimension = image.length;
  const gridColsDimension = image[0].length;
  const initialPixelValue = image[sr][sc];

  if (initialPixelValue === newColor) {
    return image;
  }

  const traverseAndRecolor = (currentRowPosition, currentColPosition) => {
    if (
      currentRowPosition < 0 ||
      currentRowPosition >= gridRowsDimension ||
      currentColPosition < 0 ||
      currentColPosition >= gridColsDimension ||
      image[currentRowPosition][currentColPosition] !== initialPixelValue
    ) {
      return;
    }

    image[currentRowPosition][currentColPosition] = newColor;

    traverseAndRecolor(currentRowPosition + 1, currentColPosition);
    traverseAndRecolor(currentRowPosition - 1, currentColPosition);
    traverseAndRecolor(currentRowPosition, currentColPosition + 1);
    traverseAndRecolor(currentRowPosition, currentColPosition - 1);
  };

  traverseAndRecolor(sr, sc);

  return image;
};
