/**
 * All Nodes Distance K In Binary Tree
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
