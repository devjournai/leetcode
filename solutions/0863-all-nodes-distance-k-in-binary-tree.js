/**
 * All Nodes Distance K In Binary Tree
 * Intuition: Convert the tree to an undirected graph of node values, then BFS from `target.val` until distance k.
 * Approach: 1. DFS `establishConnections` to fill neighbor sets. 2. Queue [target.val, 0], visited set. 3. If pathLength==k collect; if >k skip; else enqueue unvisited neighbors. 4. Return `collectedResult`.
 * Dry Run: tree 3 with children 5,1; target=5, k=2. Graph neighbors of 5: 3,6,2. Dist 2 from 5: 1,7,4.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var distanceK = function (root, target, k) {
  const adjacencyMatrix = new Map();
  const collectedResult = [];

  function establishConnections(currentTreeElement, parentOfCurrent) {
    if (!currentTreeElement) {
      return;
    }

    if (parentOfCurrent) {
      if (!adjacencyMatrix.has(currentTreeElement.val)) {
        adjacencyMatrix.set(currentTreeElement.val, new Set());
      }
      adjacencyMatrix.get(currentTreeElement.val).add(parentOfCurrent.val);

      if (!adjacencyMatrix.has(parentOfCurrent.val)) {
        adjacencyMatrix.set(parentOfCurrent.val, new Set());
      }
      adjacencyMatrix.get(parentOfCurrent.val).add(currentTreeElement.val);
    }

    establishConnections(currentTreeElement.left, currentTreeElement);
    establishConnections(currentTreeElement.right, currentTreeElement);
  }

  establishConnections(root, null);

  const bfsQueue = [[target.val, 0]];
  const visitedTracker = new Set();
  visitedTracker.add(target.val);

  let queuePointer = 0;

  while (queuePointer < bfsQueue.length) {
    const [nodeIdentifier, pathLength] = bfsQueue[queuePointer];
    queuePointer++;

    if (pathLength === k) {
      collectedResult.push(nodeIdentifier);
      continue;
    }

    if (pathLength > k) {
      continue;
    }

    const currentNeighbors = adjacencyMatrix.get(nodeIdentifier) || new Set();
    for (const connectedNodeValue of currentNeighbors) {
      if (!visitedTracker.has(connectedNodeValue)) {
        visitedTracker.add(connectedNodeValue);
        bfsQueue.push([connectedNodeValue, pathLength + 1]);
      }
    }
  }

  return collectedResult;
};
