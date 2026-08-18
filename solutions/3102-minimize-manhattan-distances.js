/**
 * Minimize Manhattan Distances
 * Intuition: The Manhattan diameter of a set is `max(max(x+y)-min(x+y), max(x-y)-min(x-y))`. Removing one point can change the diameter only if that point is an extreme of `x+y` or `x-y`. So it is enough to find the current diametral pair `(i, j)`, then recompute the diameter after excluding `i` and after excluding `j`, and take the smaller of those two diameters.
 * Approach: 1. Scan all points (optionally skipping one index) to find min/max of `x+y` and `x-y`. 2. The larger of those two ranges identifies the farthest pair. 3. Run that scan on the full set, then again excluding each endpoint of the farthest pair. 4. Return the minimum of the two resulting distances.
 * Dry Run:
 * Input: points = [[3,10],[5,15],[10,2],[4,4]]
 * 1. Farthest pair is (1,2) with distance |5-10|+|15-2|=18
 * 2. Exclude either endpoint of that pair. The better remaining diameter is 12. Answer: 12
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minimumDistance = function (points) {
  const manhattanDistance = (firstIndex, secondIndex) => {
    return (
      Math.abs(points[firstIndex][0] - points[secondIndex][0]) +
      Math.abs(points[firstIndex][1] - points[secondIndex][1])
    );
  };

  const farthestPairExcluding = (excludedIndex) => {
    let minSum = Number.POSITIVE_INFINITY;
    let maxSum = Number.NEGATIVE_INFINITY;
    let minDiff = Number.POSITIVE_INFINITY;
    let maxDiff = Number.NEGATIVE_INFINITY;
    let minSumIndex = -1;
    let maxSumIndex = -1;
    let minDiffIndex = -1;
    let maxDiffIndex = -1;

    for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
      if (pointIndex === excludedIndex) {
        continue;
      }
      const xCoordinate = points[pointIndex][0];
      const yCoordinate = points[pointIndex][1];
      const coordinateSum = xCoordinate + yCoordinate;
      const coordinateDiff = xCoordinate - yCoordinate;
      if (coordinateSum < minSum) {
        minSum = coordinateSum;
        minSumIndex = pointIndex;
      }
      if (coordinateSum > maxSum) {
        maxSum = coordinateSum;
        maxSumIndex = pointIndex;
      }
      if (coordinateDiff < minDiff) {
        minDiff = coordinateDiff;
        minDiffIndex = pointIndex;
      }
      if (coordinateDiff > maxDiff) {
        maxDiff = coordinateDiff;
        maxDiffIndex = pointIndex;
      }
    }

    if (maxSum - minSum >= maxDiff - minDiff) {
      return [minSumIndex, maxSumIndex];
    }
    return [minDiffIndex, maxDiffIndex];
  };

  const farthestPair = farthestPairExcluding(-1);
  const pairExcludingFirst = farthestPairExcluding(farthestPair[0]);
  const pairExcludingSecond = farthestPairExcluding(farthestPair[1]);
  return Math.min(
    manhattanDistance(pairExcludingFirst[0], pairExcludingFirst[1]),
    manhattanDistance(pairExcludingSecond[0], pairExcludingSecond[1]),
  );
};
