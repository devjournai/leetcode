/**
 * Closest Node To Path In Tree
 * Intuition: The closest node on a path A-B to a target node C in a tree is the deepest of the three LCAs: LCA(A,B), LCA(A,C), and LCA(B,C). This property leverages the tree structure to find the "meeting point" of C with the path A-B.
 * Approach:
 * 1. Build an adjacency list for the tree from the given edges.
 * 2. Perform a Depth First Search (DFS) starting from node 0 (root) to precompute depths of all nodes and populate a binary lifting parent jump table. The table `parentJumpTable[node][k]` stores the (2^k)-th ancestor of `node`.
 * 3. Implement `retrieveKthAncestorNode` function: Given a node and `k`, it uses the binary lifting table to efficiently find the `k`-th ancestor of the node.
 * 4. Implement `findLowestCommonAncestorNode` function: Given two nodes, it first equalizes their depths by moving the deeper node up using `retrieveKthAncestorNode`. Then, it moves both nodes up simultaneously using binary lifting until their parents are different, at which point their direct parent is the LCA.
 * 5. For each query `[startNode, endNode, targetNode]`:
 *    a. Calculate `lcaPathEnds = findLowestCommonAncestorNode(startNode, endNode)`.
 *    b. Calculate `lcaStartTarget = findLowestCommonAncestorNode(startNode, targetNode)`.
 *    c. Calculate `lcaEndTarget = findLowestCommonAncestorNode(endNode, targetNode)`.
 *    d. The answer for the query is the node among `lcaPathEnds`, `lcaStartTarget`, and `lcaEndTarget` that has the greatest depth (is deepest in the tree).
 * 6. Collect all answers in an array and return it.
 * Dry Run:
 *   n=4, edges=[[0,1],[1,2],[1,3]], query=[[2,3,0]]
 *   Tree: 0-1, 1-2, 1-3. (0 is root)
 *   Depths: nodeDepths[0]=0, nodeDepths[1]=1, nodeDepths[2]=2, nodeDepths[3]=2.
 *   Graph: adj[0]=[1], adj[1]=[0,2,3], adj[2]=[1], adj[3]=[1]
 *   DFS populates parentJumpTable (e.g., parentJumpTable[2][0]=1, parentJumpTable[3][0]=1, parentJumpTable[2][1]=0, parentJumpTable[3][1]=0).
 *
 *   Query [2,3,0]: pathStartNode=2, pathEndNode=3, queryTargetNode=0
 *   1. findLowestCommonAncestorNode(2,3):
 *      - Depths are equal (2,2).
 *      - Nodes 2 and 3 are not equal.
 *      - Binary lifting from max bit down:
 *        - parentJumpTable[2][1]=0, parentJumpTable[3][1]=0 (equal, skip)
 *        - parentJumpTable[2][0]=1, parentJumpTable[3][0]=1 (equal, skip)
 *      - Return parentJumpTable[2][0] which is 1. => lcaPathEnds = 1.
 *   2. findLowestCommonAncestorNode(2,0):
 *      - nodeDepths[2]=2, nodeDepths[0]=0. Swap to (0,2).
 *      - retrieveKthAncestorNode(2, 2-0=2):
 *        - move 2 up by 2 steps: 2 -> parentJumpTable[2][1]=0. Returns 0.
 *      - Now nodeA=0, nodeB=0. They are equal. Return 0. => lcaStartTarget = 0.
 *   3. findLowestCommonAncestorNode(3,0):
 *      - Similar to (2), returns 0. => lcaEndTarget = 0.
 *
 *   Candidates: [1, 0, 0].
 *   Depths: nodeDepths[1]=1, nodeDepths[0]=0.
 *   Find deepest:
 *   - deepestNodeCandidate = 1 (depth 1).
 *   - Compare with 0 (depth 0): 1 is deeper.
 *   - Compare with 0 (depth 0): 1 is deeper.
 *   Final answer for query: 1.
 * Time Complexity: O((N + M) * logN)
 * Space Complexity: O(N * logN)
 */
