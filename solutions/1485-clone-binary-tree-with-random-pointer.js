/**
 * Clone Binary Tree With Random Pointer
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var copyRandomBinaryTree = function (root) {
  if (!root) {
    return null;
  }

  const originalToClonedMap = new Map();

  const recursivelyConstruct = (sourceNode) => {
    if (!sourceNode) {
      return null;
    }

    if (originalToClonedMap.has(sourceNode)) {
      return originalToClonedMap.get(sourceNode);
    }

    const createdNodeCopy = new NodeCopy(sourceNode.val);
    originalToClonedMap.set(sourceNode, createdNodeCopy);

    const leftChildReference = recursivelyConstruct(sourceNode.left);
    createdNodeCopy.left = leftChildReference;

    const rightChildReference = recursivelyConstruct(sourceNode.right);
    createdNodeCopy.right = rightChildReference;

    const randomChildReference = recursivelyConstruct(sourceNode.random);
    createdNodeCopy.random = randomChildReference;

    return createdNodeCopy;
  };

  const finalClonedRoot = recursivelyConstruct(root);
  return finalClonedRoot;
};
