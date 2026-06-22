/**
 * Reverse Odd Levels Of Binary Tree
 * Intuition: This problem requires modifying node values based on their level. A level-order traversal (BFS) is a natural fit for processing nodes level by level and identifying odd levels. Once an odd level is identified, the values of nodes within that level need to be reversed.
 * Approach: 1. Initialize a queue for a Breadth-First Search (BFS) starting with the root node. 2. Maintain a `currentDepthCount` variable, initialized to 0, to track the current level. 3. Iterate through the tree using the BFS queue: for each level, extract all nodes into a temporary list. 4. If the `currentDepthCount` is odd, iterate with two pointers (one from the start, one from the end) through the temporary list of nodes, swapping their `val` properties. 5. Add children of the current level's nodes to the queue for the next iteration. 6. Increment `currentDepthCount` after processing each level. 7. Return the original root once the traversal is complete.
 * Dry Run: Input: root = [0,1,2,3,4,5,6]
 * Initial:
 * nodesTracker = [0], currentDepthCount = 0
 *
 * Iteration 1 (currentDepthCount = 0, even):
 *   depthNodeCount = 1
 *   levelMembersCollection = []
 *   Dequeue 0. Enqueue 1, 2.
 *   levelMembersCollection = [0]
 *   0 % 2 is not 1. No reversal.
 *   currentDepthCount becomes 1.
 *   nodesTracker = [1, 2]
 *
 * Iteration 2 (currentDepthCount = 1, odd):
 *   depthNodeCount = 2
 *   levelMembersCollection = []
 *   Dequeue 1. Enqueue 3, 4. levelMembersCollection = [1]
 *   Dequeue 2. Enqueue 5, 6. levelMembersCollection = [1, 2]
 *   1 % 2 is 1. Perform reversal:
 *     leftSwapPointer = 0, rightSwapPointer = 1
 *     Swap levelMembersCollection[0].val (1) and levelMembersCollection[1].val (2).
 *     Nodes: 1.val becomes 2, 2.val becomes 1.
 *   currentDepthCount becomes 2.
 *   nodesTracker = [3, 4, 5, 6]
 *
 * Iteration 3 (currentDepthCount = 2, even):
 *   depthNodeCount = 4
 *   levelMembersCollection = []
 *   Dequeue 3. Enqueue nothing. levelMembersCollection = [3]
 *   Dequeue 4. Enqueue nothing. levelMembersCollection = [3, 4]
 *   Dequeue 5. Enqueue nothing. levelMembersCollection = [3, 4, 5]
 *   Dequeue 6. Enqueue nothing. levelMembersCollection = [3, 4, 5, 6]
 *   2 % 2 is not 1. No reversal.
 *   currentDepthCount becomes 3.
 *   nodesTracker = []
 *
 * Loop ends. Return root.
 * Final tree structure:
 *       0
 *      / \
 *     2   1 (values were 1,2, now 2,1)
 *    / \ / \
 *   3  4 5  6
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var reverseOddLevels = function (root) {
  if (!root) {
    return null;
  }

  const nodesTracker = [root];
  let currentDepthCount = 0;

  while (nodesTracker.length > 0) {
    const depthNodeCount = nodesTracker.length;
    const levelMembersCollection = [];

    for (let idxNode = 0; idxNode < depthNodeCount; idxNode++) {
      const currentNodeReference = nodesTracker.shift();
      levelMembersCollection.push(currentNodeReference);

      if (currentNodeReference.left) {
        nodesTracker.push(currentNodeReference.left);
      }
      if (currentNodeReference.right) {
        nodesTracker.push(currentNodeReference.right);
      }
    }

    if (currentDepthCount % 2 === 1) {
      let leftSwapPointer = 0;
      let rightSwapPointer = levelMembersCollection.length - 1;

      while (leftSwapPointer < rightSwapPointer) {
        const temporaryValueStorage =
          levelMembersCollection[leftSwapPointer].val;
        levelMembersCollection[leftSwapPointer].val =
          levelMembersCollection[rightSwapPointer].val;
        levelMembersCollection[rightSwapPointer].val = temporaryValueStorage;

        leftSwapPointer++;
        rightSwapPointer--;
      }
    }

    currentDepthCount++;
  }

  return root;
};
