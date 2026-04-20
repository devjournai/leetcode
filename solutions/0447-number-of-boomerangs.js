/**
 * Number Of Boomerangs
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var numberOfBoomerangs = function (points) {
  let boomerangCount = 0;

  for (let primaryIndex = 0; primaryIndex < points.length; primaryIndex++) {
    let distanceMapForCurrentCenter = new Map();

    for (let secondaryIndex = 0; secondaryIndex < points.length; secondaryIndex++) {
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

      let currentDistanceOccurrences = distanceMapForCurrentCenter.get(squaredDistanceVal) || 0;
      distanceMapForCurrentCenter.set(squaredDistanceVal, currentDistanceOccurrences + 1);
    }

    for (let numberOfPointsAtDistance of distanceMapForCurrentCenter.values()) {
      if (numberOfPointsAtDistance > 1) {
        let permutations = numberOfPointsAtDistance * (numberOfPointsAtDistance - 1);
        boomerangCount += permutations;
      }
    }
  }

  return boomerangCount;
};