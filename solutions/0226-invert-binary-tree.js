/**
 * Invert Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(W)
*/
var invertTree = function (rootNode) {
    if (!rootNode) {
        return null;
    }

    const nodeQueue = [rootNode];
    let currentProcessingNode;
    let temporaryHolder;

    while (nodeQueue.length > 0) {
        currentProcessingNode = nodeQueue.shift();

        temporaryHolder = currentProcessingNode.left;
        currentProcessingNode.left = currentProcessingNode.right;
        currentProcessingNode.right = temporaryHolder;

        if (currentProcessingNode.left) {
            nodeQueue.push(currentProcessingNode.left);
        }
        if (currentProcessingNode.right) {
            nodeQueue.push(currentProcessingNode.right);
        }
    }

    return rootNode;
};