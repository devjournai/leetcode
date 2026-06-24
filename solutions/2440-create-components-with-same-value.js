/**
 * Create Components With Same Value
 * Intuition: If the tree is split into 'k' components of equal value, the sum of all node values must be divisible by 'k', and each component must sum to 'totalSum / k'. We aim to maximize 'k-1' (number of deleted edges), so we search for the largest possible 'k'.
 * Approach: 1. Calculate the total sum of all node values. 2. Build an adjacency list representation of the tree. 3. Iterate downwards from 'n' (maximum possible components) to '1' (one component, no deletions). For each potential number of components, `numberOfComponentsCandidate`: 4. Check if the total sum is divisible by `numberOfComponentsCandidate`. If not, this `numberOfComponentsCandidate` is invalid. 5. If divisible, calculate the `desiredComponentSum = totalSum / numberOfComponentsCandidate`. 6. Perform a Depth-First Search (DFS) starting from node 0 (with no parent) to check if the tree can be partitioned into exactly `numberOfComponentsCandidate` components, each summing to `desiredComponentSum`. 7. The DFS returns two values: the sum of node values in the current subtree that haven't been "cut off" as complete components, and the count of complete components found within that subtree. If a subtree's accumulated sum equals `desiredComponentSum`, it forms a complete component, and its contribution to its parent's sum becomes 0. 8. If the DFS confirms that exactly `numberOfComponentsCandidate` components can be formed, then `numberOfComponentsCandidate - 1` is the maximum number of edges deleted, and we return it. 9. If no such `numberOfComponentsCandidate` is found (i.e., loop finishes without returning), it means only 1 component is possible, so 0 edges are deleted.
 * Dry Run: nums = [6,2,2,2,2], edges = [[0,1],[1,2],[1,3],[1,4]]
 * totalNodes = 5, cumulativeSum = 14
 * graphStructure:
 * 0: [1]
 * 1: [0,2,3,4]
 * 2: [1]
 * 3: [1]
 * 4: [1]
 *
 * Loop `numberOfComponentsCandidate` from 5 down to 1:
 * - `numberOfComponentsCandidate = 5`: 14 % 5 != 0. Skip.
 * - `numberOfComponentsCandidate = 4`: 14 % 4 != 0. Skip.
 * - `numberOfComponentsCandidate = 3`: 14 % 3 != 0. Skip.
 * - `numberOfComponentsCandidate = 2`: 14 % 2 === 0. `desiredComponentSum = 14 / 2 = 7`.
 *   Call `performDfsForComponents(0, -1, 7)`:
 *     - `performDfsForComponents(2, 1, 7)`: (Node 2 value 2). No children. `currentSubtreeValueAccumulator = 2`. Not 7. Returns `[2, 0]`.
 *     - `performDfsForComponents(3, 1, 7)`: (Node 3 value 2). No children. `currentSubtreeValueAccumulator = 2`. Not 7. Returns `[2, 0]`.
 *     - `performDfsForComponents(4, 1, 7)`: (Node 4 value 2). No children. `currentSubtreeValueAccumulator = 2`. Not 7. Returns `[2, 0]`.
 *     - `performDfsForComponents(1, 0, 7)`: (Node 1 value 2). Calls for children 2,3,4.
 *       `currentSubtreeValueAccumulator` starts at `nums[1]=2`. `totalComponentsFormedInSubtree = 0`.
 *       Receives `[2,0]` from child 2: `currentSubtreeValueAccumulator = 2+2=4`, `totalComponentsFormedInSubtree = 0+0=0`.
 *       Receives `[2,0]` from child 3: `currentSubtreeValueAccumulator = 4+2=6`, `totalComponentsFormedInSubtree = 0+0=0`.
 *       Receives `[2,0]` from child 4: `currentSubtreeValueAccumulator = 6+2=8`, `totalComponentsFormedInSubtree = 0+0=0`.
 *       `currentSubtreeValueAccumulator = 8`. Not 7. Returns `[8, 0]`.
 *     - `performDfsForComponents(0, -1, 7)`: (Node 0 value 6). Calls for child 1.
 *       `currentSubtreeValueAccumulator` starts at `nums[0]=6`. `totalComponentsFormedInSubtree = 0`.
 *       Receives `[8,0]` from child 1: `currentSubtreeValueAccumulator = 6+8=14`, `totalComponentsFormedInSubtree = 0+0=0`.
 *       `currentSubtreeValueAccumulator = 14`. Not 7. Returns `[14, 0]`.
 *   `checkResult` is `[14, 0]`. `actualComponentCount = 0`. Not equal to `numberOfComponentsCandidate = 2`. So `numberOfComponentsCandidate = 2` is not valid.
 * - `numberOfComponentsCandidate = 1`: 14 % 1 === 0. `desiredComponentSum = 14 / 1 = 14`.
 *   Call `performDfsForComponents(0, -1, 14)`:
 *     (Tracing similar to above, the entire tree's values will be accumulated at the root node 0)
 *     - `performDfsForComponents(0, -1, 14)`:
 *       ... `currentSubtreeValueAccumulator` will become `14` after processing all children and including `nums[0]`.
 *       `currentSubtreeValueAccumulator = 14`. Is equal to `desiredComponentSum = 14`.
 *       Returns `[0, totalComponentsFormedInSubtree + 1] = [0, 0 + 1] = [0, 1]`.
 *   `checkResult` is `[0, 1]`. `actualComponentCount = 1`. Equal to `numberOfComponentsCandidate = 1`.
 *   Return `numberOfComponentsCandidate - 1 = 1 - 1 = 0`.
 * Final Output: 0
 *
 * Time Complexity: O(N * D)
 * Space Complexity: O(N + E)
 */
