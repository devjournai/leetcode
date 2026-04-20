/**
 * Number Of Provinces
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var findCircleNum = function (isConnected) {
  const totalCities = isConnected.length;
  const citiesVisitedStatus = new Array(totalCities).fill(false);
  let provincesFound = 0;

  for (
    let currentCityIndex = 0;
    currentCityIndex < totalCities;
    currentCityIndex++
  ) {
    if (!citiesVisitedStatus[currentCityIndex]) {
      provincesFound++;
      const bfsQueue = [];
      bfsQueue.push(currentCityIndex);
      citiesVisitedStatus[currentCityIndex] = true;

      let queuePointer = 0;
      while (queuePointer < bfsQueue.length) {
        const processedCity = bfsQueue[queuePointer];
        queuePointer++;

        for (
          let connectedCityIndex = 0;
          connectedCityIndex < totalCities;
          connectedCityIndex++
        ) {
          if (
            isConnected[processedCity][connectedCityIndex] === 1 &&
            !citiesVisitedStatus[connectedCityIndex]
          ) {
            citiesVisitedStatus[connectedCityIndex] = true;
            bfsQueue.push(connectedCityIndex);
          }
        }
      }
    }
  }

  return provincesFound;
};
