/**
 * Clone Graph
 * Intuition: Clone each node once and reuse it for later neighbor links. BFS with a map from original value to clone walks every edge exactly once.
 * Approach: 1. Null → null. 2. Create clone of the start, map val → clone, queue the original. 3. Dequeue, for each neighbor create/map/enqueue if new, then push the cloned neighbor onto the cloned node’s neighbor list. Return the start clone.
 * Dry Run: 1—2, 1—4, 2—3, 3—4. First clone 1, then enqueue 2 and 4, then 3. Each clone’s neighbors list mirrors the original adjacency.
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
var cloneGraph = function (node) {
  if (!node) {
    return null;
  }

  const nodeMapping = new Map();
  const traversalQueue = [];

  const initialClone = new Node(node.val);
  nodeMapping.set(node.val, initialClone);
  traversalQueue.push(node);

  while (traversalQueue.length > 0) {
    const originalNodeReference = traversalQueue.shift();
    const clonedNodeReference = nodeMapping.get(originalNodeReference.val);

    for (const originalNeighbor of originalNodeReference.neighbors) {
      let clonedNeighborReference;
      if (!nodeMapping.has(originalNeighbor.val)) {
        clonedNeighborReference = new Node(originalNeighbor.val);
        nodeMapping.set(originalNeighbor.val, clonedNeighborReference);
        traversalQueue.push(originalNeighbor);
      } else {
        clonedNeighborReference = nodeMapping.get(originalNeighbor.val);
      }
      clonedNodeReference.neighbors.push(clonedNeighborReference);
    }
  }

  return initialClone;
};
