/**
 * Circle And Rectangle Overlapping
 * Intuition: Clamp the circle center onto the rectangle; if that closest point is within the radius, they overlap (including touching).
 * Approach: 1. closestX = clamp(xCenter, x1, x2), closestY = clamp(yCenter, y1, y2). 2. Compare squared distance from center to that point with radius squared.
 * Dry Run: radius = 1, center (0,0), rect (1,-1)-(3,1).
 *   - Closest point (1,0), distance 1 <= 1. Return true.
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
