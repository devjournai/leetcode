/**
 * Binary Tree Inorder Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var inorderTraversal = function (initialNode) {
    const collectedValues = [];

    const processNode = (currentNode) => {
        if (currentNode === null) {
            return;
        }

        processNode(currentNode.left);
        collectedValues.push(currentNode.val);
        processNode(currentNode.right);
    };

    processNode(initialNode);

    return collectedValues;
};