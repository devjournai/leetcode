/**
 * All Possible Full Binary Trees
 * Intuition: A full binary tree has an odd node count. For n nodes, the left subtree takes an odd size L in 1..n-2 and the right takes n-1-L. Memoize lists of trees per size.
 * Approach: 1. Even `totalNodes` → []. 2. One node → `[TreeNode(0)]`. 3. If cached, return it. 4. For `nodesForLeft` = 1,3,... pair with `nodesForRight`, cartesian-product children into new roots. 5. Cache and return; top-level calls `constructFullBinaryTrees(n)`.
 * Dry Run: n = 3.
 *   - Left 1 + right 1 → one tree: 0 with two leaf children. Return that single shape.
 * Time Complexity: O(N * C_N_prime)
 * Space Complexity: O(N * C_N_prime)
 */
var allPossibleFBT = function (n) {
  const memoizationCache = new Map();

  function constructFullBinaryTrees(totalNodes) {
    if (totalNodes % 2 === 0) {
      return [];
    }
    if (totalNodes === 1) {
      return [new TreeNode(0)];
    }
    if (memoizationCache.has(totalNodes)) {
      return memoizationCache.get(totalNodes);
    }

    const resultingTrees = [];
    for (
      let nodesForLeft = 1;
      nodesForLeft < totalNodes - 1;
      nodesForLeft += 2
    ) {
      const nodesForRight = totalNodes - 1 - nodesForLeft;
      const leftTreeOptions = constructFullBinaryTrees(nodesForLeft);
      const rightTreeOptions = constructFullBinaryTrees(nodesForRight);

      for (const currentLeftTree of leftTreeOptions) {
        for (const currentRightTree of rightTreeOptions) {
          resultingTrees.push(
            new TreeNode(0, currentLeftTree, currentRightTree)
          );
        }
      }
    }

    memoizationCache.set(totalNodes, resultingTrees);
    return resultingTrees;
  }

  return constructFullBinaryTrees(n);
};
