/**
 * All Possible Full Binary Trees
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
            new TreeNode(0, currentLeftTree, currentRightTree),
          );
        }
      }
    }

    memoizationCache.set(totalNodes, resultingTrees);
    return resultingTrees;
  }

  return constructFullBinaryTrees(n);
};
