/**
 * Count Subtrees With Max Distance Between Cities
 * Intuition: Every nonempty city subset is a candidate subtree. It is valid if BFS from one member visits the whole subset. Diameter is the longest shortest path, found by two BFS passes.
 * Approach: 1. Build an adjacency list. 2. Enumerate bitmasks 1..2^n-1. 3. Skip size < 2. 4. BFS from one selected city; skip if not all selected cities are reached. 5. BFS from the farthest city to get the diameter d; increment answer[d-1].
 * Dry Run: n=4, edges form a line 1-2-3-4.
 *   - Subset {1,2,3,4} diameter 3 → answer[2] += 1, plus smaller connected subsets.
 * Time Complexity: O(2^n * n)
 * Space Complexity: O(n)
 */
var countSubgraphsForEachDiameter = function (n, connections) {
  const graphAdjacencyMatrix = Array.from({ length: n }, () => []);
  for (const [nodeU, nodeV] of connections) {
    graphAdjacencyMatrix[nodeU - 1].push(nodeV - 1);
    graphAdjacencyMatrix[nodeV - 1].push(nodeU - 1);
  }

  const diameterCounterArray = new Array(n - 1).fill(0);

  const calculateFarthestNodeAndDistance = (
    subsetInclusionFlags,
    startingCityIndex
  ) => {
    const currentDistancesArray = new Array(n).fill(-1);
    const bfsExecutionQueue = [startingCityIndex];
    currentDistancesArray[startingCityIndex] = 0;
    let maximumPathLength = 0;
    let farthestCityFound = startingCityIndex;
    let reachedNodesCount = 0;

    while (bfsExecutionQueue.length > 0) {
      const processingCity = bfsExecutionQueue.shift();
      reachedNodesCount++;

      for (const adjacentCity of graphAdjacencyMatrix[processingCity]) {
        if (
          subsetInclusionFlags[adjacentCity] &&
          currentDistancesArray[adjacentCity] === -1
        ) {
          currentDistancesArray[adjacentCity] =
            currentDistancesArray[processingCity] + 1;
          if (currentDistancesArray[adjacentCity] > maximumPathLength) {
            maximumPathLength = currentDistancesArray[adjacentCity];
            farthestCityFound = adjacentCity;
          }
          bfsExecutionQueue.push(adjacentCity);
        }
      }
    }
    return {
      maximumDistance: maximumPathLength,
      farthestNode: farthestCityFound,
      visitedNodeTotal: reachedNodesCount,
    };
  };

  for (let subsetMaskValue = 1; subsetMaskValue < 1 << n; subsetMaskValue++) {
    const activeCitySelection = new Array(n).fill(false);
    let currentSubsetSize = 0;
    let initialCityForBFS = -1;

    for (
      let cityIndexIterator = 0;
      cityIndexIterator < n;
      cityIndexIterator++
    ) {
      if ((subsetMaskValue >> cityIndexIterator) & 1) {
        activeCitySelection[cityIndexIterator] = true;
        currentSubsetSize++;
        if (initialCityForBFS === -1) {
          initialCityForBFS = cityIndexIterator;
        }
      }
    }

    if (currentSubsetSize < 2) {
      continue;
    }

    const bfsResultFirst = calculateFarthestNodeAndDistance(
      activeCitySelection,
      initialCityForBFS
    );

    if (bfsResultFirst.visitedNodeTotal !== currentSubsetSize) {
      continue;
    }

    const bfsResultSecond = calculateFarthestNodeAndDistance(
      activeCitySelection,
      bfsResultFirst.farthestNode
    );

    const currentDiameterValue = bfsResultSecond.maximumDistance;

    if (currentDiameterValue > 0) {
      diameterCounterArray[currentDiameterValue - 1]++;
    }
  }

  return diameterCounterArray;
};
