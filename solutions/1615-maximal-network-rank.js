/**
 * Maximal Network Rank
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
