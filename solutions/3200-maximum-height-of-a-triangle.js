/**
 * Maximum Height Of A Triangle
 * Intuition: Rows need 1, 2, 3, ... balls and colors must alternate. Try both starting colors and greedily fill rows until a color runs out.
 * Approach: 1. Define a helper that builds the triangle starting with firstColorCount on odd rows and secondColorCount on even rows. 2. Repeatedly subtract the next row size from the matching color. 3. Return the maximum height of the two starting choices.
 * Dry Run:
 *   red = 2, blue = 4
 *   Start red: row1 uses 1 red (1 left), row2 uses 2 blue (2 left), row3 uses 3 but only 1 red -> height 2.
 *   Start blue: row1 uses 1 blue (3), row2 uses 2 red (0), row3 uses 3 blue (0) -> height 3.
 * Time Complexity: O(sqrt(red + blue))
 * Space Complexity: O(1)
 */
var maxHeightOfTriangle = function (red, blue) {
  const buildHeight = (firstColorCount, secondColorCount) => {
    let currentRowSize = 1;
    let isFirstColorRow = true;
    let height = 0;
    while (true) {
      if (isFirstColorRow) {
        if (firstColorCount < currentRowSize) {
          break;
        }
        firstColorCount -= currentRowSize;
      } else {
        if (secondColorCount < currentRowSize) {
          break;
        }
        secondColorCount -= currentRowSize;
      }
      height++;
      currentRowSize++;
      isFirstColorRow = !isFirstColorRow;
    }
    return height;
  };

  return Math.max(buildHeight(red, blue), buildHeight(blue, red));
};
