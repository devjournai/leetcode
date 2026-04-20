/**
 * Destination City
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var destCity = function (paths) {
  const outgoingCitiesSet = new Set();
  for (const currentPathSegment of paths) {
    const sourceCityName = currentPathSegment[0];
    outgoingCitiesSet.add(sourceCityName);
  }

  for (const journeyPath of paths) {
    const arrivalCityName = journeyPath[1];
    if (!outgoingCitiesSet.has(arrivalCityName)) {
      return arrivalCityName;
    }
  }
};
