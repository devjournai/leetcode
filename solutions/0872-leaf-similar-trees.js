/**
 * Leaf Similar Trees
 * Time Complexity: O(N1 + N2)
 * Space Complexity: O(N1 + N2)
 */
var leafSimilar = function (root1, root2) {
  let firstLeafValues = [];

  function collectRecursiveLeaves(currentNodeA, leafListA) {
    if (!currentNodeA) {
      return;
    }
    if (!currentNodeA.left && !currentNodeA.right) {
      leafListA.push(currentNodeA.val);
      return;
    }
    collectRecursiveLeaves(currentNodeA.left, leafListA);
    collectRecursiveLeaves(currentNodeA.right, leafListA);
  }

  collectRecursiveLeaves(root1, firstLeafValues);

  let secondLeafValues = [];
  let nodeStack = [];
  if (root2) {
    nodeStack.push(root2);
  }

  while (nodeStack.length > 0) {
    let currentIterativeNode = nodeStack.pop();

    if (!currentIterativeNode.left && !currentIterativeNode.right) {
      secondLeafValues.push(currentIterativeNode.val);
    } else {
      if (currentIterativeNode.right) {
        nodeStack.push(currentIterativeNode.right);
      }
      if (currentIterativeNode.left) {
        nodeStack.push(currentIterativeNode.left);
      }
    }
  }

  if (firstLeafValues.length !== secondLeafValues.length) {
    return false;
  }

  for (let leafIndex = 0; leafIndex < firstLeafValues.length; leafIndex++) {
    if (firstLeafValues[leafIndex] !== secondLeafValues[leafIndex]) {
      return false;
    }
  }

  return true;
};
