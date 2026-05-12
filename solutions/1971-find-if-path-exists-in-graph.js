/**
 * Find If Path Exists In Graph
 * Intuition: The problem asks whether two vertices in a graph are connected. This is a fundamental graph traversal problem that can be solved using either Breadth-First Search (BFS) or Depth-First Search (DFS). BFS systematically explores the graph layer by layer, guaranteeing that if a path exists, it will eventually find it.
 * Approach: 1. Represent the graph using an adjacency list for efficient neighbor lookup. 2. Initialize a set to keep track of visited nodes to avoid cycles and redundant processing. 3. Start a BFS traversal from the source node by adding it to a queue. 4. While the queue is not empty, dequeue a node. If this node is the destination, a path exists, so return true. If the node has already been visited, skip it. Otherwise, mark it as visited and add all its unvisited neighbors to the queue. 5. If the queue becomes empty and the destination has not been reached, no path exists, so return false.
 * Dry Run: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
 *   1. Initialize graphStructure:
 *      0: [1, 2]
 *      1: [0, 2]
 *      2: [1, 0]
 *   2. Initialize visitedNodes = Set {}
 *   3. Initialize traversalQueue = [0]
 *   4. Loop while traversalQueue.length > 0:
 *      a. Dequeue currentNode = 0.
 *      b. currentNode (0) !== destination (2).
 *      c. 0 is not in visitedNodes. Add 0 to visitedNodes = Set {0}.
 *      d. Neighbors of 0: [1, 2].
 *         i. adjacentNode = 1. Not in visitedNodes. Enqueue 1. traversalQueue = [1].
 *         ii. adjacentNode = 2. Not in visitedNodes. Enqueue 2. traversalQueue = [1, 2].
 *      e. Dequeue currentNode = 1.
 *      f. currentNode (1) !== destination (2).
 *      g. 1 is not in visitedNodes. Add 1 to visitedNodes = Set {0, 1}.
 *      h. Neighbors of 1: [0, 2].
 *         i. adjacentNode = 0. Is in visitedNodes. Skip.
 *         ii. adjacentNode = 2. Is not in visitedNodes. Enqueue 2. traversalQueue = [2, 2].
 *      i. Dequeue currentNode = 2.
 *      j. currentNode (2) === destination (2). Return true.
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var validPath = function (n, edges, source, destination) {
  const graphStructure = Array.from({ length: n }, () => []);
  for (const [firstNode, secondNode] of edges) {
    graphStructure[firstNode].push(secondNode);
    graphStructure[secondNode].push(firstNode);
  }

  const visitedNodes = new Set();
  const traversalQueue = [source];

  while (traversalQueue.length > 0) {
    const currentNode = traversalQueue.shift();

    if (currentNode === destination) {
      return true;
    }

    if (visitedNodes.has(currentNode)) {
      continue;
    }
    visitedNodes.add(currentNode);

    for (const adjacentNode of graphStructure[currentNode]) {
      if (!visitedNodes.has(adjacentNode)) {
        traversalQueue.push(adjacentNode);
      }
    }
  }

  return false;
};
