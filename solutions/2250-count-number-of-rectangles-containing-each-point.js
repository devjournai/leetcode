/**
 * Count Number Of Rectangles Containing Each Point
 * Intuition: Group rectangles by height since the maximum height is small (100). For each height, sort the lengths to efficiently count rectangles satisfying the length condition. Then, for each point (x, y), iterate through all relevant heights (from y to 100) and use binary search to find rectangles matching the length requirement.
 * Approach: 1. Initialize an array `heightToLengths` of size 101, where `heightToLengths[h]` will store a list of lengths of rectangles with height `h`. 2. Iterate through the input `rectangles`, and for each `[currentLength, currentHeight]`, add `currentLength` to `heightToLengths[currentHeight]`. 3. Iterate from height `h = 0` to `100` and sort each list `heightToLengths[h]` in ascending order. 4. Initialize an `answerCounts` array of the same length as `points` with all zeros. 5. Iterate through the input `points` using a `pointIndex`. For each `[pointXCoord, pointYCoord]`: 6. Initialize `pointSpecificCount` to 0. 7. Iterate `heightSearchIter` from `pointYCoord` up to `100`. 8. Retrieve `lengthsForCurrentHeight = heightToLengths[heightSearchIter]`. 9. Perform a binary search (lower bound) on `lengthsForCurrentHeight` to find the count of lengths `l` such that `l >= pointXCoord`. This involves setting `binaryLeft = 0`, `binaryRight = lengthsForCurrentHeight.length - 1`, and `insertionSpot = lengthsForCurrentHeight.length`. While `binaryLeft <= binaryRight`, calculate `midPointIndex`. If `lengthsForCurrentHeight[midPointIndex] >= pointXCoord`, set `insertionSpot = midPointIndex` and `binaryRight = midPointIndex - 1`. Else, set `binaryLeft = midPointIndex + 1`. 10. Add `lengthsForCurrentHeight.length - insertionSpot` to `pointSpecificCount`. 11. Store `pointSpecificCount` in `answerCounts[pointIndex]`. 12. Return `answerCounts`.
 * Dry Run: rectangles = [[1,2],[2,3],[2,4]], points = [[1,3],[1,1]]
 * 1. `heightToLengths` initialized (101 empty arrays).
 * 2. Populate `heightToLengths`:
 *    `[1,2]` -> `heightToLengths[2] = [1]`
 *    `[2,3]` -> `heightToLengths[3] = [2]`
 *    `[2,4]` -> `heightToLengths[4] = [2]`
 * 3. Sort `heightToLengths`:
 *    `heightToLengths[2]` remains `[1]`
 *    `heightToLengths[3]` remains `[2]`
 *    `heightToLengths[4]` remains `[2]`
 * 4. `answerCounts = [0, 0]`
 * 5. Process `points[0] = [1,3]` (`pointXCoord = 1`, `pointYCoord = 3`):
 *    `pointSpecificCount = 0`
 *    `heightSearchIter` from 3 to 100:
 *    - `heightSearchIter = 3`: `lengthsForCurrentHeight = [2]`. Binary search for `l >= 1` in `[2]`. `insertionSpot` becomes 0. Count = `1 - 0 = 1`. `pointSpecificCount = 1`.
 *    - `heightSearchIter = 4`: `lengthsForCurrentHeight = [2]`. Binary search for `l >= 1` in `[2]`. `insertionSpot` becomes 0. Count = `1 - 0 = 1`. `pointSpecificCount = 1 + 1 = 2`.
 *    - `heightSearchIter` 5-100: `lengthsForCurrentHeight = []`. Count = 0.
 *    `answerCounts[0] = 2`. `answerCounts = [2, 0]`
 * 6. Process `points[1] = [1,1]` (`pointXCoord = 1`, `pointYCoord = 1`):
 *    `pointSpecificCount = 0`
 *    `heightSearchIter` from 1 to 100:
 *    - `heightSearchIter = 1`: `lengthsForCurrentHeight = []`. Count = 0. `pointSpecificCount = 0`.
 *    - `heightSearchIter = 2`: `lengthsForCurrentHeight = [1]`. Binary search for `l >= 1` in `[1]`. `insertionSpot` becomes 0. Count = `1 - 0 = 1`. `pointSpecificCount = 1`.
 *    - `heightSearchIter = 3`: `lengthsForCurrentHeight = [2]`. Binary search for `l >= 1` in `[2]`. `insertionSpot` becomes 0. Count = `1 - 0 = 1`. `pointSpecificCount = 1 + 1 = 2`.
 *    - `heightSearchIter = 4`: `lengthsForCurrentHeight = [2]`. Binary search for `l >= 1` in `[2]`. `insertionSpot` becomes 0. Count = `1 - 0 = 1`. `pointSpecificCount = 2 + 1 = 3`.
 *    - `heightSearchIter` 5-100: `lengthsForCurrentHeight = []`. Count = 0.
 *    `answerCounts[1] = 3`. `answerCounts = [2, 3]`
 * 7. Return `[2, 3]`.
 * Time Complexity: O(R log R + P * H_max * log R)
 * Space Complexity: O(R + P)
 */
var countRectangles = function (rectangles, points) {
  const heightToLengths = new Array(101).fill().map(() => []);

  for (const singleRectangle of rectangles) {
    const [currentLength, currentHeight] = singleRectangle;
    heightToLengths[currentHeight].push(currentLength);
  }

  for (let heightIter = 0; heightIter <= 100; heightIter++) {
    heightToLengths[heightIter].sort((valA, valB) => valA - valB);
  }

  const resultCounts = new Array(points.length).fill(0);
  for (let pointIdx = 0; pointIdx < points.length; pointIdx++) {
    const singlePoint = points[pointIdx];
    const [pointXCoord, pointYCoord] = singlePoint;
    let pointSpecificCount = 0;

    for (
      let heightSearchIter = pointYCoord;
      heightSearchIter <= 100;
      heightSearchIter++
    ) {
      const lengthsForCurrentHeight = heightToLengths[heightSearchIter];

      let binaryLeft = 0;
      let binaryRight = lengthsForCurrentHeight.length - 1;
      let insertionSpot = lengthsForCurrentHeight.length;

      while (binaryLeft <= binaryRight) {
        const midPointIndex = Math.floor((binaryLeft + binaryRight) / 2);
        if (lengthsForCurrentHeight[midPointIndex] >= pointXCoord) {
          insertionSpot = midPointIndex;
          binaryRight = midPointIndex - 1;
        } else {
          binaryLeft = midPointIndex + 1;
        }
      }

      pointSpecificCount += lengthsForCurrentHeight.length - insertionSpot;
    }
    resultCounts[pointIdx] = pointSpecificCount;
  }

  return resultCounts;
};
