/**
 * Destination City
 * Intuition: Every city except the destination has an outgoing path. Collect start cities, then return the first end city that never appears as a start.
 * Approach: 1. Put every path[0] into a Set. 2. Scan each path[1]. 3. If that arrival city is not in the set, return it.
 * Dry Run: paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
 *   - outgoing = {London, New York, Lima}
 *   - New York and Lima are outgoing; Sao Paulo is not. Return "Sao Paulo".
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
