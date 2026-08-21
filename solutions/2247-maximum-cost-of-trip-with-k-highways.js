/**
 * Maximum Cost Of Trip With K Highways
 * Intuition: This problem asks for the maximum cost of a trip using exactly k highways, visiting each city at most once. This can be modeled as finding the longest path of length k in a graph, with the constraint of no repeated cities. Since the number of cities (n) is relatively small (up to 15), we can use dynamic programming with a bitmask to keep track of visited cities, representing a subset of cities.
 * Approach: 1. Initialize an adjacency list to represent the graph from the given highways, storing neighbors and their associated tolls. Each highway is bi-directional. 2. Handle an edge case: if the required number of cities (k+1 for k highways) exceeds the total number of cities, no such trip is possible, so return -1. 3. Use a memoization map to store results of subproblems to avoid redundant calculations. The key for memoization will combine the current city and the bitmask of visited cities. 4. Iterate through each city in the graph, treating it as a potential starting point for a trip. For each starting city, call a recursive helper function (dynamic programming). 5. The recursive DP function `calculateMaxCost(currentCityIndex, visitedCitiesMask)` will: a. Count the number of cities visited in the current path using the bitmask. If this count equals `k + 1`, it means exactly `k` highways have been traversed, so return 0 (no additional cost from this point). b. Check if the current state (`currentCityIndex`, `visitedCitiesMask`) is already in the memoization map; if so, return the cached value. c. Initialize a variable `currentAnswer` to -1 to track the maximum cost from the current state. d. Iterate through all neighbors of `currentCityIndex`. For each neighbor, if it has not been visited yet (checked using the bitmask): i. Recursively call `calculateMaxCost` for the neighbor, updating the bitmask to include the neighbor. ii. If the recursive call returns a valid cost (not -1), update `currentAnswer` with the maximum of its current value and `connectionToll` plus the `recursiveResult`. e. Store `currentAnswer` in the memoization map before returning it. 6. The main function will update the overall `maxTotalCost` with the maximum value returned by the DP calls from each starting city. If no valid trip is found, `maxTotalCost` remains -1.
 * Dry Run: n = 4, highways = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]], k = 2
 *   - k+1 = 3. 3 <= n (4) is true.
 *   - cityGraph: 0: [[1,1],[3,1]], 1: [[0,1],[2,1]], 2: [[1,1],[3,1]], 3: [[2,1],[0,1]]
 *   - memoizationMap = {}
 *   - maxTotalCost = -1
 *   - Loop initialCityIndex from 0 to 3:
 *     - initialCityIndex = 0:
 *       - maxTotalCost = Math.max(-1, calculateMaxCost(0, 1 << 0))
 *       - Call calculateMaxCost(0, 1):
 *         - numberOfVisitedCities = 1. Not k+1 (3).
 *         - cacheKey = "0_1". Not in memo.
 *         - currentAnswer = -1.
 *         - Neighbors of 0:
 *           - nextAdjacentCity = 1, connectionToll = 1:
 *             - 1 not in visitedCitiesMask (1).
 *             - recursiveResult = calculateMaxCost(1, 1 | (1 << 1)) = calculateMaxCost(1, 3)
 *               - Call calculateMaxCost(1, 3):
 *                 - numberOfVisitedCities = 2. Not k+1 (3).
 *                 - cacheKey = "1_3". Not in memo.
 *                 - currentAnswer = -1.
 *                 - Neighbors of 1:
 *                   - nextAdjacentCity = 0, connectionToll = 1: 0 is in visitedCitiesMask (3). Skip.
 *                   - nextAdjacentCity = 2, connectionToll = 1:
 *                     - 2 not in visitedCitiesMask (3).
 *                     - recursiveResult = calculateMaxCost(2, 3 | (1 << 2)) = calculateMaxCost(2, 7)
 *                       - Call calculateMaxCost(2, 7):
 *                         - numberOfVisitedCities = 3. Equals k+1 (3). Return 0.
 *                     - recursiveResult is 0. 0 !== -1. currentAnswer = Math.max(-1, 1 + 0) = 1.
 *                 - memoizationMap.set("1_3", 1). Return 1.
 *             - recursiveResult is 1. 1 !== -1. currentAnswer = Math.max(-1, 1 + 1) = 2.
 *           - nextAdjacentCity = 3, connectionToll = 1:
 *             - 3 not in visitedCitiesMask (1).
 *             - recursiveResult = calculateMaxCost(3, 1 | (1 << 3)) = calculateMaxCost(3, 9)
 *               - Call calculateMaxCost(3, 9):
 *                 - numberOfVisitedCities = 2. Not k+1 (3).
 *                 - cacheKey = "3_9". Not in memo.
 *                 - currentAnswer = -1.
 *                 - Neighbors of 3:
 *                   - nextAdjacentCity = 2, connectionToll = 1:
 *                     - 2 not in visitedCitiesMask (9).
 *                     - recursiveResult = calculateMaxCost(2, 9 | (1 << 2)) = calculateMaxCost(2, 13)
 *                       - Call calculateMaxCost(2, 13):
 *                         - numberOfVisitedCities = 3. Equals k+1 (3). Return 0.
 *                     - recursiveResult is 0. 0 !== -1. currentAnswer = Math.max(-1, 1 + 0) = 1.
 *                   - nextAdjacentCity = 0, connectionToll = 1: 0 is in visitedCitiesMask (9). Skip.
 *                 - memoizationMap.set("3_9", 1). Return 1.
 *             - recursiveResult is 1. 1 !== -1. currentAnswer = Math.max(2, 1 + 1) = 2.
 *         - memoizationMap.set("0_1", 2). Return 2.
 *       - maxTotalCost = Math.max(-1, 2) = 2.
 *     - (Similarly for initialCityIndex = 1, 2, 3, maxTotalCost might get updated or remain 2).
 *   - Final maxTotalCost = 2.
 * Time Complexity: O(N * 2^N * N)
 * Space Complexity: O(N * 2^N)
 */
