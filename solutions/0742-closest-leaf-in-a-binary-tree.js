/**
 * Closest Leaf In A Binary Tree
 * Intuition: Parent pointers make the tree an undirected graph. BFS from value `k` reaches the nearest leaf (including `k` itself if it is a leaf).
 * Approach: 1. `buildUndirectedGraph` records leaves in `allLeafValues` and undirected edges in `treeAdjacencyList`. 2. BFS from `k` with `nodesVisitedDuringBfs`. 3. Return the first dequeued value that is in `allLeafValues`.
 * Dry Run: Root 1 with left leaf 2 and right child 3→4(leaf). k=3. BFS 3 then 1 and 4; 4 is the closest leaf.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findClosestLeaf = function (root, k) {
  const treeAdjacencyList = new Map();
  const allLeafValues = new Set();

  function buildUndirectedGraph(currentNode, parentNode) {
    if (!currentNode) {
      return;
    }

    if (!currentNode.left && !currentNode.right) {
      allLeafValues.add(currentNode.val);
    }

    if (parentNode) {
      if (!treeAdjacencyList.has(currentNode.val)) {
        treeAdjacencyList.set(currentNode.val, new Set());
      }
      if (!treeAdjacencyList.has(parentNode.val)) {
        treeAdjacencyList.set(parentNode.val, new Set());
      }
      treeAdjacencyList.get(currentNode.val).add(parentNode.val);
      treeAdjacencyList.get(parentNode.val).add(currentNode.val);
    }

    buildUndirectedGraph(currentNode.left, currentNode);
    buildUndirectedGraph(currentNode.right, currentNode);
  }

  buildUndirectedGraph(root, null);

  const bfsTraversalQueue = [k];
  const nodesVisitedDuringBfs = new Set([k]);

  while (bfsTraversalQueue.length > 0) {
    const currentBfsNodeValue = bfsTraversalQueue.shift();

    if (allLeafValues.has(currentBfsNodeValue)) {
      return currentBfsNodeValue;
    }

    const nodeNeighbors = treeAdjacencyList.get(currentBfsNodeValue);
    if (nodeNeighbors) {
      for (const neighborNodeValue of nodeNeighbors) {
        if (!nodesVisitedDuringBfs.has(neighborNodeValue)) {
          nodesVisitedDuringBfs.add(neighborNodeValue);
          bfsTraversalQueue.push(neighborNodeValue);
        }
      }
    }
  }

  return -1;
};
