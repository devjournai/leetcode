/**
 * Two Furthest Houses With Different Colors
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var maxDistance = function (colors) {
  const numHouses = colors.length;
  let maximumDistanceFound = 0;

  const firstColorValue = colors[0];
  for (let iteratorRightToLeft = numHouses - 1; iteratorRightToLeft >= 0; iteratorRightToLeft--) {
    if (colors[iteratorRightToLeft] !== firstColorValue) {
      const currentDistanceCalculated = iteratorRightToLeft;
      maximumDistanceFound = Math.max(maximumDistanceFound, currentDistanceCalculated);
      break;
    }
  }

  const lastColorValue = colors[numHouses - 1];
  for (let iteratorLeftToRight = 0; iteratorLeftToRight < numHouses; iteratorLeftToRight++) {
    if (colors[iteratorLeftToRight] !== lastColorValue) {
      const potentialDistance = (numHouses - 1) - iteratorLeftToRight;
      maximumDistanceFound = Math.max(maximumDistanceFound, potentialDistance);
      break;
    }
  }

  return maximumDistanceFound;
};