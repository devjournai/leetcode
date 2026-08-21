/**
 * Widest Vertical Area Between Two Points Containing No Points
 * Intuition: A vertical strip's width depends only on x-coordinates. Sort unique-order x values and take the maximum adjacent gap.
 * Approach: 1. Collect every point's x. 2. Sort them. 3. Scan consecutive differences and return the max (y never matters).
 * Dry Run: points = [[8,7],[9,9],[7,4],[6,4]] → xs 6,7,8,9, max gap 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxWidthOfVerticalArea = function (points) {
  const xCoordinatesArray = points.map((coordinatePair) => coordinatePair[0]);
  xCoordinatesArray.sort(
    (firstPointX, secondPointX) => firstPointX - secondPointX
  );

  let maximumAchievedWidth = 0;
  let traversalIndex = 1;

  while (traversalIndex < xCoordinatesArray.length) {
    const currentWidth =
      xCoordinatesArray[traversalIndex] - xCoordinatesArray[traversalIndex - 1];
    maximumAchievedWidth = Math.max(maximumAchievedWidth, currentWidth);
    traversalIndex++;
  }

  return maximumAchievedWidth;
};
