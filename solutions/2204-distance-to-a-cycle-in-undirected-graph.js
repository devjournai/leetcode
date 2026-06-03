/**
 * Distance To A Cycle In Undirected Graph
 * Intuition: In a connected undirected graph with exactly one cycle, nodes that are not part of the cycle must belong to 'tree' structures attached to cycle nodes. These tree nodes can be identified and progressively removed (like leaves in a tree) until only the cycle nodes remain. Once cycle nodes are identified, a multi-source Breadth-First Search (BFS) from all cycle nodes simultaneously can determine the minimum distance to any cycle node for every other node in the graph.
 * Approach: 1. Build an adjacency list representation of the graph and compute the initial degree for each node. 2. Initialize a queue with all nodes that have a degree of 1 (these are 'leaves' of the tree structures connected to the cycle). Also, initialize a distances array with a sentinel value (e.g., -1) for all nodes. 3. Perform a modified Kahn's algorithm (BFS-like process) to trim nodes: Dequeue a node, mark its distance as 'Infinity' (or another specific sentinel indicating it's a non-cycle node), and for its neighbors, decrement their degrees. If a neighbor's degree becomes 1, enqueue it. This process continues until the queue is empty. After this, nodes whose distances are still the sentinel value (e.g., -1) are the cycle nodes. 4. Initialize a new BFS queue with all cycle nodes and set their distances to 0. 5. Perform a standard multi-source BFS: Dequeue a node, and for each neighbor, if its distance is still the 'Infinity' sentinel (meaning it's a non-cycle node that hasn't been reached yet by the BFS), update its distance to current node's distance + 1 and enqueue it. This propagates distances outwards from the cycle.
 * Dry Run: n = 7, edges = [[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6]]
 * Graph: 0-1-2-3-0 (cycle), 0-4-5-6 (path attached to cycle)
 *
 * 1. Initialization:
 *    graphNeighbors: [ [1,3,4], [0,2], [1,3], [2,0], [0,5], [4,6], [5] ]
 *    degreeTracker: [3, 2, 2, 2, 2, 2, 1] (for nodes 0 to 6)
 *    finalDistances: [-1, -1, -1, -1, -1, -1, -1]
 *
 * 2. Phase 1 (Trimming Leaves):
 *    leafNodeQueue: [6] (node 6 has degree 1)
 *
 *    Iteration 1:
 *      currentNodeRemoved = 6. finalDistances[6] = Infinity.
 *      Neighbors of 6: [5]. degreeTracker[5]-- (becomes 1). leafNodeQueue.push(5).
 *      leafNodeQueue: [5]
 *
 *    Iteration 2:
 *      currentNodeRemoved = 5. finalDistances[5] = Infinity.
 *      Neighbors of 5: [4,6]. degreeTracker[4]-- (becomes 1). leafNodeQueue.push(4). degreeTracker[6]-- (becomes 0, already processed).
 *      leafNodeQueue: [4]
 *
 *    Iteration 3:
 *      currentNodeRemoved = 4. finalDistances[4] = Infinity.
 *      Neighbors of 4: [0,5]. degreeTracker[0]-- (becomes 2, not 1). degreeTracker[5]-- (becomes 0, already processed).
 *      leafNodeQueue: []
 *
 *    End Phase 1.
 *    finalDistances: [-1, -1, -1, -1, Infinity, Infinity, Infinity] (Nodes 0,1,2,3 are cycle nodes, 4,5,6 are non-cycle)
 *
 * 3. Phase 2 (Multi-Source BFS from Cycle Nodes):
 *    distanceComputationQueue: []
 *
 *    Initialize queue:
 *      For node 0,1,2,3 (where finalDistances is -1):
 *        Set finalDistances[node] = 0.
 *        Push node to distanceComputationQueue.
 *    distanceComputationQueue: [0, 1, 2, 3]
 *    finalDistances: [0, 0, 0, 0, Infinity, Infinity, Infinity]
 *
 *    BFS:
 *      Dequeue 0 (dist 0). Neighbors: [1,3,4].
 *        4 (dist Infinity) -> finalDistances[4]=1. Push 4.
 *      Dequeue 1 (dist 0). Neighbors: [0,2]. (All already 0 or processed)
 *      Dequeue 2 (dist 0). Neighbors: [1,3]. (All already 0 or processed)
 *      Dequeue 3 (dist 0). Neighbors: [2,0]. (All already 0 or processed)
 *      distanceComputationQueue: [4]
 *      finalDistances: [0, 0, 0, 0, 1, Infinity, Infinity]
 *
 *      Dequeue 4 (dist 1). Neighbors: [0,5].
 *        5 (dist Infinity) -> finalDistances[5]=2. Push 5.
 *      distanceComputationQueue: [5]
 *      finalDistances: [0, 0, 0, 0, 1, 2, Infinity]
 *
 *      Dequeue 5 (dist 2). Neighbors: [4,6].
 *        6 (dist Infinity) -> finalDistances[6]=3. Push 6.
 *      distanceComputationQueue: [6]
 *      finalDistances: [0, 0, 0, 0, 1, 2, 3]
 *
 *      Dequeue 6 (dist 3). Neighbors: [5]. (Already processed)
 *      distanceComputationQueue: []
 *
 *    End Phase 2.
 *    Result: [0, 0, 0, 0, 1, 2, 3]
 *
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var distanceToCycle = function (n, edges) {
  const graphNeighbors = Array.from({ length: n }, () => []);
  const degreeTracker = new Array(n).fill(0);

  for (const edgeElement of edges) {
    const nodeOne = edgeElement[0];
    const nodeTwo = edgeElement[1];
    graphNeighbors[nodeOne].push(nodeTwo);
    graphNeighbors[nodeTwo].push(nodeOne);
    degreeTracker[nodeOne]++;
    degreeTracker[nodeTwo]++;
  }

  const leafNodeQueue = [];
  const finalDistances = new Array(n).fill(-1);

  for (let nodeIdentifier = 0; nodeIdentifier < n; nodeIdentifier++) {
    if (degreeTracker[nodeIdentifier] === 1) {
      leafNodeQueue.push(nodeIdentifier);
    }
  }

  while (leafNodeQueue.length > 0) {
    const currentNodeRemoved = leafNodeQueue.shift();
    finalDistances[currentNodeRemoved] = Infinity;

    for (const adjacentNodeForRemoval of graphNeighbors[currentNodeRemoved]) {
      if (finalDistances[adjacentNodeForRemoval] !== Infinity) {
        degreeTracker[adjacentNodeForRemoval]--;
        if (degreeTracker[adjacentNodeForRemoval] === 1) {
          leafNodeQueue.push(adjacentNodeForRemoval);
        }
      }
    }
  }

  const distanceComputationQueue = [];
  for (let indexValue = 0; indexValue < n; indexValue++) {
    if (finalDistances[indexValue] === -1) {
      finalDistances[indexValue] = 0;
      distanceComputationQueue.push(indexValue);
    }
  }

  while (distanceComputationQueue.length > 0) {
    const currentBFSNode = distanceComputationQueue.shift();

    for (const neighborOfBFSNode of graphNeighbors[currentBFSNode]) {
      if (finalDistances[neighborOfBFSNode] === Infinity) {
        finalDistances[neighborOfBFSNode] = finalDistances[currentBFSNode] + 1;
        distanceComputationQueue.push(neighborOfBFSNode);
      }
    }
  }

  return finalDistances;
};
