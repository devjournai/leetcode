/**
 * Clone Binary Tree With Random Pointer
 * Intuition: Hash original nodes to clones so random pointers that form cycles or shared refs reuse the same copy. Recurse left, right, then random.
 * Approach: 1. Null root returns null. 2. If source is already in the map, return the clone. 3. Create NodeCopy, map it, then assign cloned left/right/random via recursion. 4. Return the cloned root.
 * Dry Run: two-node tree 1 -> 2 with random of 1 pointing at 2
 *   - clone 1, recurse left 2, random of 1 gets the same clone of 2
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
