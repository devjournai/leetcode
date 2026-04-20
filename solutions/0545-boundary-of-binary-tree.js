/**
 * Boundary Of Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var boundaryOfBinaryTree = function (rootNode) {
  if (!rootNode) {
    return [];
  }

  const checkNodeIsLeaf = (nodeItem) => {
    return !nodeItem.left && !nodeItem.right;
  };

  if (checkNodeIsLeaf(rootNode)) {
    return [rootNode.val];
  }

  const finalBoundary = [rootNode.val];

  const collectLeftPath = (currentElementA) => {
    if (!currentElementA || checkNodeIsLeaf(currentElementA)) {
      return;
    }
    finalBoundary.push(currentElementA.val);
    if (currentElementA.left) {
      collectLeftPath(currentElementA.left);
    } else {
      collectLeftPath(currentElementA.right);
    }
  };

  const findTreeLeaves = (currentElementB) => {
    if (!currentElementB) {
      return;
    }
    if (checkNodeIsLeaf(currentElementB)) {
      finalBoundary.push(currentElementB.val);
      return;
    }
    findTreeLeaves(currentElementB.left);
    findTreeLeaves(currentElementB.right);
  };

  const collectRightPath = (currentElementC) => {
    if (!currentElementC || checkNodeIsLeaf(currentElementC)) {
      return;
    }
    if (currentElementC.right) {
      collectRightPath(currentElementC.right);
    } else {
      collectRightPath(currentElementC.left);
    }
    finalBoundary.push(currentElementC.val);
  };

  collectLeftPath(rootNode.left);
  findTreeLeaves(rootNode);
  collectRightPath(rootNode.right);

  return finalBoundary;
};
