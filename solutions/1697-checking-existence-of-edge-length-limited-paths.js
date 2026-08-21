/**
 * Checking Existence Of Edge Length Limited Paths
 * Intuition: A query (u,v,limit) is true iff u and v are connected using only edges with weight < limit. Sort edges and queries by weight and union-find incrementally so each query sees exactly the eligible edges.
 * Approach: 1. `findRoot`/`uniteSets` on `parentNodes`. 2. Sort `edgeList` by weight; attach original indices to queries and sort by limit. 3. Two-pointer: union edges with weight < `currentLimit`, then set `finalResults[idx]` if same root. 4. Return `finalResults`.
 * Dry Run: n=3, edges=[[0,1,2],[1,2,4],[2,0,8],[1,0,16]], queries=[[0,1,2],[0,2,5]]
 * Query limit 2: no edge <2 → false. Limit 5: union 0-1 (w=2) and 1-2 (w=4) → 0 and 2 connected → true.
 * Time Complexity: O((M + Q) * α(N) + M log M + Q log Q)
 * Space Complexity: O(N + M + Q)
 */
var distanceLimitedPathsExist = function (n, edgeList, queries) {
  const parentNodes = new Array(n)
    .fill(0)
    .map((_val, currentIdx) => currentIdx);

  const findRoot = (targetNode) => {
    if (parentNodes[targetNode] !== targetNode) {
      parentNodes[targetNode] = findRoot(parentNodes[targetNode]);
    }
    return parentNodes[targetNode];
  };

  const uniteSets = (nodeOne, nodeTwo) => {
    const rootOne = findRoot(nodeOne);
    const rootTwo = findRoot(nodeTwo);
    if (rootOne !== rootTwo) {
      parentNodes[rootOne] = rootTwo;
    }
  };

  edgeList.sort((edgeA, edgeB) => edgeA[2] - edgeB[2]);

  const queriesWithIndices = queries.map((queryEntry, originalIdx) => [
    queryEntry[0],
    queryEntry[1],
    queryEntry[2],
    originalIdx,
  ]);
  queriesWithIndices.sort((queryA, queryB) => queryA[2] - queryB[2]);

  const finalResults = new Array(queries.length).fill(false);

  let edgePointer = 0;
  for (const currentQueryData of queriesWithIndices) {
    const queryStartNode = currentQueryData[0];
    const queryEndNode = currentQueryData[1];
    const currentLimit = currentQueryData[2];
    const resultStoringIndex = currentQueryData[3];

    while (
      edgePointer < edgeList.length &&
      edgeList[edgePointer][2] < currentLimit
    ) {
      const currentEdgeStart = edgeList[edgePointer][0];
      const currentEdgeEnd = edgeList[edgePointer][1];
      uniteSets(currentEdgeStart, currentEdgeEnd);
      edgePointer++;
    }

    finalResults[resultStoringIndex] =
      findRoot(queryStartNode) === findRoot(queryEndNode);
  }

  return finalResults;
};