var maximumCost = function (totalCities, roadSegments, highwayCount) {
  if (highwayCount + 1 > totalCities) {
    return -1;
  }

  const cityGraph = Array(totalCities)
    .fill()
    .map(() => []);
  for (const [segmentStart, segmentEnd, segmentCost] of roadSegments) {
    cityGraph[segmentStart].push([segmentEnd, segmentCost]);
    cityGraph[segmentEnd].push([segmentStart, segmentCost]);
  }

  const memoizationMap = new Map();
  let maxTotalCost = -1;

  for (
    let initialCityIndex = 0;
    initialCityIndex < totalCities;
    initialCityIndex++
  ) {
    maxTotalCost = Math.max(
      maxTotalCost,
      calculateMaxCost(initialCityIndex, 1 << initialCityIndex)
    );
  }

  return maxTotalCost;

  function calculateMaxCost(currentCityIndex, visitedCitiesMask) {
    const numberOfVisitedCities =
      visitedCitiesMask.toString(2).split("1").length - 1;
    if (numberOfVisitedCities === highwayCount + 1) {
      return 0;
    }

    const cacheKey = `${currentCityIndex}_${visitedCitiesMask}`;
    if (memoizationMap.has(cacheKey)) {
      return memoizationMap.get(cacheKey);
    }

    let currentAnswer = -1;
    for (const [nextAdjacentCity, connectionToll] of cityGraph[
      currentCityIndex
    ]) {
      if (!((visitedCitiesMask >> nextAdjacentCity) & 1)) {
        const recursiveResult = calculateMaxCost(
          nextAdjacentCity,
          visitedCitiesMask | (1 << nextAdjacentCity)
        );
        if (recursiveResult !== -1) {
          currentAnswer = Math.max(
            currentAnswer,
            connectionToll + recursiveResult
          );
        }
      }
    }

    memoizationMap.set(cacheKey, currentAnswer);
    return currentAnswer;
  }
};
