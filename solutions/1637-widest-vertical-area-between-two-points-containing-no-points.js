/**
 * Widest Vertical Area Between Two Points Containing No Points
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxWidthOfVerticalArea = function (points) {
  const xCoordinatesArray = points.map((coordinatePair) => coordinatePair[0]);
  xCoordinatesArray.sort(
    (firstPointX, secondPointX) => firstPointX - secondPointX,
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
