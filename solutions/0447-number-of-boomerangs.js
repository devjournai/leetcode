/**
 * Number Of Boomerangs
 * Intuition: A boomerang is a center plus two other points at the same distance. For each center, group others by squared distance and add P(count,2).
 * Approach: 1. For each `primaryIndex`, build a Map of squared Euclidean distances to every other point. 2. For each bucket size > 1, add `count*(count-1)`. 3. Return `boomerangCount`.
 * Dry Run: [[0,0],[1,0],[2,0]]. Center (1,0) has two points at dist 1 → 2*1=2. Other centers contribute 0. Return 2.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var numberOfBoomerangs = function (points) {
  let boomerangCount = 0;

  for (let primaryIndex = 0; primaryIndex < points.length; primaryIndex++) {
    let distanceMapForCurrentCenter = new Map();

    for (
      let secondaryIndex = 0;
      secondaryIndex < points.length;
      secondaryIndex++
    ) {
      if (primaryIndex === secondaryIndex) {
        continue;
      }

      let firstPointX = points[primaryIndex][0];
      let firstPointY = points[primaryIndex][1];

      let secondPointX = points[secondaryIndex][0];
      let secondPointY = points[secondaryIndex][1];

      let deltaX = firstPointX - secondPointX;
      let deltaY = firstPointY - secondPointY;
      let squaredDistanceVal = deltaX * deltaX + deltaY * deltaY;

      let currentDistanceOccurrences =
        distanceMapForCurrentCenter.get(squaredDistanceVal) || 0;
      distanceMapForCurrentCenter.set(
        squaredDistanceVal,
        currentDistanceOccurrences + 1
      );
    }

    for (let numberOfPointsAtDistance of distanceMapForCurrentCenter.values()) {
      if (numberOfPointsAtDistance > 1) {
        let permutations =
          numberOfPointsAtDistance * (numberOfPointsAtDistance - 1);
        boomerangCount += permutations;
      }
    }
  }

  return boomerangCount;
};
