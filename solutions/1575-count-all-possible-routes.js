/**
 * Count All Possible Routes
 * Intuition: From city u with fuel f, count routes (including staying if u is finish) by trying every other city with remaining fuel.
 * Approach: 1. memo[city][fuel]. 2. Base fuel<0 → 0. 3. Start count 1 if city==finish, add dfs to others. 4. Mod 1e9+7.
 * Dry Run: locations = [2,3,6,8], start = 1, finish = 3, fuel = 5.
 *   - 4 routes.
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
          locations[presentCityIndex] - locations[destinationCityIndex]
        );
        pathCount =
          (pathCount +
            computeRouteCounts(
              destinationCityIndex,
              remainingFuelLevel - travelCost
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
