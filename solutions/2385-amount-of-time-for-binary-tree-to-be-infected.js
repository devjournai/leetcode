/**
 * Amount Of Time For Binary Tree To Be Infected
 * Intuition: The problem describes an infection spreading across adjacent nodes in a tree, essentially asking for the maximum distance from a starting node to any other node. This is a classic shortest path in unweighted graph problem, best solved with Breadth-First Search (BFS) after converting the tree to an undirected graph.
 * Approach: 1. Convert the binary tree into an adjacency list representation of an undirected graph. This involves traversing the tree (e.g., using DFS) and for each node, establishing bidirectional connections with its left child, right child, and parent. 2. Perform a Breadth-First Search (BFS) starting from the given `start` node. Each level of the BFS represents one minute of infection spread. The number of minutes accumulated when the BFS completes will be the total time needed for the entire tree to be infected.
 * Dry Run: root = [1,5,3,null,4,10,6,9,2], start = 3
 *   Tree Structure:
 *         1
 *        / \
 *       5   3
 *        \ / \
 *         4 10 6
 *        / \
 *       9   2
 *
 *   1. Graph Construction (`populateGraph`):
 *      - Starting from root (1), recursively build connections.
 *      - graphMap will look like:
 *        1: [5, 3]
 *        5: [1, 4]
 *        3: [1, 10, 6]
 *        4: [5, 9, 2]
 *        10: [3]
 *        6: [3]
 *        9: [4]
 *        2: [4]
 *
 *   2. BFS from start = 3:
 *      - infectionQueue = [3], visitedSet = {3}, infectionTime = -1
 *
 *      - Iteration 1 (Minute 0):
 *        - infectionTime becomes 0.
 *        - currentLevelSize = 1.
 *        - Dequeue 3. Neighbors of 3: [1, 10, 6].
 *        - Enqueue 1, 10, 6. Mark them visited.
 *        - infectionQueue = [1, 10, 6], visitedSet = {3, 1, 10, 6}
 *
 *      - Iteration 2 (Minute 1):
 *        - infectionTime becomes 1.
 *        - currentLevelSize = 3.
 *        - Dequeue 1. Neighbors of 1: [5, 3]. 3 is visited. Enqueue 5. Mark 5 visited.
 *        - Dequeue 10. Neighbors of 10: [3]. 3 is visited.
 *        - Dequeue 6. Neighbors of 6: [3]. 3 is visited.
 *        - infectionQueue = [5], visitedSet = {3, 1, 10, 6, 5}
 *
 *      - Iteration 3 (Minute 2):
 *        - infectionTime becomes 2.
 *        - currentLevelSize = 1.
 *        - Dequeue 5. Neighbors of 5: [1, 4]. 1 is visited. Enqueue 4. Mark 4 visited.
 *        - infectionQueue = [4], visitedSet = {3, 1, 10, 6, 5, 4}
 *
 *      - Iteration 4 (Minute 3):
 *        - infectionTime becomes 3.
 *        - currentLevelSize = 1.
 *        - Dequeue 4. Neighbors of 4: [5, 9, 2]. 5 is visited. Enqueue 9, 2. Mark 9, 2 visited.
 *        - infectionQueue = [9, 2], visitedSet = {3, 1, 10, 6, 5, 4, 9, 2}
 *
 *      - Iteration 5 (Minute 4):
 *        - infectionTime becomes 4.
 *        - currentLevelSize = 2.
 *        - Dequeue 9. Neighbors of 9: [4]. 4 is visited.
 *        - Dequeue 2. Neighbors of 2: [4]. 4 is visited.
 *        - infectionQueue = []
 *
 *      - BFS ends.
 *      - Return infectionTime = 4.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var amountOfTime = function (root, start) {
  const graphMap = new Map();

  function populateGraph(currentNodeReference) {
    if (!currentNodeReference) {
      return;
    }

    if (!graphMap.has(currentNodeReference.val)) {
      graphMap.set(currentNodeReference.val, []);
    }

    const leftChildNode = currentNodeReference.left;
    if (leftChildNode) {
      if (!graphMap.has(leftChildNode.val)) {
        graphMap.set(leftChildNode.val, []);
      }
      graphMap.get(currentNodeReference.val).push(leftChildNode.val);
      graphMap.get(leftChildNode.val).push(currentNodeReference.val);
      populateGraph(leftChildNode);
    }

    const rightChildNode = currentNodeReference.right;
    if (rightChildNode) {
      if (!graphMap.has(rightChildNode.val)) {
        graphMap.set(rightChildNode.val, []);
      }
      graphMap.get(currentNodeReference.val).push(rightChildNode.val);
      graphMap.get(rightChildNode.val).push(currentNodeReference.val);
      populateGraph(rightChildNode);
    }
  }

  populateGraph(root);

  const infectionQueue = [start];
  const visitedSet = new Set([start]);
  let infectionTime = -1;

  while (infectionQueue.length > 0) {
    infectionTime++;
    const currentLevelSize = infectionQueue.length;

    for (let idx = 0; idx < currentLevelSize; idx++) {
      const currentInfectedNode = infectionQueue.shift();
      const connectedNodes = graphMap.get(currentInfectedNode) || [];

      for (const adjacentNode of connectedNodes) {
        if (!visitedSet.has(adjacentNode)) {
          visitedSet.add(adjacentNode);
          infectionQueue.push(adjacentNode);
        }
      }
    }
  }

  return infectionTime;
};
