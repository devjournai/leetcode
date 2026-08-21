/**
 * Maximal Network Rank
 * Intuition: Rank of a pair is deg(a)+deg(b), minus 1 if they share a road (that road was counted twice). Check every pair.
 * Approach: 1. Count degrees and store undirected edges in a set of "min-max" keys. 2. For every i < j, sum degrees and decrement if the edge exists. 3. Track the maximum rank.
 * Dry Run: n=4, roads=[[0,1],[0,3],[1,2],[1,3]].
 *   - deg=[2,3,1,2]. Pair (0,1): 2+3-1=4, which is maximal.
 * Time Complexity: O(n^2 + m)
 * Space Complexity: O(n + m)
 */
var maximalNetworkRank = function (totalCities, roadConnections) {
  const degreeCounts = new Array(totalCities).fill(0);
  const roadExistenceMap = new Set();

  for (const [firstRoadCity, secondRoadCity] of roadConnections) {
    degreeCounts[firstRoadCity]++;
    degreeCounts[secondRoadCity]++;
    const smallerCityIdentifier = Math.min(firstRoadCity, secondRoadCity);
    const largerCityIdentifier = Math.max(firstRoadCity, secondRoadCity);
    roadExistenceMap.add(`${smallerCityIdentifier}-${largerCityIdentifier}`);
  }

  let highestRank = 0;

  for (let firstCityIndex = 0; firstCityIndex < totalCities; firstCityIndex++) {
    for (
      let secondCityIndex = firstCityIndex + 1;
      secondCityIndex < totalCities;
      secondCityIndex++
    ) {
      let currentRank =
        degreeCounts[firstCityIndex] + degreeCounts[secondCityIndex];

      const cityAKey = Math.min(firstCityIndex, secondCityIndex);
      const cityBKey = Math.max(firstCityIndex, secondCityIndex);
      if (roadExistenceMap.has(`${cityAKey}-${cityBKey}`)) {
        currentRank--;
      }

      highestRank = Math.max(highestRank, currentRank);
    }
  }

  return highestRank;
};
