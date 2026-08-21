/**
 * Maximum Total Importance Of Roads
 * Intuition: To maximize the total importance, cities that are connected to more roads (higher degree) should be assigned higher importance values (from n down to 1). This is a greedy approach where each road's importance is the sum of its connected cities' values. By assigning higher values to cities that participate in more sums (more roads), we maximize the overall total.
 * Approach: 1. Calculate the degree (number of connections) for each city. 2. Create an array of city indices. 3. Sort these city indices in descending order based on their degrees. 4. Iterate through the sorted cities, assigning the highest available importance values (n, n-1, ..., 1) to cities with higher degrees and summing up their contributions.
 * Dry Run:
 * n = 5, roads = [[0,1],[1,2],[2,3],[0,2],[1,3],[3,4]]
 *
 * 1. Initialize `cityConnectionCounts` array of size 5: `[0, 0, 0, 0, 0]`
 *
 * 2. Iterate through `roadConnections` to populate `cityConnectionCounts`:
 *    - `[0,1]`: `cityConnectionCounts[0]++`, `cityConnectionCounts[1]++` -> `[1,1,0,0,0]`
 *    - `[1,2]`: `cityConnectionCounts[1]++`, `cityConnectionCounts[2]++` -> `[1,2,1,0,0]`
 *    - `[2,3]`: `cityConnectionCounts[2]++`, `cityConnectionCounts[3]++` -> `[1,2,2,1,0]`
 *    - `[0,2]`: `cityConnectionCounts[0]++`, `cityConnectionCounts[2]++` -> `[2,2,3,1,0]`
 *    - `[1,3]`: `cityConnectionCounts[1]++`, `cityConnectionCounts[3]++` -> `[2,3,3,2,0]`
 *    - `[3,4]`: `cityConnectionCounts[3]++`, `cityConnectionCounts[4]++` -> `[2,3,3,3,1]`
 *    `cityConnectionCounts` is now `[2, 3, 3, 3, 1]`
 *
 * 3. Create `allCityIndices`: `[0, 1, 2, 3, 4]`
 *
 * 4. Sort `allCityIndices` based on values in `cityConnectionCounts` in descending order:
 *    - City 0 has degree 2
 *    - City 1 has degree 3
 *    - City 2 has degree 3
 *    - City 3 has degree 3
 *    - City 4 has degree 1
 *    Sorted `allCityIndices` (example order): `[1, 2, 3, 0, 4]`
 *    (degrees: 3, 3, 3, 2, 1)
 *
 * 5. Initialize `totalAccumulatedImportance = 0`
 *
 * 6. Iterate `sortedPosition` from 0 to `cityCount - 1`:
 *    - `sortedPosition = 0`:
 *      - `currentCityIdentifier = allCityIndices[0] = 1`
 *      - `assignedImportanceRank = cityCount - 0 = 5`
 *      - `contribution = cityConnectionCounts[1] * 5 = 3 * 5 = 15`
 *      - `totalAccumulatedImportance = 0 + 15 = 15`
 *    - `sortedPosition = 1`:
 *      - `currentCityIdentifier = allCityIndices[1] = 2`
 *      - `assignedImportanceRank = cityCount - 1 = 4`
 *      - `contribution = cityConnectionCounts[2] * 4 = 3 * 4 = 12`
 *      - `totalAccumulatedImportance = 15 + 12 = 27`
 *    - `sortedPosition = 2`:
 *      - `currentCityIdentifier = allCityIndices[2] = 3`
 *      - `assignedImportanceRank = cityCount - 2 = 3`
 *      - `contribution = cityConnectionCounts[3] * 3 = 3 * 3 = 9`
 *      - `totalAccumulatedImportance = 27 + 9 = 36`
 *    - `sortedPosition = 3`:
 *      - `currentCityIdentifier = allCityIndices[3] = 0`
 *      - `assignedImportanceRank = cityCount - 3 = 2`
 *      - `contribution = cityConnectionCounts[0] * 2 = 2 * 2 = 4`
 *      - `totalAccumulatedImportance = 36 + 4 = 40`
 *    - `sortedPosition = 4`:
 *      - `currentCityIdentifier = allCityIndices[4] = 4`
 *      - `assignedImportanceRank = cityCount - 4 = 1`
 *      - `contribution = cityConnectionCounts[4] * 1 = 1 * 1 = 1`
 *      - `totalAccumulatedImportance = 40 + 1 = 41`
 *
 * 7. Return `totalAccumulatedImportance = 41`.
 *
 * Time Complexity: O(R + N log N)
 * Space Complexity: O(N)
 */
var maximumImportance = function (n, roads) {
  const cityConnectionCounts = new Array(n).fill(0);

  for (const [firstCity, secondCity] of roads) {
    cityConnectionCounts[firstCity]++;
    cityConnectionCounts[secondCity]++;
  }

  const allCityIndices = Array.from({ length: n }, (_, cityIndex) => cityIndex);
  allCityIndices.sort(
    (cityA, cityB) => cityConnectionCounts[cityB] - cityConnectionCounts[cityA]
  );

  let totalAccumulatedImportance = 0;
  for (let sortedPosition = 0; sortedPosition < n; sortedPosition++) {
    const currentCityIdentifier = allCityIndices[sortedPosition];
    const assignedImportanceRank = n - sortedPosition;
    totalAccumulatedImportance +=
      cityConnectionCounts[currentCityIdentifier] * assignedImportanceRank;
  }

  return totalAccumulatedImportance;
};
