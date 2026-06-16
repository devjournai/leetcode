/**
* Finding The Number Of Visible Mountains
* Intuition: A mountain is visible if no other mountain completely encloses its peak. This can be rephrased by transforming mountain peaks (x,y) into intervals [x-y, x+y]. A mountain [s1, e1] covers another [s2, e2] if s1 <= s2 and e1 >= e2. By sorting mountains primarily by their left boundary (x-y) and secondarily by their right boundary (x+y) in descending order, we can iterate and track the maximum right boundary encountered so far. A mountain is visible if its right boundary extends beyond this maximum, indicating it's not covered by any previously processed mountain.
* Approach: 1. Transform each peak `(x, y)` into an interval `[x - y, x + y]`. 2. Sort the array of peaks. The primary sorting key is `x - y` in ascending order. The secondary sorting key (for ties in `x - y`) is `x + y` in descending order. This ensures that if multiple mountains start at the same `x - y`, the one extending furthest to the right (and thus potentially covering others) is processed first. 3. Initialize `visibleMountainCount` to 0 and `maximumRightBoundary` to negative infinity. 4. Iterate through the sorted peaks: a. For each peak `[currentX, currentY]`, calculate its `currentRightBoundary = currentX + currentY`. b. If `currentRightBoundary` is strictly greater than `maximumRightBoundary`: i. Update `maximumRightBoundary` to `currentRightBoundary`. ii. Check if the current peak is identical to the next peak in the array. If `currentX` and `currentY` are the same as `nextX` and `nextY`, `continue` to the next iteration (this is the specific duplicate handling from the reference solution, avoiding counting the first of a series of identical peaks). iii. If not identical to the next peak (or it's the last peak), increment `visibleMountainCount`. 5. Return `visibleMountainCount`.
* Dry Run: peaks = [[2,2],[6,3],[5,4]]
    1. Transformed intervals: [0,4], [3,9], [1,9].
    2. Sorted peaks (original coords, based on [x-y, x+y] sort keys): [[2,2], [5,4], [6,3]]
     - [2,2] -> [0,4]
     - [5,4] -> [1,9] (1 > 0)
     - [6,3] -> [3,9] (3 > 1)
    3. Initialize: `visibleMountainCount = 0`, `maximumRightBoundary = -Infinity`.
    4. Iterate:
     - `peakIndex = 0`: `peak = [2,2]`. `currentXCoordinate = 2`, `currentYCoordinate = 2`.
       `currentRightBoundaryValue = 2 + 2 = 4`.
           `4 > -Infinity` is true.
           `maximumRightBoundary = 4`.
           Check duplicate: `peakIndex < 2` is true. `[2,2]` is not `[5,4]`. Not identical.
           `visibleMountainCount = 1`.
         - `peakIndex = 1`: `peak = [5,4]`. `currentXCoordinate = 5`, `currentYCoordinate = 4`.
           `currentRightBoundaryValue = 5 + 4 = 9`.
           `9 > maximumRightBoundary (4)` is true.
           `maximumRightBoundary = 9`.
           Check duplicate: `peakIndex < 2` is true. `[5,4]` is not `[6,3]`. Not identical.
           `visibleMountainCount = 2`.
         - `peakIndex = 2`: `peak = [6,3]`. `currentXCoordinate = 6`, `currentYCoordinate = 3`.
           `currentRightBoundaryValue = 6 + 3 = 9`.
           `9 > maximumRightBoundary (9)` is false.
         (Mountain [6,3] (start=3, end=9) is covered by [5,4] (start=1, end=9) because 1 <= 3 and 9 >= 9).
    5. Return `visibleMountainCount = 2`.
* Time Complexity: O(N log N
* Space Complexity: O(log N)
*/
var visibleMountains = function (mountainPeaks) {
  const totalPeaks = mountainPeaks.length;

  mountainPeaks.sort((peakOne, peakTwo) => {
    const peakOneLeft = peakOne[0] - peakOne[1];
    const peakTwoLeft = peakTwo[0] - peakTwo[1];
    if (peakOneLeft === peakTwoLeft) {
      const peakOneRight = peakOne[0] + peakOne[1];
      const peakTwoRight = peakTwo[0] + peakTwo[1];
      return peakTwoRight - peakOneRight;
    }
    return peakOneLeft - peakTwoLeft;
  });

  let visibleMountainCount = 0;
  let maximumRightBoundary = -Infinity;

  for (let peakIndex = 0; peakIndex < totalPeaks; peakIndex++) {
    const currentXCoordinate = mountainPeaks[peakIndex][0];
    const currentYCoordinate = mountainPeaks[peakIndex][1];
    const currentRightInterceptValue = currentXCoordinate + currentYCoordinate;

    if (currentRightInterceptValue > maximumRightBoundary) {
      maximumRightBoundary = currentRightInterceptValue;
      const nextPeakIndex = peakIndex + 1;
      if (
        nextPeakIndex < totalPeaks &&
        mountainPeaks[peakIndex][0] === mountainPeaks[nextPeakIndex][0] &&
        mountainPeaks[peakIndex][1] === mountainPeaks[nextPeakIndex][1]
      ) {
        continue;
      }
      visibleMountainCount++;
    }
  }

  return visibleMountainCount;
};
