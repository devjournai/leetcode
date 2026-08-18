/**
 * Minimum Rectangles To Cover Points
 * Intuition: Sort points by x. A greedy rectangle of width w covers a consecutive x-range; start a new rectangle whenever the next point is more than w past the current rectangle start.
 * Approach: 1. Sort x-coordinates. 2. Track currentCoverStart. 3. When point.x > currentCoverStart + w, increment rectangles and reset start.
 * Dry Run:
 *   points x = [2,4,6], w = 2. First covers 2-4, next 6 needs a new rectangle. Answer 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minRectanglesToCoverPoints = function (points, w) {
  const xCoordinates = points.map((point) => point[0]).sort((a, b) => a - b);
  let rectangleCount = 0;
  let coverUntil = -1;
  for (const xCoordinate of xCoordinates) {
    if (xCoordinate > coverUntil) {
      rectangleCount++;
      coverUntil = xCoordinate + w;
    }
  }
  return rectangleCount;
};
