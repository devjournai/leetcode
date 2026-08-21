/**
 * Sum of Root To Leaf Binary Numbers
 * Intuition: Each root-to-leaf path is a binary number. Iterative DFS carries the shifted path value and adds it at leaves.
 * Approach: 1. Stack pairs (node, pathSoFar). 2. Next value = (path<<1)|node.val. 3. If leaf, add to total. 4. Push right then left with the new path.
 * Dry Run: tree 1 / \ 0 1.
 *   - Path 10 = 2 and 11 = 3. Sum 5.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var sumRootToLeaf = function (root) {
  if (!root) {
    return 0;
  }

  let totalResult = 0;
  const traverseStack = [];
  traverseStack.push([root, 0]);

  while (traverseStack.length > 0) {
    const currentEntry = traverseStack.pop();
    const currentNode = currentEntry[0];
    const currentPathValue = currentEntry[1];

    const nextPathValue = (currentPathValue << 1) | currentNode.val;

    if (currentNode.left === null && currentNode.right === null) {
      totalResult += nextPathValue;
    }

    if (currentNode.right !== null) {
      traverseStack.push([currentNode.right, nextPathValue]);
    }

    if (currentNode.left !== null) {
      traverseStack.push([currentNode.left, nextPathValue]);
    }
  }

  return totalResult;
};
