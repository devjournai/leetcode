/**
 * Number Of Unique Categories
 * Intuition: The problem asks for the number of unique categories among 'n' elements. This can be modeled as finding connected components in a graph. Each element is a node, and an edge exists between two elements if they belong to the same category, as determined by `haveSameCategory`. The number of unique categories is then the number of connected components.
 * Approach: 1. Initialize a boolean array `hasVisited` of size `n` to keep track of visited elements, all set to `false`. 2. Initialize `totalUniqueCount` to `0`. 3. Iterate through each `elementIndexOuter` from `0` to `n-1`. 4. If `hasVisited[elementIndexOuter]` is `false`, it means this element belongs to a new, uncounted category. 5. Increment `totalUniqueCount` and start a Breadth-First Search (BFS) from `elementIndexOuter` to find all elements in its category. 6. For the BFS: Create a queue, add `elementIndexOuter` to it, and mark `hasVisited[elementIndexOuter]` as `true`. 7. While the queue is not empty, dequeue an `activeElement`. 8. Iterate `possibleNeighborElement` from `0` to `n-1`. 9. If `hasVisited[possibleNeighborElement]` is `false` AND `categoryHandler.haveSameCategory(activeElement, possibleNeighborElement)` is `true`, then `possibleNeighborElement` is part of the current category. Mark `hasVisited[possibleNeighborElement]` as `true` and enqueue it. 10. After the loop, return `totalUniqueCount`.
 * Dry Run: n = 3, categoryHandler (assume haveSameCategory(0,1)=true, haveSameCategory(0,2)=false, haveSameCategory(1,2)=false)
 * Initial: hasVisited = [false, false, false], totalUniqueCount = 0
 *
 * elementIndexOuter = 0:
 *   hasVisited[0] is false.
 *   totalUniqueCount = 1.
 *   Start BFS from 0:
 *     bfsWorkingQueue = [0], hasVisited = [true, false, false]
 *     queueTraversalIndex = 0
 *     Dequeue 0 (currentProcessingElement = 0), queueTraversalIndex = 1
 *     loopIndexInner = 0: hasVisited[0] is true. Skip.
 *     loopIndexInner = 1: hasVisited[1] is false. haveSameCategory(0, 1) is true.
 *       hasVisited[1] = true, bfsWorkingQueue.push(1). bfsWorkingQueue = [1] (conceptually [0,1] then [1] after dequeue, using pointer based simulation). hasVisited = [true, true, false]
 *     loopIndexInner = 2: hasVisited[2] is false. haveSameCategory(0, 2) is false. Skip.
 *     bfsWorkingQueue has [1] (via pointer logic).
 *     Dequeue 1 (currentProcessingElement = 1), queueTraversalIndex = 2
 *     loopIndexInner = 0: hasVisited[0] is true. Skip.
 *     loopIndexInner = 1: hasVisited[1] is true. Skip.
 *     loopIndexInner = 2: hasVisited[2] is false. haveSameCategory(1, 2) is false. Skip.
 *     bfsWorkingQueue is empty (via pointer logic). BFS ends.
 *
 * elementIndexOuter = 1:
 *   hasVisited[1] is true. Skip.
 *
 * elementIndexOuter = 2:
 *   hasVisited[2] is false.
 *   totalUniqueCount = 2.
 *   Start BFS from 2:
 *     bfsWorkingQueue = [2], hasVisited = [true, true, true]
 *     queueTraversalIndex = 0
 *     Dequeue 2 (currentProcessingElement = 2), queueTraversalIndex = 1
 *     loopIndexInner = 0: hasVisited[0] is true. Skip.
 *     loopIndexInner = 1: hasVisited[1] is true. Skip.
 *     loopIndexInner = 2: hasVisited[2] is true. Skip.
 *     bfsWorkingQueue is empty (via pointer logic). BFS ends.
 *
 * Return totalUniqueCount = 2.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var numberOfCategories = function (n, categoryHandler) {
  let hasVisited = new Array(n).fill(false);
  let totalUniqueCount = 0;

  for (let elementIndexOuter = 0; elementIndexOuter < n; elementIndexOuter++) {
    if (!hasVisited[elementIndexOuter]) {
      totalUniqueCount++;
      let bfsWorkingQueue = [];
      bfsWorkingQueue.push(elementIndexOuter);
      hasVisited[elementIndexOuter] = true;

      let queueTraversalIndex = 0;
      while (queueTraversalIndex < bfsWorkingQueue.length) {
        let currentProcessingElement = bfsWorkingQueue[queueTraversalIndex];
        queueTraversalIndex++;

        for (let loopIndexInner = 0; loopIndexInner < n; loopIndexInner++) {
          if (
            !hasVisited[loopIndexInner] &&
            categoryHandler.haveSameCategory(
              currentProcessingElement,
              loopIndexInner,
            )
          ) {
            hasVisited[loopIndexInner] = true;
            bfsWorkingQueue.push(loopIndexInner);
          }
        }
      }
    }
  }

  return totalUniqueCount;
};
