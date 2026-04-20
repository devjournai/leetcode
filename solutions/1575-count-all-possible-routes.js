/**
 * Count All Possible Routes
 * Time Complexity: O(N^2 * F)
 * Space Complexity: O(N * F)
 */
var countRoutes = function (locations, start, finish, fuel) {
  const routeModulus = 1e9 + 7;
  const numberOfCities = locations.length;

  const routeCache = new Array(numberOfCities)
    .fill(null)
    .map(() => new Array(fuel + 1).fill(-1));

  function computeRouteCounts(presentCityIndex, remainingFuelLevel) {
    if (remainingFuelLevel < 0) {
      return 0;
    }

    if (routeCache[presentCityIndex][remainingFuelLevel] !== -1) {
      return routeCache[presentCityIndex][remainingFuelLevel];
    }

    let pathCount = presentCityIndex === finish ? 1 : 0;

    let destinationCityIndex = 0;
    while (destinationCityIndex < numberOfCities) {
      if (destinationCityIndex !== presentCityIndex) {
        const travelCost = Math.abs(
          locations[presentCityIndex] - locations[destinationCityIndex],
        );
        pathCount =
          (pathCount +
            computeRouteCounts(
              destinationCityIndex,
              remainingFuelLevel - travelCost,
            )) %
          routeModulus;
      }
      destinationCityIndex++;
    }

    routeCache[presentCityIndex][remainingFuelLevel] = pathCount;
    return pathCount;
  }

  return computeRouteCounts(start, fuel);
};
