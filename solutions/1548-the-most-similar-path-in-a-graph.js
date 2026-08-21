/**
 * The Most Similar Path In A Graph
 * Intuition: DP min edit distance to match targetPath[i] while standing at city v, coming from a neighbor.
 * Approach: 1. Build adj. 2. dp[0][v]=0 if names[v]==target[0] else 1. 3. Relax along edges. 4. Backtrack previousCityPath from the best last city.
 * Dry Run: two cities A,B with target ["A","B"].
 *   - Path follows the cheapest name mismatches along edges.
 * Time Complexity: O(targetPath.length * (n + roads.length))
 * Space Complexity: O(n + roads.length + targetPath.length * n)
 */
var mostSimilar = function (n, roads, names, targetPath) {
  const adjacencyList = new Array(n).fill().map(() => []);
  for (const roadConnection of roads) {
    const firstNode = roadConnection[0];
    const secondNode = roadConnection[1];
    adjacencyList[firstNode].push(secondNode);
    adjacencyList[secondNode].push(firstNode);
  }

  const targetPathLength = targetPath.length;
  const minEditDistance = new Array(targetPathLength)
    .fill()
    .map(() => new Array(n).fill(Infinity));
  const previousCityPath = new Array(targetPathLength)
    .fill()
    .map(() => new Array(n).fill(-1));

  for (let cityInitialIndex = 0; cityInitialIndex < n; cityInitialIndex++) {
    minEditDistance[0][cityInitialIndex] =
      names[cityInitialIndex] === targetPath[0] ? 0 : 1;
  }

  for (
    let currentPathStep = 1;
    currentPathStep < targetPathLength;
    currentPathStep++
  ) {
    for (let currentNodeIndex = 0; currentNodeIndex < n; currentNodeIndex++) {
      for (const adjacentNodeIndex of adjacencyList[currentNodeIndex]) {
        const calculatedCost =
          minEditDistance[currentPathStep - 1][adjacentNodeIndex] +
          (names[currentNodeIndex] === targetPath[currentPathStep] ? 0 : 1);
        if (
          calculatedCost < minEditDistance[currentPathStep][currentNodeIndex]
        ) {
          minEditDistance[currentPathStep][currentNodeIndex] = calculatedCost;
          previousCityPath[currentPathStep][currentNodeIndex] =
            adjacentNodeIndex;
        }
      }
    }
  }

  let minimumOverallCost = Infinity;
  let lastNodeIndex = -1;
  for (
    let finalCityCandidate = 0;
    finalCityCandidate < n;
    finalCityCandidate++
  ) {
    if (
      minEditDistance[targetPathLength - 1][finalCityCandidate] <
      minimumOverallCost
    ) {
      minimumOverallCost =
        minEditDistance[targetPathLength - 1][finalCityCandidate];
      lastNodeIndex = finalCityCandidate;
    }
  }

  const resultPath = [];
  let nodeInPath = lastNodeIndex;
  for (
    let backtrackStep = targetPathLength - 1;
    backtrackStep >= 0;
    backtrackStep--
  ) {
    resultPath.unshift(nodeInPath);
    nodeInPath = previousCityPath[backtrackStep][nodeInPath];
  }

  return resultPath;
};