var componentValue = function (nums, edges) {
  const totalNodes = nums.length;
  const graphStructure = Array.from({ length: totalNodes }, () => []);
  let cumulativeSum = 0;

  for (let currentVal of nums) {
    cumulativeSum += currentVal;
  }

  for (const [nodeU, nodeV] of edges) {
    graphStructure[nodeU].push(nodeV);
    graphStructure[nodeV].push(nodeU);
  }

  for (
    let numberOfComponentsCandidate = totalNodes;
    numberOfComponentsCandidate >= 1;
    numberOfComponentsCandidate--
  ) {
    if (cumulativeSum % numberOfComponentsCandidate === 0) {
      const desiredComponentSum = cumulativeSum / numberOfComponentsCandidate;
      const checkResult = performDfsForComponents(0, -1, desiredComponentSum);
      const actualComponentCount = checkResult[1];
      if (actualComponentCount === numberOfComponentsCandidate) {
        return numberOfComponentsCandidate - 1;
      }
    }
  }

  return 0;

  function performDfsForComponents(
    currentNodeIdentifier,
    parentNodeIdentifier,
    targetSumPerComponent,
  ) {
    let currentSubtreeValueAccumulator = nums[currentNodeIdentifier];
    let totalComponentsFormedInSubtree = 0;

    for (const adjacentNodeIdentifier of graphStructure[
      currentNodeIdentifier
    ]) {
      if (adjacentNodeIdentifier !== parentNodeIdentifier) {
        const childResultPair = performDfsForComponents(
          adjacentNodeIdentifier,
          currentNodeIdentifier,
          targetSumPerComponent,
        );
        const childSubtreeResidualSum = childResultPair[0];
        const childComponentsFound = childResultPair[1];

        currentSubtreeValueAccumulator += childSubtreeResidualSum;
        totalComponentsFormedInSubtree += childComponentsFound;
      }
    }

    if (currentSubtreeValueAccumulator === targetSumPerComponent) {
      return [0, totalComponentsFormedInSubtree + 1];
    }

    return [currentSubtreeValueAccumulator, totalComponentsFormedInSubtree];
  }
};
