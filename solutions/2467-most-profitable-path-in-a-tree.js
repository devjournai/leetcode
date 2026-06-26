/**
 * Most Profitable Path In A Tree
 * Intuition: The problem involves two agents (Alice and Bob) moving simultaneously on a tree, affecting costs/rewards at nodes. Alice wants to maximize her profit by choosing an optimal leaf node to travel towards. Bob's path is fixed towards the root. The key is to first determine Bob's exact path and the time he arrives at each node on his path. Then, Alice can traverse the tree, calculating her profit at each step based on her arrival time relative to Bob's arrival time at that node.
 * Approach: 1. Build an adjacency list representation of the tree from the given edges. 2. Perform a Depth-First Search (DFS) starting from Bob's initial node (`bob`) to determine the path Bob takes to reach node 0 (the root). During this DFS, record the time Bob arrives at each node on this specific path. Nodes not on Bob's path will have a special marker (e.g., -1) indicating Bob does not visit them. 3. Perform a second DFS starting from node 0 (Alice's initial position) to explore all possible paths Alice can take to any leaf node. 4. In this second DFS, at each node Alice visits at a certain time `t`:
 *    a. If Bob never visited this node (`bobArrivalTime[node] === -1`) or Alice arrives before Bob (`t < bobArrivalTime[node]`), Alice receives the full `amount[node]`.
 *    b. If Alice and Bob arrive at the node simultaneously (`t === bobArrivalTime[node]`), they share the amount, so Alice receives `amount[node] / 2`.
 *    c. If Alice arrives after Bob (`t > bobArrivalTime[node]`), Bob has already opened the gate, so Alice receives 0.
 *    d. Accumulate this calculated gain.
 *    e. If the current node is a leaf (a node with only one neighbor, which must be its parent in the DFS, or node 0 if it has no neighbors for a tree of size 1), the current accumulated profit is a potential maximum.
 *    f. Recursively explore all adjacent nodes (except the parent). The maximum profit among all explored paths is the result.
 * Dry Run:
 *   Input: edges = [[0,1],[1,2],[1,3]], bob = 3, amount = [-2,4,0,-4]
 *   N = 4 nodes (0,1,2,3)
 *   Graph:
 *     0: [1]
 *     1: [0, 2, 3]
 *     2: [1]
 *     3: [1]
 *
 *   1. Bob's path from 3 to 0 (findBobPathTimes):
 *      - `bobArrivalTime` initialized to `[-1, -1, -1, -1]`
 *      - `findBobPathTimes(3, 0, -1)`:
 *        - `bobArrivalTime[3] = 0`
 *        - Recurse for 1: `findBobPathTimes(1, 1, 3)`
 *          - `bobArrivalTime[1] = 1`
 *          - Recurse for 0: `findBobPathTimes(0, 2, 1)`
 *            - `bobArrivalTime[0] = 2`
 *            - `currentBobNode == 0`, path found. Returns true.
 *          - Returns true.
 *        - Returns true.
 *      - Final `bobArrivalTime`: `[2, 1, -1, 0]` (Node 0 at t=2, Node 1 at t=1, Node 2 not on path, Node 3 at t=0)
 *
 *   2. Alice's DFS from 0 (calculateMaxProfit):
 *      - `calculateMaxProfit(0, -1, 0, 0)`:
 *        - `currentAliceNode = 0`, `aliceCurrentTime = 0`, `accumulatedAliceProfit = 0`
 *        - Bob at node 0 at t=2. Alice at node 0 at t=0. Alice arrives before Bob (`0 < 2`).
 *        - `gainAtCurrentVertex = amount[0] = -2`.
 *        - `currentAccumulatedValue` becomes `0 + (-2) = -2`.
 *        - `adjList[0] = [1]`. Explore neighbor 1.
 *        - Call `calculateMaxProfit(1, 0, 1, -2)`:
 *          - `currentAliceNode = 1`, `aliceCurrentTime = 1`, `accumulatedAliceProfit = -2`
 *          - Bob at node 1 at t=1. Alice at node 1 at t=1. Alice and Bob arrive simultaneously (`1 === 1`).
 *          - `gainAtCurrentVertex = amount[1] / 2 = 4 / 2 = 2`.
 *          - `currentAccumulatedValue` becomes `-2 + 2 = 0`.
 *          - `adjList[1] = [0, 2, 3]`.
 *          - Skip parent 0.
 *          - Explore neighbor 2: `calculateMaxProfit(2, 1, 2, 0)`:
 *            - `currentAliceNode = 2`, `aliceCurrentTime = 2`, `accumulatedAliceProfit = 0`
 *            - Bob never visits node 2 (`bobArrivalTime[2] = -1`).
 *            - `gainAtCurrentVertex = amount[2] = 0`.
 *            - `currentAccumulatedValue` becomes `0 + 0 = 0`.
 *            - `adjList[2] = [1]`. Node 2 is a leaf (`length=1` and `!=0`).
 *            - Max profit for this path: `0`. Returns `0`.
 *          - `maxPossibleGain` becomes `max(-Infinity, 0) = 0`.
 *          - Explore neighbor 3: `calculateMaxProfit(3, 1, 2, 0)`:
 *            - `currentAliceNode = 3`, `aliceCurrentTime = 2`, `accumulatedAliceProfit = 0`
 *            - Bob at node 3 at t=0. Alice at node 3 at t=2. Alice arrives after Bob (`2 > 0`).
 *            - `gainAtCurrentVertex = 0`.
 *            - `currentAccumulatedValue` becomes `0 + 0 = 0`.
 *            - `adjList[3] = [1]`. Node 3 is a leaf (`length=1` and `!=0`).
 *            - Max profit for this path: `0`. Returns `0`.
 *          - `maxPossibleGain` becomes `max(0, 0) = 0`.
 *          - Node 1 is not a leaf from Alice's perspective as it has children other than its parent.
 *          - Returns `0`.
 *        - `maxPossibleGain` becomes `max(-Infinity, 0) = 0`.
 *        - Node 0 is not a leaf from Alice's perspective.
 *        - Returns `0`.
 * Output: 0
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var mostProfitablePath = function (edges, bob, amount) {
  const totalNodes = edges.length + 1;
  const adjList = new Array(totalNodes).fill(null).map(() => []);
  const bobArrivalTime = new Array(totalNodes).fill(-1);

  for (const edgePair of edges) {
    const firstNode = edgePair[0];
    const secondNode = edgePair[1];
    adjList[firstNode].push(secondNode);
    adjList[secondNode].push(firstNode);
  }

  function findBobPathTimes(currentBobNode, currentBobTime, previousBobNode) {
    bobArrivalTime[currentBobNode] = currentBobTime;
    if (currentBobNode === 0) {
      return true;
    }
    for (const nextBobNode of adjList[currentBobNode]) {
      if (nextBobNode !== previousBobNode) {
        if (findBobPathTimes(nextBobNode, currentBobTime + 1, currentBobNode)) {
          return true;
        }
      }
    }
    bobArrivalTime[currentBobNode] = -1;
    return false;
  }

  findBobPathTimes(bob, 0, -1);

  function calculateMaxProfit(
    currentAliceNode,
    parentAliceNode,
    currentAliceTime,
    currentAccumulatedValue,
  ) {
    let gainAtCurrentVertex;
    if (
      bobArrivalTime[currentAliceNode] === -1 ||
      currentAliceTime < bobArrivalTime[currentAliceNode]
    ) {
      gainAtCurrentVertex = amount[currentAliceNode];
    } else if (currentAliceTime === bobArrivalTime[currentAliceNode]) {
      gainAtCurrentVertex = amount[currentAliceNode] / 2;
    } else {
      gainAtCurrentVertex = 0;
    }

    let maxPossibleGain = -Infinity;
    const currentPathValue = currentAccumulatedValue + gainAtCurrentVertex;

    let hasUnvisitedChildren = false;
    for (const adjacentVertex of adjList[currentAliceNode]) {
      if (adjacentVertex !== parentAliceNode) {
        hasUnvisitedChildren = true;
        const recursiveGain = calculateMaxProfit(
          adjacentVertex,
          currentAliceNode,
          currentAliceTime + 1,
          currentPathValue,
        );
        maxPossibleGain = Math.max(maxPossibleGain, recursiveGain);
      }
    }

    if (!hasUnvisitedChildren) {
      return currentPathValue;
    }

    return maxPossibleGain;
  }

  return calculateMaxProfit(0, -1, 0, 0);
};
