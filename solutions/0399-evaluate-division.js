/**
 * Evaluate Division
 * Intuition: Equations are weighted directed edges (`a/b = v` and `b/a = 1/v`). A query is the product of edge weights along any path from source to target, found by DFS.
 * Approach: 1. Build `adjacencyGraph` from `equations`/`values`. 2. For each query, DFS from `querySrc` multiplying `currentProduct`, skipping visited nodes; missing variables or no path yield -1. 3. Collect results.
 * Dry Run: a/b=2, b/c=3. Query a/c.
 *   - edges a→b 2, b→a 0.5, b→c 3, c→b 1/3.
 *   - DFS a→b product 2, b→c product 6. Return [6].
 * Time Complexity: O((V + E) * Q)
 * Space Complexity: O(V + E)
 */
var calcEquation = function (equations, values, queries) {
  const adjacencyGraph = new Map();
  let equationIdx = 0;
  const equationsTotal = equations.length;

  while (equationIdx < equationsTotal) {
    const currentEq = equations[equationIdx];
    const varAlpha = currentEq[0];
    const varBeta = currentEq[1];
    const currentVal = values[equationIdx];

    let neighborsAlpha = adjacencyGraph.get(varAlpha);
    if (neighborsAlpha === undefined) {
      neighborsAlpha = [];
    }
    neighborsAlpha.push([varBeta, currentVal]);
    adjacencyGraph.set(varAlpha, neighborsAlpha);

    let neighborsBeta = adjacencyGraph.get(varBeta);
    if (neighborsBeta === undefined) {
      neighborsBeta = [];
    }
    neighborsBeta.push([varAlpha, 1 / currentVal]);
    adjacencyGraph.set(varBeta, neighborsBeta);

    equationIdx++;
  }

  function depthFirstSearch(
    sourceVar,
    targetVar,
    visitedNodesSet,
    currentProduct
  ) {
    if (!adjacencyGraph.has(sourceVar) || !adjacencyGraph.has(targetVar)) {
      return -1.0;
    }
    if (sourceVar === targetVar) {
      return currentProduct;
    }

    visitedNodesSet.add(sourceVar);

    const sourceConnections = adjacencyGraph.get(sourceVar);
    let connectionCount = 0;
    const totalSourceConnections = sourceConnections.length;

    while (connectionCount < totalSourceConnections) {
      const connectionDetailsArray = sourceConnections[connectionCount];
      const nextNodeVar = connectionDetailsArray[0];
      const edgeWeightVal = connectionDetailsArray[1];

      if (!visitedNodesSet.has(nextNodeVar)) {
        const pathResultFromNext = depthFirstSearch(
          nextNodeVar,
          targetVar,
          visitedNodesSet,
          currentProduct * edgeWeightVal
        );
        if (pathResultFromNext !== -1.0) {
          return pathResultFromNext;
        }
      }
      connectionCount++;
    }

    return -1.0;
  }

  const finalResults = [];
  let queryIteration = 0;
  const queriesTotal = queries.length;

  while (queryIteration < queriesTotal) {
    const currentQuery = queries[queryIteration];
    const querySrc = currentQuery[0];
    const queryDest = currentQuery[1];

    const queryVisitedTracker = new Set();
    const initialQueryProduct = 1.0;

    const resultForQuery = depthFirstSearch(
      querySrc,
      queryDest,
      queryVisitedTracker,
      initialQueryProduct
    );
    finalResults.push(resultForQuery);

    queryIteration++;
  }

  return finalResults;
};
