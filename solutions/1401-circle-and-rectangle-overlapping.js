/**
 * Circle And Rectangle Overlapping
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var checkOverlap = function (radius, xCenter, yCenter, x1, y1, x2, y2) {
  const closestPointX = Math.max(x1, Math.min(x2, xCenter));
  const closestPointY = Math.max(y1, Math.min(y2, yCenter));

  const deltaX = xCenter - closestPointX;
  const deltaY = yCenter - closestPointY;

  const squaredDeltaX = deltaX * deltaX;
  const squaredDeltaY = deltaY * deltaY;

  const minimumSquaredDistance = squaredDeltaX + squaredDeltaY;
  const circleRadiusSquared = radius * radius;

  return minimumSquaredDistance <= circleRadiusSquared;
};
