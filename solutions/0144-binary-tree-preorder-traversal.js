/**
 * Binary Tree Preorder Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var preorderTraversal = function (root) {
    const collectedValues = [];
    if (!root) {
        return collectedValues;
    }

    const traversalStack = [];
    traversalStack.push(root);

    while (traversalStack.length > 0) {
        const currentProcessor = traversalStack.pop();
        collectedValues.push(currentProcessor.val);

        const rightChild = currentProcessor.right;
        if (rightChild) {
            traversalStack.push(rightChild);
        }

        const leftChild = currentProcessor.left;
        if (leftChild) {
            traversalStack.push(leftChild);
        }
    }

    return collectedValues;
};