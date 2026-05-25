/**
 * Valid Arrangement Of Pairs
 * Intuition: The problem asks us to arrange pairs [start_i, end_i] such that end_{j} == start_{j+1} for all adjacent pairs. This is a classic Eulerian path problem in a directed graph where each pair represents a directed edge from `start_i` to `end_i`. An Eulerian path traverses every edge exactly once.
 * Approach: 1. Construct a directed graph from the given pairs using an adjacency list (Map where keys are nodes and values are arrays of destination nodes). To facilitate Hierholzer's algorithm, we'll treat these arrays as stacks, so new destinations can be pushed and popped efficiently. 2. Calculate the in-degree and out-degree for each node. We can store the difference `out-degree - in-degree` in a separate Map. An Eulerian path starts at a node with `out-degree - in-degree = 1` and ends at a node with `out-degree - in-degree = -1`. All other nodes must have `out-degree - in-degree = 0`. We find this starting node; if no node has a difference of 1, any node from the input can be a starting point (as it implies an Eulerian circuit). 3. Apply Hierholzer's algorithm using a DFS-like traversal. Starting from the determined `startNode`, we recursively visit neighbors. When returning from a recursive call for a `nextNode`, we push the current edge `[currentNode, nextNode]` onto a result stack. This builds the path in reverse order. 4. Finally, reverse the accumulated path stack to get the correct arrangement.
 * Dry Run: pairs = [[1,2],[2,3],[3,1]]
 * 1. Graph Construction and Degree Calculation:
 *    graphAdjacency: Map { 1: [2], 2: [3], 3: [1] }
 *    degreeBalance: Map { 1: 0, 2: 0, 3: 0 } (all out-degree - in-degree = 0)
 * 2. Find Starting Node:
 *    initialStart = 1 (from pairs[0][0])
 *    Iterating degreeBalance, no node has degree > 0. initialStart remains 1.
 * 3. DFS Traversal (Hierholzer's):
 *    pathResult = []
 *    Call dfsExplore(1):
 *      - currentVertex = 1
 *      - adjListOne = graphAdjacency.get(1) -> [2]
 *      - Pop 2. nextPoint = 2.
 *      - Call dfsExplore(2):
 *        - currentVertex = 2
 *        - adjListTwo = graphAdjacency.get(2) -> [3]
 *        - Pop 3. nextPoint = 3.
 *        - Call dfsExplore(3):
 *          - currentVertex = 3
 *          - adjListThree = graphAdjacency.get(3) -> [1]
 *          - Pop 1. nextPoint = 1.
 *          - Call dfsExplore(1) (recursively):
 *            - currentVertex = 1
 *            - adjListOne = graphAdjacency.get(1) -> [] (now empty)
 *            - Loop ends. Return.
 *          - Push [3,1] to pathResult. pathResult = [[3,1]]
 *        - adjListThree is now empty. Loop ends. Return.
 *        - Push [2,3] to pathResult. pathResult = [[3,1], [2,3]]
 *      - adjListTwo is now empty. Loop ends. Return.
 *      - Push [1,2] to pathResult. pathResult = [[3,1], [2,3], [1,2]]
 *    dfsExplore(1) finishes.
 * 4. Reverse Result:
 *    pathResult.reverse() -> [[1,2], [2,3], [3,1]]
 * Time Complexity: O(E)
 * Space Complexity: O(V + E)
 */
var validArrangement = function (pairs) {
  const graphAdjacency = new Map();
  const degreeBalance = new Map();

  for (const currentPairElement of pairs) {
    const startPointValue = currentPairElement[0];
    const endPointValue = currentPairElement[1];

    if (!graphAdjacency.has(startPointValue)) {
      graphAdjacency.set(startPointValue, []);
    }
    graphAdjacency.get(startPointValue).push(endPointValue);

    degreeBalance.set(
      startPointValue,
      (degreeBalance.get(startPointValue) || 0) + 1,
    );
    degreeBalance.set(
      endPointValue,
      (degreeBalance.get(endPointValue) || 0) - 1,
    );
  }

  let initialStart = pairs[0][0];
  for (const [nodeIdentifier, degreeDelta] of degreeBalance) {
    if (degreeDelta > 0) {
      initialStart = nodeIdentifier;
      break;
    }
  }

  const pathResult = [];

  function dfsExplore(currentVertex) {
    const adjacentList = graphAdjacency.get(currentVertex);
    while (adjacentList && adjacentList.length > 0) {
      const nextPoint = adjacentList.pop();
      dfsExplore(nextPoint);
      pathResult.push([currentVertex, nextPoint]);
    }
  }

  dfsExplore(initialStart);

  return pathResult.reverse();
};
