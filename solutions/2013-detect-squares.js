/**
 * Detect Squares
 * Intuition: An axis-aligned square has four vertices. If the query point is one vertex, say (x, y), and another stored point (px, py) is its opposite diagonal, then two conditions must hold: 1) px != x and py != y (positive area), and 2) Math.abs(px - x) == Math.abs(py - y) (sides are equal length). If these conditions are met, the other two vertices must be (x, py) and (px, y). We can count squares by finding such diagonal pairs and then checking the existence and counts of the two derived adjacent points.
 * Approach: 1. Initialize a nested Map to store point counts, where the outer Map keys are x-coordinates and inner Map keys are y-coordinates mapping to their counts. This allows efficient retrieval of points by coordinates. 2. In the `add` method, store the given point's x and y coordinates and increment its count in the nested Map. 3. In the `count` method, iterate through all unique x-coordinates stored in the outer Map. For each unique x-coordinate, iterate through its associated y-coordinates and their counts. Treat each iterated point (existingX, existingY) as a potential opposite diagonal to the query point (queryX, queryY). 4. If (existingX, existingY) is a valid diagonal (i.e., not on the same horizontal/vertical line as the query point and the absolute differences in x and y coordinates are equal), then calculate the counts of the two inferred adjacent points: (queryX, existingY) and (existingX, queryY). 5. Multiply the count of the potential diagonal point (existingPointCount) by the counts of the two inferred adjacent points to find all combinations forming a square. Sum these up to get the total number of squares.
 * Dry Run:
 *  1. `DetectSquares d = new DetectSquares();` -> `coordinateMap = {}`
 *  2. `d.add([3, 10]);` -> `coordinateMap = { 3: { 10: 1 } }`
 *  3. `d.add([11, 2]);` -> `coordinateMap = { 3: { 10: 1 }, 11: { 2: 1 } }`
 *  4. `d.add([3, 2]);` -> `coordinateMap = { 3: { 10: 1, 2: 1 }, 11: { 2: 1 } }`
 *  5. `d.count([11, 10]);`
 *     `queryX = 11`, `queryY = 10`, `totalSquares = 0`
 *     Outer loop: `existingX = 3`, `yPointsMap = { 10: 1, 2: 1 }`
 *       `existingX (3) != queryX (11)`
 *       Inner loop: `existingY = 10`, `existingPointCount = 1` (point `(3, 10)`)
 *         `existingY (10) == queryY (10)` -> continue (cannot be diagonal)
 *       Inner loop: `existingY = 2`, `existingPointCount = 1` (point `(3, 2)`)
 *         `existingY (2) != queryY (10)`
 *         `sideLengthX = abs(3 - 11) = 8`
 *         `sideLengthY = abs(2 - 10) = 8`
 *         `sideLengthX == sideLengthY`
 *         Inferred point 1: `(11, 2)`. Count (`coordinateMap.get(11)?.get(2)`) = 1. `cornerPointCount1 = 1`.
 *         Inferred point 2: `(3, 10)`. Count (`coordinateMap.get(3)?.get(10)`) = 1. `cornerPointCount2 = 1`.
 *         `totalSquares += 1 * 1 * 1 = 1`. `totalSquares` is now `1`.
 *     Outer loop: `existingX = 11`, `yPointsMap = { 2: 1 }`
 *       `existingX (11) == queryX (11)` -> continue
 *     Return `totalSquares = 1`.
 *  6. `d.add([11, 2]);` -> `coordinateMap = { 3: { 10: 1, 2: 1 }, 11: { 2: 2 } }`
 *  7. `d.count([11, 10]);`
 *     `queryX = 11`, `queryY = 10`, `totalSquares = 0`
 *     Outer loop: `existingX = 3`, `yPointsMap = { 10: 1, 2: 1 }`
 *       `existingX (3) != queryX (11)`
 *       Inner loop: `existingY = 10`, `existingPointCount = 1` (point `(3, 10)`)
 *         `existingY (10) == queryY (10)` -> continue
 *       Inner loop: `existingY = 2`, `existingPointCount = 1` (point `(3, 2)`)
 *         `existingY (2) != queryY (10)`
 *         `sideLengthX = abs(3 - 11) = 8`
 *         `sideLengthY = abs(2 - 10) = 8`
 *         `sideLengthX == sideLengthY`
 *         Inferred point 1: `(11, 2)`. Count (`coordinateMap.get(11)?.get(2)`) = 2. `cornerPointCount1 = 2`.
 *         Inferred point 2: `(3, 10)`. Count (`coordinateMap.get(3)?.get(10)`) = 1. `cornerPointCount2 = 1`.
 *         `totalSquares += 1 * 2 * 1 = 2`. `totalSquares` is now `2`.
 *     Outer loop: `existingX = 11`, `yPointsMap = { 2: 2 }`
 *       `existingX (11) == queryX (11)` -> continue
 *     Return `totalSquares = 2`.
 * Time Complexity: O(P)
 * Space Complexity: O(P)
 */
var DetectSquares = function () {
  this.pointStorageMap = new Map();
};

DetectSquares.prototype.add = function (pointToAdd) {
  const [incomingX, incomingY] = pointToAdd;
  if (!this.pointStorageMap.has(incomingX)) {
    this.pointStorageMap.set(incomingX, new Map());
  }
  const yValueMap = this.pointStorageMap.get(incomingX);
  yValueMap.set(incomingY, (yValueMap.get(incomingY) || 0) + 1);
};

DetectSquares.prototype.count = function (queryPoint) {
  const [queryXCoordinate, queryYCoordinate] = queryPoint;
  let squareCount = 0;

  for (const [storedXCoordinate, yAxisPointsMap] of this.pointStorageMap) {
    if (storedXCoordinate === queryXCoordinate) {
      continue;
    }

    for (const [storedYCoordinate, storedPointFrequency] of yAxisPointsMap) {
      if (storedYCoordinate === queryYCoordinate) {
        continue;
      }

      const xDifference = Math.abs(storedXCoordinate - queryXCoordinate);
      const yDifference = Math.abs(storedYCoordinate - queryYCoordinate);

      if (xDifference !== yDifference) {
        continue;
      }

      const neededYMap = this.pointStorageMap.get(queryXCoordinate);
      const firstCornerCount = neededYMap
        ? neededYMap.get(storedYCoordinate) || 0
        : 0;

      const currentXMap = this.pointStorageMap.get(storedXCoordinate);
      const secondCornerCount = currentXMap
        ? currentXMap.get(queryYCoordinate) || 0
        : 0;

      squareCount +=
        storedPointFrequency * firstCornerCount * secondCornerCount;
    }
  }

  return squareCount;
};
