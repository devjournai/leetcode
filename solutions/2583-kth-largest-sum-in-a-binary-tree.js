/**
 * Kth Largest Sum In A Binary Tree
 * Intuition: Utilize Breadth-First Search (BFS) to traverse the tree level by level, accumulating the sum of node values for each level. Once all level sums are collected, sort them in descending order and retrieve the element at the k-th position.
 * Approach: 1. Initialize an array `collectedLevelSums` to store the sum of nodes for each level. 2. Initialize a queue `bfsQueue` for BFS traversal and add the `root` node. 3. While `bfsQueue` is not empty, process one level at a time: a. Record the `currentIterationNodeCount` (current queue size). b. Initialize `accumulatedLevelSum` for the current level. c. Iterate `currentIterationNodeCount` times: dequeue a `processedNode`, add its value to `accumulatedLevelSum`, and enqueue its left and right children if they exist. d. After processing all nodes for the current level, add `accumulatedLevelSum` to `collectedLevelSums`. 4. After BFS completes, check if `collectedLevelSums.length` is less than `k`. If so, return -1. 5. Sort `collectedLevelSums` in descending order. 6. Return the element at index `k - 1` from the sorted array.
 * Dry Run: root = [50,100,60,null,null,20,30], k = 2
 *   1. collectedLevelSums = [], bfsQueue = [50]
 *   2. Level 0:
 *      currentIterationNodeCount = 1, accumulatedLevelSum = 0
 *      - Dequeue 50. accumulatedLevelSum = 50. Enqueue 100, 60. bfsQueue = [100, 60].
 *      collectedLevelSums = [50].
 *   3. Level 1:
 *      currentIterationNodeCount = 2, accumulatedLevelSum = 0
 *      - Dequeue 100. accumulatedLevelSum = 100.
 *      - Dequeue 60. accumulatedLevelSum = 100 + 60 = 160. Enqueue 20, 30. bfsQueue = [20, 30].
 *      collectedLevelSums = [50, 160].
 *   4. Level 2:
 *      currentIterationNodeCount = 2, accumulatedLevelSum = 0
 *      - Dequeue 20. accumulatedLevelSum = 20.
 *      - Dequeue 30. accumulatedLevelSum = 20 + 30 = 50.
 *      collectedLevelSums = [50, 160, 50].
 *   5. bfsQueue is empty.
 *   6. collectedLevelSums.length (3) >= k (2).
 *   7. Sort collectedLevelSums descending: [160, 50, 50].
 *   8. Return collectedLevelSums[k-1] = collectedLevelSums[1] = 50.
 * Time Complexity: O(N log L)
 * Space Complexity: O(N)
 */
var kthLargestLevelSum = function (root, k) {
  const collectedLevelSums = [];
  const bfsQueue = [root];

  if (!root) {
    return -1;
  }

  while (bfsQueue.length > 0) {
    let currentIterationNodeCount = bfsQueue.length;
    let accumulatedLevelSum = 0;

    for (
      let loopIndex = 0;
      loopIndex < currentIterationNodeCount;
      loopIndex++
    ) {
      const processedNode = bfsQueue.shift();
      accumulatedLevelSum += processedNode.val;

      if (processedNode.left) {
        bfsQueue.push(processedNode.left);
      }
      if (processedNode.right) {
        bfsQueue.push(processedNode.right);
      }
    }
    collectedLevelSums.push(accumulatedLevelSum);
  }

  if (collectedLevelSums.length < k) {
    return -1;
  }

  const sorterFunction = (valueA, valueB) => valueB - valueA;
  collectedLevelSums.sort(sorterFunction);

  const targetIndex = k - 1;
  return collectedLevelSums[targetIndex];
};
