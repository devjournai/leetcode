/**
 * Boundary Of Binary Tree
 * Intuition: Anticlockwise boundary is root, then left spine (prefer left child), then all leaves left-to-right, then right spine bottom-up (prefer right child). Skip leaves on the spines so they are not duplicated.
 * Approach: 1. If root is null/leaf, return that case. 2. Start `finalBoundary` with root. 3. `collectLeftPath` on `root.left` (push then go left else right). 4. `findTreeLeaves` DFS from root. 5. `collectRightPath` on `root.right` (recurse first, then push). 6. Return `finalBoundary`.
 * Dry Run: root 1, left 2 (left 4, right 5 with 7,8), right 3 (left 6 with 9,10).
 *   - Root 1; left spine 2; leaves 4,7,8,9,10; right spine 3 (bottom-up). Result [1,2,4,7,8,9,10,3].
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
