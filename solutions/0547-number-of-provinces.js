/**
 * Number Of Provinces
 * Intuition: Provinces are connected components in the undirected city graph. Each unvisited city starts a BFS that marks its whole component; the number of such starts is the answer.
 * Approach: 1. `citiesVisitedStatus` all false. 2. For each unvisited city, increment `provincesFound` and BFS: enqueue it, mark visited. 3. For each dequeued city, enqueue unvisited neighbors with `isConnected[u][v] === 1`. 4. Return `provincesFound`.
 * Dry Run: isConnected = [[1,1,0],[1,1,0],[0,0,1]].
 *   - City 0 starts province 1; BFS visits 0 and 1.
 *   - City 2 starts province 2. Return 2.
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
