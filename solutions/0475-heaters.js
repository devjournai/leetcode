/**
 * Heaters
 * Intuition: After sorting, each house’s closest heater is found by binary search on heater positions; the required radius is the max of those distances.
 * Approach: 1. Sort `houseCoordinates` and `heaterPositions`. 2. For each house, binary-search heaters while tracking `min(|house-heater|)` at the mid. Move left/right by comparing heater vs house; on equality the distance is 0. 3. `overallMinimumRadius` is the max of per-house distances.
 * Dry Run: houses = [1,2,3,4], heaters = [1,4].
 *   - House 1: heater 1, dist 0. House 2: mids hit 1 then 4, min dist 1. House 3: min dist 1. House 4: dist 0.
 *   - Radius = max(0,1,1,0) = 1.
 * Time Complexity: O(N log N + M log M + N log M)
 * Space Complexity: O(1)
 */
var findRadius = function (houseCoordinates, heaterPositions) {
  houseCoordinates.sort(
    (firstElement, secondElement) => firstElement - secondElement
  );
  heaterPositions.sort(
    (firstElement, secondElement) => firstElement - secondElement
  );

  let overallMinimumRadius = 0;

  for (const currentHouseCoordinate of houseCoordinates) {
    let leftBoundary = 0;
    let rightBoundary = heaterPositions.length - 1;
    let minimumDistanceForHouse = Number.POSITIVE_INFINITY;

    while (leftBoundary <= rightBoundary) {
      let middlePoint = Math.floor((leftBoundary + rightBoundary) / 2);
      let currentHeaterCoordinate = heaterPositions[middlePoint];

      minimumDistanceForHouse = Math.min(
        minimumDistanceForHouse,
        Math.abs(currentHouseCoordinate - currentHeaterCoordinate)
      );

      if (currentHeaterCoordinate < currentHouseCoordinate) {
        leftBoundary = middlePoint + 1;
      } else if (currentHeaterCoordinate > currentHouseCoordinate) {
        rightBoundary = middlePoint - 1;
      } else {
        minimumDistanceForHouse = 0;
        break;
      }
    }
    overallMinimumRadius = Math.max(
      overallMinimumRadius,
      minimumDistanceForHouse
    );
  }

  return overallMinimumRadius;
};
