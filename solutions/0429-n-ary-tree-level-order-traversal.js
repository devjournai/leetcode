/**
 * N Ary Tree Level Order Traversal
 * Intuition: BFS with a queue isolates one depth at a time: dequeue the current level’s nodes, record values, enqueue every child for the next level.
 * Approach: 1. Empty root → `[]`. 2. Queue starts as `[root]`. 3. While nonempty, snapshot `currentLevelCount`. 4. Shift that many nodes, push `val`, enqueue each child. 5. Push the level array onto `traversalOutputList`.
 * Dry Run: 1 → [3,2,4], 3 → [5,6]. Level sizes 1 then 3 then 2. Return [[1],[3,2,4],[5,6]].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var levelOrder = function (root) {
  const traversalOutputList = [];

  if (!root) {
    return traversalOutputList;
  }

  const processingQueue = [root];

  while (processingQueue.length > 0) {
    const currentLevelCount = processingQueue.length;
    const valuesForThisLevel = [];

    for (
      let nodeIterator = 0;
      nodeIterator < currentLevelCount;
      nodeIterator++
    ) {
      const elementDequeued = processingQueue.shift();
      valuesForThisLevel.push(elementDequeued.val);

      const childNodesList = elementDequeued.children;
      for (
        let childIterator = 0;
        childIterator < childNodesList.length;
        childIterator++
      ) {
        const singleChildNode = childNodesList[childIterator];
        processingQueue.push(singleChildNode);
      }
    }
    traversalOutputList.push(valuesForThisLevel);
  }

  return traversalOutputList;
};
