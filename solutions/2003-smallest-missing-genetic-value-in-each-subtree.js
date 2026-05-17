/**
 * Smallest Missing Genetic Value In Each Subtree
 * Intuition: The core insight is that if the genetic value '1' is missing from a subtree, the smallest missing value is 1. If '1' is present, the smallest missing value will be greater than 1. This observation allows for a targeted approach. We only need to compute answers for nodes that are ancestors of the node containing '1' (inclusive), as '1' is guaranteed to be in their subtrees. For other nodes (whose subtrees don't contain '1'), their answer is trivially 1. To efficiently find the smallest missing value for ancestors of '1', we accumulate all unique genetic values in a set as we traverse upwards from the '1'-node to the root, performing a pruned DFS at each ancestor to gather values from newly explored branches.
 * Approach:
 * 1. Initialize `finalAnswerArray` of size `n` with all elements set to 1. This handles the base case where '1' is missing.
 * 2. Create an adjacency list `adjacencies` to represent the tree structure from `parents`.
 * 3. Find the `nodeHavingOne` (the index of the node with genetic value 1) in the `nodeValues` array.
 * 4. If `nodeHavingOne` is not found, return `finalAnswerArray` as 1 is missing from all subtrees.
 * 5. Initialize `valuesInSubtreeSet` as a `Set` to store unique genetic values encountered during upward traversal and DFS.
 * 6. Initialize `currentSmallestMissing` to 1, which will track the smallest positive integer not yet in `valuesInSubtreeSet`.
 * 7. Start a loop from `nodeHavingOne` moving upwards towards the root (`pathTraversalNode = parents[pathTraversalNode]`) until `pathTraversalNode` becomes -1.
 *    a. Inside this loop, perform a DFS starting from `pathTraversalNode`. Use a `dfsExplorationStack` to manage the traversal.
 *    b. For each `currentNodeDfs` popped from `dfsExplorationStack`:
 *       i. Add `nodeValues[currentNodeDfs]` to `valuesInSubtreeSet`.
 *       ii. For each `currentChildNode` in `adjacencies[currentNodeDfs]`:
 *          If `nodeValues[currentChildNode]` is not already in `valuesInSubtreeSet`, push `currentChildNode` onto `dfsExplorationStack`. This effectively prunes branches whose genetic values have already been collected in previous iterations (either from a descendant's subtree or a sibling's subtree).
 *    c. After the DFS completes for `pathTraversalNode`, increment `currentSmallestMissing` repeatedly until it is a value not present in `valuesInSubtreeSet`.
 *    d. Store this `currentSmallestMissing` value in `finalAnswerArray[pathTraversalNode]`.
 *    e. Move `pathTraversalNode` to its parent to continue the upward traversal.
 * 8. Return `finalAnswerArray`.
 * Dry Run:
 * parents = [-1, 0, 0], nums = [1, 2, 3]
 * nodeCount = 3
 * finalAnswerArray = [1, 1, 1]
 * adjacencies = [[1, 2], [], []] (0 -> [1,2], 1 -> [], 2 -> [])
 *
 * nodeHavingOne = 0 (because nums[0] is 1)
 *
 * valuesInSubtreeSet = Set {}
 * currentSmallestMissing = 1
 *
 * pathTraversalNode = 0
 *
 * Loop 1: pathTraversalNode = 0
 *   dfsExplorationStack = [0]
 *   While dfsExplorationStack is not empty:
 *     currentNodeDfs = 0 (pop)
 *     valuesInSubtreeSet.add(nums[0]) -> valuesInSubtreeSet = {1}
 *     Children of 0: [1, 2]
 *       currentChildNode = 1: nums[1]=2. !valuesInSubtreeSet.has(2) is true. Push 1. dfsExplorationStack = [1]
 *       currentChildNode = 2: nums[2]=3. !valuesInSubtreeSet.has(3) is true. Push 2. dfsExplorationStack = [1, 2] (order depends on implementation, assume [2,1] if LIFO)
 *
 *     currentNodeDfs = 2 (pop, assuming LIFO from stack)
 *     valuesInSubtreeSet.add(nums[2]) -> valuesInSubtreeSet = {1, 3}
 *     Children of 2: []
 *     dfsExplorationStack = [1]
 *
 *     currentNodeDfs = 1 (pop)
 *     valuesInSubtreeSet.add(nums[1]) -> valuesInSubtreeSet = {1, 3, 2}
 *     Children of 1: []
 *     dfsExplorationStack = []
 *   (dfsExplorationStack is empty, DFS ends)
 *
 *   valuesInSubtreeSet = {1, 2, 3}
 *   While valuesInSubtreeSet.has(currentSmallestMissing):
 *     currentSmallestMissing = 1 (in set) -> currentSmallestMissing = 2
 *     currentSmallestMissing = 2 (in set) -> currentSmallestMissing = 3
 *     currentSmallestMissing = 3 (in set) -> currentSmallestMissing = 4
 *     currentSmallestMissing = 4 (not in set). Loop ends.
 *   currentSmallestMissing = 4
 *
 *   finalAnswerArray[0] = 4 -> finalAnswerArray = [4, 1, 1]
 *   pathTraversalNode = parents[0] = -1
 *
 * Loop ends (pathTraversalNode is -1).
 *
 * Return finalAnswerArray = [4, 1, 1].
 * Time Complexity: O(N * MaxVal)
 * Space Complexity: O(N + MaxVal)
 */
var smallestMissingValueSubtree = function (parents, nums) {
  const nodeCount = parents.length;
  const finalAnswerArray = new Array(nodeCount).fill(1);
  const adjacencies = Array.from({ length: nodeCount }, () => []);

  for (let indexCounter = 1; indexCounter < nodeCount; indexCounter++) {
    adjacencies[parents[indexCounter]].push(indexCounter);
  }

  const nodeHavingOne = nums.indexOf(1);
  if (nodeHavingOne === -1) {
    return finalAnswerArray;
  }

  const valuesInSubtreeSet = new Set();
  let currentSmallestMissing = 1;

  let pathTraversalNode = nodeHavingOne;
  while (pathTraversalNode !== -1) {
    const dfsExplorationStack = [pathTraversalNode];
    while (dfsExplorationStack.length) {
      const currentNodeDfs = dfsExplorationStack.pop();
      valuesInSubtreeSet.add(nums[currentNodeDfs]);

      for (const currentChildNode of adjacencies[currentNodeDfs]) {
        if (!valuesInSubtreeSet.has(nums[currentChildNode])) {
          dfsExplorationStack.push(currentChildNode);
        }
      }
    }

    while (valuesInSubtreeSet.has(currentSmallestMissing)) {
      currentSmallestMissing++;
    }
    finalAnswerArray[pathTraversalNode] = currentSmallestMissing;
    pathTraversalNode = parents[pathTraversalNode];
  }

  return finalAnswerArray;
};
