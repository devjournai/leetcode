/**
 * Flood Fill
 * Intuition: Recolor the 4-connected component that matches the start pixel. If the start color already equals `newColor`, do nothing to avoid infinite recursion.
 * Approach: 1. Read `initialPixelValue` at (sr, sc). 2. If it equals `newColor`, return the image. 3. DFS `traverseAndRecolor` writes `newColor` and recurses in four directions while the cell still equals the original color.
 * Dry Run: Start (1,1) color 1, newColor 2. The connected 1s become 2; a disconnected 1 is unchanged.
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
