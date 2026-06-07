/**
 * Count Lattice Points Inside A Circle
 * Intuition: Iterate through each given circle, and for every circle, consider all integer coordinate points within its bounding box. For each candidate point, calculate its squared distance from the circle's center and check if it's less than or equal to the squared radius. Store all unique valid lattice points in a set to avoid duplicates.
 * Approach: 1. Initialize an empty Set to store unique lattice points. 2. Iterate through each circle definition provided in the input array. 3. For each circle, unpack its center coordinates (xi, yi) and radius (ri). 4. Determine the bounding box for the current circle: x-coordinates range from (xi - ri) to (xi + ri), and y-coordinates range from (yi - ri) to (yi + ri). 5. Use nested loops to iterate through all integer points (pointX, pointY) within this bounding box. 6. For each point (pointX, pointY), calculate the squared Euclidean distance from the circle's center (xi, yi) using the formula: (xi - pointX)^2 + (yi - pointY)^2. 7. Compare this squared distance with the squared radius (ri^2). If the squared distance is less than or equal to the squared radius, the point is inside or on the circle. 8. If the point is inside, add a unique string representation of it (e.g., "${pointX},${pointY}") to the Set. 9. After processing all circles and their respective points, the final answer is the size of the Set.
 * Dry Run: circles = [[0, 0, 1]]
 * 1. Initialize `visitedPoints` as an empty Set.
 * 2. Process the first circle `[0, 0, 1]`.
 *    `circleXCenter = 0`, `circleYCenter = 0`, `circleRadius = 1`.
 *    Calculate x-range: `currentMinX = 0 - 1 = -1`, `currentMaxX = 0 + 1 = 1`.
 *    Calculate y-range: `currentMinY = 0 - 1 = -1`, `currentMaxY = 0 + 1 = 1`.
 * 3. Outer loop `traverseX` from -1 to 1:
 *    - `traverseX = -1`:
 *      Inner loop `traverseY` from -1 to 1:
 *      - `traverseY = -1`: `diffX = 0 - (-1) = 1`, `diffY = 0 - (-1) = 1`. `sqDist = 1^2 + 1^2 = 2`. `sqRadius = 1^2 = 1`. `2 <= 1` is false.
 *      - `traverseY = 0`: `diffX = 0 - (-1) = 1`, `diffY = 0 - 0 = 0`. `sqDist = 1^2 + 0^2 = 1`. `sqRadius = 1`. `1 <= 1` is true. Add "{-1,0}" to `visitedPoints`.
 *      - `traverseY = 1`: `diffX = 0 - (-1) = 1`, `diffY = 0 - 1 = -1`. `sqDist = 1^2 + (-1)^2 = 2`. `sqRadius = 1`. `2 <= 1` is false.
 *    - `traverseX = 0`:
 *      Inner loop `traverseY` from -1 to 1:
 *      - `traverseY = -1`: `diffX = 0 - 0 = 0`, `diffY = 0 - (-1) = 1`. `sqDist = 0^2 + 1^2 = 1`. `sqRadius = 1`. `1 <= 1` is true. Add "{0,-1}" to `visitedPoints`.
 *      - `traverseY = 0`: `diffX = 0 - 0 = 0`, `diffY = 0 - 0 = 0`. `sqDist = 0^2 + 0^2 = 0`. `sqRadius = 1`. `0 <= 1` is true. Add "{0,0}" to `visitedPoints`.
 *      - `traverseY = 1`: `diffX = 0 - 0 = 0`, `diffY = 0 - 1 = -1`. `sqDist = 0^2 + (-1)^2 = 1`. `sqRadius = 1`. `1 <= 1` is true. Add "{0,1}" to `visitedPoints`.
 *    - `traverseX = 1`:
 *      Inner loop `traverseY` from -1 to 1:
 *      - `traverseY = -1`: `diffX = 0 - 1 = -1`, `diffY = 0 - (-1) = 1`. `sqDist = (-1)^2 + 1^2 = 2`. `sqRadius = 1`. `2 <= 1` is false.
 *      - `traverseY = 0`: `diffX = 0 - 1 = -1`, `diffY = 0 - 0 = 0`. `sqDist = (-1)^2 + 0^2 = 1`. `sqRadius = 1`. `1 <= 1` is true. Add "{1,0}" to `visitedPoints`.
 *      - `traverseY = 1`: `diffX = 0 - 1 = -1`, `diffY = 0 - 1 = -1`. `sqDist = (-1)^2 + (-1)^2 = 2`. `sqRadius = 1`. `2 <= 1` is false.
 * 4. All circles processed. `visitedPoints` contains `{"-1,0", "0,-1", "0,0", "0,1", "1,0"}`.
 * 5. Return `visitedPoints.size`, which is 5.
 * Time Complexity: O(N * R_max^2)
 * Space Complexity: O((X_max + R_max)^2)
 */
var countLatticePoints = function (circles) {
  const uniqueLatticePoints = new Set();

  for (const circleDefinition of circles) {
    const circleXCenter = circleDefinition[0];
    const circleYCenter = circleDefinition[1];
    const circleRadius = circleDefinition[2];

    const currentSquaredRadius = circleRadius * circleRadius;

    const currentMinX = circleXCenter - circleRadius;
    const currentMaxX = circleXCenter + circleRadius;

    const currentMinY = circleYCenter - circleRadius;
    const currentMaxY = circleYCenter + circleRadius;

    for (let traverseX = currentMinX; traverseX <= currentMaxX; traverseX++) {
      for (let traverseY = currentMinY; traverseY <= currentMaxY; traverseY++) {
        const xCoordinateDifference = circleXCenter - traverseX;
        const yCoordinateDifference = circleYCenter - traverseY;

        const pointSquaredDistance =
          xCoordinateDifference * xCoordinateDifference +
          yCoordinateDifference * yCoordinateDifference;

        if (pointSquaredDistance <= currentSquaredRadius) {
          const pointIdentifierString = `${traverseX},${traverseY}`;
          uniqueLatticePoints.add(pointIdentifierString);
        }
      }
    }
  }

  return uniqueLatticePoints.size;
};