var closestNode = function (n, edges, query) {
  const LOG_MAX_NODES_UPPER_BOUND = 17;

  const adjacencyGraph = new Array(n).fill(null).map(() => []);
  for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
    const currentEdge = edges[edgeIndex];
    const nodeOne = currentEdge[0];
    const nodeTwo = currentEdge[1];
    adjacencyGraph[nodeOne].push(nodeTwo);
    adjacencyGraph[nodeTwo].push(nodeOne);
  }

  const nodeDepths = new Array(n).fill(0);
  const parentJumpTable = new Array(n)
    .fill(null)
    .map(() => new Array(LOG_MAX_NODES_UPPER_BOUND).fill(0));

  const pathTraversalStack = [];

  const executeDfsTraversal = (
    currentNodeIdentifier,
    pathTracker,
    currentLevel,
  ) => {
    nodeDepths[currentNodeIdentifier] = currentLevel;
    for (
      let bitPositionDfs = 0;
      bitPositionDfs < LOG_MAX_NODES_UPPER_BOUND;
      bitPositionDfs++
    ) {
      const powerOfTwoSteps = 1 << bitPositionDfs;
      if (powerOfTwoSteps <= pathTracker.length) {
        parentJumpTable[currentNodeIdentifier][bitPositionDfs] =
          pathTracker[pathTracker.length - powerOfTwoSteps];
      }
    }
    pathTracker.push(currentNodeIdentifier);

    const currentNeighbors = adjacencyGraph[currentNodeIdentifier];
    for (
      let neighborIter = 0;
      neighborIter < currentNeighbors.length;
      neighborIter++
    ) {
      const nextConnectedNode = currentNeighbors[neighborIter];
      const isParentNode =
        pathTracker.length >= 2 &&
        nextConnectedNode === pathTracker[pathTracker.length - 2];
      if (!isParentNode) {
        executeDfsTraversal(nextConnectedNode, pathTracker, currentLevel + 1);
      }
    }
    pathTracker.pop();
  };

  executeDfsTraversal(0, pathTraversalStack, 0);

  const retrieveKthAncestorNode = (startReferenceNode, stepsToGo) => {
    let currentIterNode = startReferenceNode;
    let remainingPathSteps = stepsToGo;
    for (
      let bitIndexKthParent = LOG_MAX_NODES_UPPER_BOUND - 1;
      bitIndexKthParent >= 0;
      bitIndexKthParent--
    ) {
      if ((remainingPathSteps >> bitIndexKthParent) & 1) {
        currentIterNode = parentJumpTable[currentIterNode][bitIndexKthParent];
      }
    }
    return currentIterNode;
  };

  const findLowestCommonAncestorNode = (firstInputNode, secondInputNode) => {
    let nodeA = firstInputNode;
    let nodeB = secondInputNode;

    if (nodeDepths[nodeA] > nodeDepths[nodeB]) {
      [nodeA, nodeB] = [nodeB, nodeA];
    }

    nodeB = retrieveKthAncestorNode(
      nodeB,
      nodeDepths[nodeB] - nodeDepths[nodeA],
    );

    if (nodeA === nodeB) {
      return nodeA;
    }

    for (
      let bitIndexLca = LOG_MAX_NODES_UPPER_BOUND - 1;
      bitIndexLca >= 0;
      bitIndexLca--
    ) {
      if (
        parentJumpTable[nodeA][bitIndexLca] !==
        parentJumpTable[nodeB][bitIndexLca]
      ) {
        nodeA = parentJumpTable[nodeA][bitIndexLca];
        nodeB = parentJumpTable[nodeB][bitIndexLca];
      }
    }
    return parentJumpTable[nodeA][0];
  };

  const queryResults = new Array(query.length);
  for (let queryIdx = 0; queryIdx < query.length; queryIdx++) {
    const currentQuery = query[queryIdx];
    const pathStartNode = currentQuery[0];
    const pathEndNode = currentQuery[1];
    const queryTargetNode = currentQuery[2];

    const lcaPathEnds = findLowestCommonAncestorNode(
      pathStartNode,
      pathEndNode,
    );
    const lcaStartTarget = findLowestCommonAncestorNode(
      pathStartNode,
      queryTargetNode,
    );
    const lcaEndTarget = findLowestCommonAncestorNode(
      pathEndNode,
      queryTargetNode,
    );

    let deepestNodeCandidate = lcaPathEnds;
    if (nodeDepths[lcaStartTarget] > nodeDepths[deepestNodeCandidate]) {
      deepestNodeCandidate = lcaStartTarget;
    }
    if (nodeDepths[lcaEndTarget] > nodeDepths[deepestNodeCandidate]) {
      deepestNodeCandidate = lcaEndTarget;
    }
    queryResults[queryIdx] = deepestNodeCandidate;
  }

  return queryResults;
};
