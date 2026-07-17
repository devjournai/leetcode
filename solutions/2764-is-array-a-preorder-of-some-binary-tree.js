/**
 * Is Array A Preorder Of Some Binary Tree
 * Intuition: A valid preorder traversal must reconstruct a binary tree whose own preorder traversal exactly matches the given array. We need to build the tree's structure from parent-child relationships, then perform a standard preorder traversal on the built tree, and finally compare the result with the input.
 * Approach: 1. Construct a mapping of parent IDs to their child IDs based on the input array, also identifying the root node. The order of children in this mapping is critical, preserving their appearance order in the input. 2. Perform a recursive depth-first preorder traversal starting from the identified root, adding each visited node's ID to a new list. When traversing children, the first child in the map is treated as the left child, and the second as the right child. 3. Compare the generated preorder list with the node IDs from the original input array. If they are identical in length and sequence, the input array is a valid preorder; otherwise, it is not.
 * Dry Run: nodes = [[0, -1], [1, 0], [2, 0]]
 * 1. Initialize `childStructureMap = new Map()`, `identifiedRootId = null`, `preorderSequence = []`.
 * 2. Parse relationships using a while loop:
 *    - `descriptorIndex = 0`, `[currentIdentifier = 0, currentParentIdentifier = -1]`. `identifiedRootId` becomes `0`.
 *    - `descriptorIndex = 1`, `[currentIdentifier = 1, currentParentIdentifier = 0]`. `childStructureMap` gets `0: [1]`.
 *    - `descriptorIndex = 2`, `[currentIdentifier = 2, currentParentIdentifier = 0]`. `childStructureMap` for `0` already has `[1]`, so `childStructureMap` for `0` becomes `[1, 2]`.
 *    Result: `identifiedRootId = 0`, `childStructureMap = {0: [1, 2]}`.
 * 3. Call `generatePreorderRecursive(0)`:
 *    - `currentNodeForTraversal = 0`. Add `0` to `preorderSequence`. `preorderSequence = [0]`.
 *    - `currentChildrenList` for `0` is `[1, 2]`.
 *    - Call `generatePreorderRecursive(1)` (left child):
 *      - `currentNodeForTraversal = 1`. Add `1` to `preorderSequence`. `preorderSequence = [0, 1]`.
 *      - `currentChildrenList` for `1` is `[]`. Returns.
 *    - Call `generatePreorderRecursive(2)` (right child):
 *      - `currentNodeForTraversal = 2`. Add `2` to `preorderSequence`. `preorderSequence = [0, 1, 2]`.
 *      - `currentChildrenList` for `2` is `[]`. Returns.
 *    Returns from `generatePreorderRecursive(0)`.
 * 4. Compare lengths: `nodeDescriptors.length` (3) === `preorderSequence.length` (3). Match.
 * 5. Compare sequences using a while loop:
 *    - `comparisonIndex = 0`: `nodeDescriptors[0][0]` (0) === `preorderSequence[0]` (0). Match.
 *    - `comparisonIndex = 1`: `nodeDescriptors[1][0]` (1) === `preorderSequence[1]` (1). Match.
 *    - `comparisonIndex = 2`: `nodeDescriptors[2][0]` (2) === `preorderSequence[2]` (2). Match.
 * 6. All checks pass. Return `true`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isPreorder = function (nodes) {
  const childStructureMap = new Map();
  let identifiedRootId = null;

  let descriptorIndex = 0;
  while (descriptorIndex < nodes.length) {
    const currentItem = nodes[descriptorIndex];
    const currentIdentifier = currentItem[0];
    const currentParentIdentifier = currentItem[1];

    if (currentParentIdentifier === -1) {
      identifiedRootId = currentIdentifier;
    } else {
      if (!childStructureMap.has(currentParentIdentifier)) {
        childStructureMap.set(currentParentIdentifier, []);
      }
      childStructureMap.get(currentParentIdentifier).push(currentIdentifier);
    }
    descriptorIndex++;
  }

  const preorderSequence = [];

  const generatePreorderRecursive = (currentNodeForTraversal) => {
    if (
      currentNodeForTraversal === null ||
      currentNodeForTraversal === undefined
    ) {
      return;
    }

    preorderSequence.push(currentNodeForTraversal);

    const currentChildrenList =
      childStructureMap.get(currentNodeForTraversal) || [];
    if (currentChildrenList.length > 0) {
      generatePreorderRecursive(currentChildrenList[0]);
    }
    if (currentChildrenList.length > 1) {
      generatePreorderRecursive(currentChildrenList[1]);
    }
  };

  generatePreorderRecursive(identifiedRootId);

  if (nodes.length !== preorderSequence.length) {
    return false;
  }

  let comparisonIndex = 0;
  while (comparisonIndex < nodes.length) {
    if (nodes[comparisonIndex][0] !== preorderSequence[comparisonIndex]) {
      return false;
    }
    comparisonIndex++;
  }

  return true;
};
